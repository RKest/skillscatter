import { browser } from '$app/environment';
import Module from "$lib/api/rp_wasm";
import type { BoardNode } from "$lib/types/skillcloud";
import type { MainModule, Point } from "$lib/types/rp";


export default async function place(board_dims: Point, nodes: BoardNode[]): Promise<Point[]> {
	let m: MainModule;
	nodes.sort((a, b) => +(b.indexPair === undefined) - +(a.indexPair === undefined));
	const points: Point[] = [];
	if (!browser || nodes.length === 0) {
		return points;
	} else {
		m = await Module();
	}
	const polygonList = new m.Polygons();
	const indexPairs = new m.Indices();
	const tolerances = new m.FloatVec();

	for (const node of nodes) {
		const b = new m.Bounds();
		for (const r of node.bounds) {
			b.push_back(r);
		}
		polygonList.push_back({ rects: b });
		tolerances.push_back(node.fontSize / 10);
		if (node.indexPair !== undefined) {
			indexPairs.push_back(node.indexPair);
		}
		b.delete();
	}

	//console.time("place");
	const cppPoints = m.place(polygonList, indexPairs, tolerances, board_dims);
	//console.timeEnd("place");
	for (let i = 0; i < cppPoints.size(); i++) {
		points.push(cppPoints.get(i)!);
	}
	polygonList.delete();
	indexPairs.delete();
	cppPoints.delete();
	tolerances.delete();

	return points;
}
