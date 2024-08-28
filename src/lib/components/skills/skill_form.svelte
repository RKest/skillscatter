<script lang="ts">
	import posthog from "posthog-js";

	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";

	import autocomplete, { Ignore } from "$lib/api/github";
	import type { Skill } from "$lib/types/skillcloud";
	import skills from "$lib/stores/skills";

	let skill: Skill = {
		name: "",
		url: "",
		lang: "",
		stars: 0,
		fontSize: 0,
	};

	let rateLimit: Date | null = null;

	function addSkill(event: Event) {
		posthog.capture("add_skill", { skill });
		event.preventDefault();
		$skills = [...$skills, structuredClone(skill)];
	}

	function setStars(ev: Event) {
		skill.stars = +(ev.target as HTMLInputElement).value;
	}

	async function autocompleteSkill() {
		const maybeSkill = await autocomplete(skill.url);
		if (maybeSkill instanceof Ignore) return;
		if ("reset" in maybeSkill) {
			rateLimit = maybeSkill.reset;
			return;
		}
		skill = maybeSkill;
	}

	let frame = 0;
	let displayRateLimitTime: string = "";

	function countdownRateLimitAction(_: HTMLElement) {
		return {
			destroy: countdownRateLimit(),
		};
	}

	function countdownRateLimit() {
		frame = requestAnimationFrame(countdownRateLimit);
		const time = new Date(Date.now());
		if (rateLimit === null) {
			return;
		}
		const rateLimitTime = rateLimit.getTime() - time.getTime();
		if (rateLimitTime <= 0) {
			rateLimit = null;
			return () => cancelAnimationFrame(frame);
		}
		displayRateLimitTime = formatRateLimitTime(rateLimitTime);
		return () => cancelAnimationFrame(frame);
	}

	function formatRateLimitTime(time: number) {
		const minutes = Math.floor(time / 60000);
		const seconds = Math.floor((time % 60000) / 1000);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	}
</script>

<div>
	<form on:submit={addSkill} class="p-1 space-y-1">
		<Input
			on:change={autocompleteSkill}
			bind:value={skill.url}
			name="url"
			placeholder="github url"
			required
		/>
		{#if rateLimit !== null}
			<p
				class="ml-1 text-sm text-destructive text-wrap block min-w-full w-0"
				use:countdownRateLimitAction
			>
				Autocomplete rate limited by Github for {displayRateLimitTime}.
				You can still input data manually
			</p>
		{/if}
		{#if $skills.length === 0}
			<p class="ml-1 text-sm text-wrap block min-w-full w-0">
				Start by pasting a Github URL ^^
			</p>
		{/if}
		<Input bind:value={skill.name} placeholder="skill name" required />
		<Input
			value={skill.stars === 0 ? "" : `${skill.stars}`}
			on:change={setStars}
			placeholder="stars"
			type="number"
			required
		/>
		<Input bind:value={skill.lang} placeholder="language" required />
		<Button type="submit" variant="ghost" class="w-full">Add</Button>
	</form>
</div>
