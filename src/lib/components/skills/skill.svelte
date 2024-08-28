<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";

	import type { Skill } from "$lib/types/skillcloud";
	import SkillControlls from "$lib/components/skills/skill_controlls.svelte";

	export let skill: Skill;
</script>

<div class="skill">
	<div class="flex-1">
		<h4 class="font-medium leading-none text-lg p-1">
			<a href={skill.url} target="_blank">{skill.name}</a>
		</h4>
		<div class="flex">
			<Badge variant="outline" class="font-medium text-muted-foreground">
				{skill.lang}
			</Badge>
			<span class="flex-1"></span>
			<Badge variant="outline" class="font-medium text-muted-foreground">
				{skill.stars} ⭐
			</Badge>
		</div>
	</div>
	<SkillControlls {skill} />
</div>

<style>
	.skill {
		display: flex;
		justify-content: space-between;
		padding-left: 0.125rem;
		padding-right: 0.125rem;
	}

	span {
		font-size: 0.75rem;
		line-height: 1rem;
	}
</style>
