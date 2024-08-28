<script lang="ts">
	import posthog from "posthog-js";
	import { browser } from "$app/environment";
	import "../app.css";

	if (browser) {
		posthog.init("phc_juMpa2thGeiCicOzN3sf01FqRmCZgmtme3lJniRHXuc", {
			api_host: "https://us.i.posthog.com",
			person_profiles: "always",
		});
	}
</script>

<slot />
