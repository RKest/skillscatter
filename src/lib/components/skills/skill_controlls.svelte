<script lang="ts">
	import ElipsisVertical from "lucide-svelte/icons/ellipsis-vertical";
	import Trash from "lucide-svelte/icons/trash-2";
	import Pencil from "lucide-svelte/icons/pencil";

	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import * as Popover from "$lib/components/ui/popover";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	import type { Skill } from "$lib/types/skillcloud";
	import skills from "$lib/stores/skills";

	export let skill: Skill;

	let editPopoverOpen = false;

	function deleteSkill() {
		skills.update((ss) => ss.filter((s: Skill) => s.url !== skill.url));
	}

	function updateSkill() {
		skills.update((ss) =>
			ss.map((s: Skill) => (s.url === skill.url ? skill : s)),
		);
		editPopoverOpen = false;
	}

	function updateOnEnter(event: KeyboardEvent) {
		if (event.key === "Enter") {
			updateSkill();
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" class="me-1 px-2 py-6">
			<ElipsisVertical height={20} />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item on:click={() => (editPopoverOpen = true)}>
			<Pencil class="mr-2 h-4 w-4" />
			<span>Edit</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item on:click={deleteSkill}>
			<Trash class="mr-2 h-4 w-4" color="hsl(var(--destructive))" />
			<span class="text-destructive">Delete</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<Popover.Root bind:open={editPopoverOpen}>
	<Popover.Trigger />
	<Popover.Content class="space-y-1">
		<Input
			bind:value={skill.url}
			on:keydown={updateOnEnter}
			type="text"
			required
		/>
		<Input
			bind:value={skill.name}
			on:keydown={updateOnEnter}
			type="text"
			required
		/>
		<Input
			bind:value={skill.lang}
			on:keydown={updateOnEnter}
			type="text"
			required
		/>
		<Input
			bind:value={skill.stars}
			on:keydown={updateOnEnter}
			type="number"
			required
		/>
		<Button variant="ghost" class="w-full" on:click={updateSkill}>
			Save
		</Button>
	</Popover.Content>
</Popover.Root>
