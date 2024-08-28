<script lang="ts">
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	import type { Point } from "$lib/types/rp";
	import type { BoardNode } from "$lib/types/skillcloud";

	import BoardElement from "$lib/components/board/board_element.svelte";

	import measure from "$lib/api/measure";
	import place from "$lib/api/place";
	import computeSvgDims from "$lib/api/svg_dims";

	import skills from "$lib/stores/skills";
	import board from "$lib/stores/board";

	const tweened500 = (coord: number | null) =>
		tweened(coord, { duration: 500, easing: cubicOut });

	let boardW = 0;
	let boardH = 0;
	$: svgW = tweened500(null);
	$: svgH = tweened500(null);
	let nodes: BoardNode[] = [];

	function setDims(_: HTMLElement) {
		skills.subscribe(async (s) => {
			const measured = measure(s);
			const boardDims: Point = { x: boardW, y: boardH };
			const points = await place(boardDims, measured);
			if (measured.length !== points.length) {
				throw new Error(
					`Mismatched lengths ${measured.length} !== ${points.length}`,
				);
			}
			for (const i in measured) {
				measured[i].topLeft = points[i];
			}
			const svgRect = computeSvgDims(points, measured);
			for (const i in measured) {
				measured[i].topLeft = {
					x: measured[i].topLeft.x - svgRect.lft + 10, // padding
					y: measured[i].topLeft.y - svgRect.top + 10, // padding
				};
			}
			if (measured.length !== 0) {
				nodes = measured;
				$svgW = svgRect.rgt - svgRect.lft + 20; // padding
				$svgH = svgRect.bot - svgRect.top + 20; // padding
			} else {
				$svgW = boardW;
				$svgH = boardH;
			}
		});
	}
</script>

<div
	class="flex flex-1 justify-center items-center"
	bind:offsetWidth={boardW}
	bind:offsetHeight={boardH}
	use:setDims
>
	<svg width="{$svgW}px" height="{$svgH}px" bind:this={$board}>
		{#each nodes as node (node.text)}
			<BoardElement {node} />
		{/each}
	</svg>
</div>
