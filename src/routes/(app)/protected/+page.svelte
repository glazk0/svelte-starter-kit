<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>
	Welcome to SvelteStarterKit <span class="text-blue-500">{data.session?.user.username} !</span>
</h1>
