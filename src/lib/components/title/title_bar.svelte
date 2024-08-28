<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import { Button } from "$lib/components/ui/button";

	import Cloud from "lucide-svelte/icons/cloud";
	import Share from "lucide-svelte/icons/share";

	import ExportDropdown from "$lib/components/title/export_dropdown.svelte";
</script>

<div class="flex pt-2 pb-1 items-center">
	<Cloud class="ml-8 mr-1" />
	<span class="text-2xl">Skillcloud</span>
	<div class="flex flex-1 justify-end">
		<ExportDropdown />
		<Button class="mr-8" variant="outline">
			<Share class="mr-1" size={15} />
		</Button>
	</div>
</div>
<Separator class="my-1" />
