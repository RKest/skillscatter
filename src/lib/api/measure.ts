import { browser } from '$app/environment'
import type { Skill, BoardNode, LinespacedRect } from '$lib/types/skillcloud'

export default function measure(skills: Skill[]): BoardNode[] {
	if (!browser) {
		return [];
	}
	const nodes = assignFontSizes(skills);
	for (const node of nodes) {
		[node.bounds, node.hangingBaseline] = measureText(node.text, node.fontSize);
	}
	return nodes;
}

function assignFontSizes(skills: Skill[]): BoardNode[] {
	const maxLanguageFont = 80;
	const minLanguageFont = 30;
	const maxFontScale = 2 / 3;
	const minFont = 15;

	const languages = groupSkills(skills);
	const stars = sumStars(languages);
	const maxStars = Math.max(...Object.values(stars));
	const minStars = Math.min(...Object.values(stars));
	const starsDelta = (maxStars - minStars) || 1;
	const nodes: BoardNode[] = [];

	let next_language_index = 0;
	let next_skill_index = Object.keys(languages).length;
	for (const [language, skills] of Object.entries(languages)) {
		const languageStars = stars[language];
		const languageFontSize = ilerp(minLanguageFont, maxLanguageFont, (stars[language] - minStars) / starsDelta);
		skills.forEach(skill => skill.fontSize = ilerp(minFont, languageFontSize * maxFontScale, skill.stars / languageStars));

		nodes.push({
			text: language, fontSize: languageFontSize,
			bounds: [],
			hangingBaseline: 0,
			topLeft: { x: 0, y: 0 },
		});
		for (const skill of skills) {
			nodes.push({
				text: skill.name,
				fontSize: skill.fontSize,
				bounds: [],
				topLeft: { x: 0, y: 0 },
				hangingBaseline: 0,
				indexPair: { src: next_language_index, dst: next_skill_index++ },
			});
		}
		next_language_index++;
	}
	return nodes;
}

function groupSkills(skills: Skill[]): Record<string, Skill[]> {
	const languages: Record<string, Skill[]> = {};
	for (const skill of skills) {
		const lang = skill.lang;
		languages[lang] ??= [];
		languages[lang].push(skill);
	}
	for (const lang in languages) {
		languages[lang].sort((a, b) => b.stars - a.stars);

	}
	return languages;
}

function sumStars(langs: Record<string, Skill[]>): Record<string, number> {
	const result: Record<string, number> = {};
	for (const [lang, skills] of Object.entries(langs)) {
		result[lang] = skills.reduce((acc, skill) => acc + skill.stars, 0);
	}
	return result;
}

function measureText(text: string, fontSize: number): [LinespacedRect[], number] {
	text += 'l' // Tall letter is needed to align top properly
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;
	ctx.textBaseline = "hanging";
	ctx.font = `${fontSize}px sans-serif`;
	const result: LinespacedRect[] = [];
	const textMetrics = ctx.measureText(text);
	let x = 0;
	let i = 0;
	let j = 1;
	const ydiff = textMetrics.actualBoundingBoxAscent - textMetrics.fontBoundingBoxAscent;
	for (; j < text.length; j++, i++) {
		const im = measureGlyph(ctx, text[i]);
		const jm = measureGlyph(ctx, text[i]);
		const ijm = measureGlyph(ctx, text[i] + text[j]);
		const letterSpacing = ijm.width - im.width - jm.width;
		const top = im.topDiff + ydiff;
		result.push({
			lft: x,
			top: top,
			rgt: x + im.width,
			bot: top + im.height,
			letterSpacing: letterSpacing,
		});
		x += im.width;
	}
	return [result, textMetrics.alphabeticBaseline];
}

type GlyphMeasure = {
	width: number,
	height: number,
	topDiff: number,
};

function measureGlyph(ctx: CanvasRenderingContext2D, glyph: string): GlyphMeasure {
	const measurements = ctx.measureText(glyph);
	const width = measurements.width;
	const height = measurements.actualBoundingBoxAscent + measurements.actualBoundingBoxDescent;
	const topDiff = measurements.fontBoundingBoxAscent - measurements.actualBoundingBoxAscent;
	return { width, height, topDiff };
}

function ilerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

