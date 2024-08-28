<script lang="ts">
	import type { BoardNode } from "$lib/types/skillcloud";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	const tweened500 = (coord: number) =>
		tweened(coord, { duration: 500, easing: cubicOut });

	export let node: BoardNode;

	const twX = tweened500(node.topLeft.x);
	const twY = tweened500(node.topLeft.y - node.hangingBaseline);

	$: $twX = node.topLeft.x;
	$: $twY = node.topLeft.y - node.hangingBaseline;
</script>

<g>
	<text
		fill="black"
		x={$twX}
		y={$twY}
		font-size="{node.fontSize}px"
		font-family="sans-serif"
	>
		{node.text}
	</text>
</g>
