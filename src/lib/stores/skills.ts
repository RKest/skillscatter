import { browser } from "$app/environment"
import type { Skill } from "$lib/types/skillcloud"
import { writable } from "svelte/store"

const filterUnunique = (skills: Skill[]): Skill[] => {
	const urls = new Set<string>();
	return skills.filter(skill => {
		if (urls.has(skill.url)) {
			return false;
		}
		urls.add(skill.url);
		return true;
	});
}

const initialSkills = browser ? filterUnunique(JSON.parse(localStorage.getItem("skills") || "[]")) : [] as Skill[];

const skills = writable<Skill[]>(initialSkills);

skills.subscribe(value => {
	browser && localStorage.setItem("skills", JSON.stringify(value));
})

export default skills;
