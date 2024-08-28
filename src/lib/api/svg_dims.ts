import type { BoardNode } from "$lib/types/skillcloud"
import type { Point, Rect } from "$lib/types/rp"

export default function computeSvgDims(points: Point[], nodes: BoardNode[]): Rect {
	const rect: Rect = {
		lft: Number.POSITIVE_INFINITY,
		top: Number.POSITIVE_INFINITY,
		rgt: Number.NEGATIVE_INFINITY,
		bot: Number.NEGATIVE_INFINITY,
	};

	for (const i in points) {
		const lastBound = nodes[i].bounds.at(-1) || { rgt: 0, bot: 0 };
		rect.lft = Math.min(rect.lft, points[i].x);
		rect.top = Math.min(rect.top, points[i].y);
		rect.rgt = Math.max(rect.rgt, points[i].x + lastBound.rgt);
		rect.bot = Math.max(rect.bot, points[i].y + lastBound.bot);
	}
	return rect;
}
