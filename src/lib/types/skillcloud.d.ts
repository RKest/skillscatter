import type { Point, Rect, IndexPair } from './rp.d.ts';

export type LinespacedRect = Rect & { letterSpacing: number; };

export interface BoardNode {
	text: string;
	fontSize: number;
	bounds: LinespacedRect[]
	topLeft: Point;
	hangingBaseline: number;
	indexPair?: IndexPair;
};

export interface Skill {
	name: string;
	url: string;
	lang: string;
	stars: number;
	fontSize: number;
};
