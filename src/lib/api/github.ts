import ky from "ky";
import { HTTPError } from "ky";
import type { Skill } from "$lib/types/skillcloud";

export class Ignore { };
interface RateLimit {
	reset: Date;
};

export default async (url: string): Promise<Skill | Ignore | RateLimit> => {
	try {
		if (!url.includes("github.com/")) {
			return new Ignore;
		}
		url = encodeURI(url);
		if (url.endsWith(".git")) {
			url = url.slice(0, -4);
		}
		const stargazersUrl = url.replace("github.com", "api.github.com/repos");
		const languagesUrl = stargazersUrl + "/languages";
		const [info, languages] = await Promise.all([
			ky.get(stargazersUrl, { retry: 0 }).json(),
			ky.get(languagesUrl, { retry: 0 }).json(),
		]) as [{ stargazers_count: number, name: string }, Record<string, number>];
		const stars = +info.stargazers_count;
		const name = info.name;
		const lang = Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b);
		return {
			name,
			url,
			lang,
			stars,
			fontSize: 0,
		};
	} catch (error) {
		if (!(error instanceof HTTPError)) {
			throw error;
		}
		if (error.response.status === 404) {
			return new Ignore;
		}
		if (error.response.status === 403) {
			const resetHeader = error.response.headers.get('X-Ratelimit-Reset');
			if (resetHeader === null) {
				throw error;
			}
			const reset = new Date(+resetHeader * 1000);
			return { reset };
		}
		throw error;
	}
};
