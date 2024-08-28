<script lang="ts">
	import posthog from "posthog-js";

	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";

	import board from "$lib/stores/board";

	const downloadSvg = () => {
		posthog.capture("export_svg");

		if ($board == null) return;

		$board.setAttribute("xmlns", "http://www.w3.org/2000/svg");

		const preface =
			'<?xml version="1.0" standalone="no"?>\r\n' +
			"<!-- Created with https://rkest.github.io/skillscatter/ -->";
		const svgData = $board.outerHTML;
		const svgBlob = new Blob([preface, svgData], {
			type: "image/svg+xml;charset=utf-8",
		});
		const svgUrl = URL.createObjectURL(svgBlob);
		const downloadLink = document.createElement("a");
		downloadLink.style.display = "none";
		downloadLink.href = svgUrl;
		downloadLink.download = "skills.svg";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" class="mr-1 mt-1">
			Export
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item on:click={downloadSvg}>SVG</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
