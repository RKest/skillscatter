<script lang="ts">
	import SkillPanel from "$lib/components/skills/skill_panel.svelte";
	import SkillExport from "$lib/components/skills/skill_export.svelte";
	import Board from "$lib/components/board/board.svelte";
</script>

<main>
	<SkillPanel />
	<div id="content">
		<Board />
	</div>
	<SkillExport />
</main>

<style>
	:global(body) {
		margin: 0;
		height: 100vh;
		overflow: hidden;
	}

	main {
		height: 100vh;
		display: flex;
		flex-direction: row;
		margin: 0 auto;
		overflow: hidden;
	}

	#content {
		overflow: hidden;
		flex: 1;
		display: flex;
	}
</style>
