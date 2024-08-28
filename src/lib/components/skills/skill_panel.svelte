<script lang="ts">
	import { slide } from "svelte/transition";
	import * as Collapsible from "$lib/components/ui/collapsible";
	import { Button } from "$lib/components/ui/button";
	import { Separator } from "$lib/components/ui/separator";
	import ChevronsLeftRigth from "lucide-svelte/icons/chevrons-left-right";

	import SkillsForm from "$lib/components/skills/skill_form.svelte";
	import SkillsList from "$lib/components/skills/skill_list.svelte";

	const transition = (node: Element) => slide(node, { axis: "x" });
</script>

<Collapsible.Root class="flex flex-row-reverse" open={true}>
	<Collapsible.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" class="mt-1">
			<ChevronsLeftRigth />
		</Button>
	</Collapsible.Trigger>
	<Collapsible.Content class="flex flex-col overflow-hidden" {transition}>
		<SkillsForm />
		<Separator class="my-2" />
		<SkillsList />
	</Collapsible.Content>
</Collapsible.Root>
