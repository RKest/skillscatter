<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";

	import board from "$lib/stores/board";

	const downloadSvg = () => {
		if ($board == null) return;

		$board.setAttribute("xmlns", "http://www.w3.org/2000/svg");

		const preface = '<?xml version="1.0" standalone="no"?>\r\n';
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
		<Button builders={[builder]} variant="outline" class="">Export</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item on:click={downloadSvg}>SVG</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
