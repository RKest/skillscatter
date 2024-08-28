<script lang="ts">
	import { ScrollArea } from "$lib/components/ui/scroll-area";
	import { Separator } from "$lib/components/ui/separator";

	import SkillListElement from "$lib/components/skills/skill.svelte";

	import skills from "$lib/stores/skills";
</script>

<ScrollArea class="min-w-max w-fit" type="hover" hideDelay={100}>
	{#each $skills as skill (skill.url)}
		<SkillListElement {skill} />
		<Separator class="my-1" />
	{/each}
</ScrollArea>
