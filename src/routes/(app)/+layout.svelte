<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<nav class="flex items-center justify-between">
	<a class="text-xl font-bold" href="/"> SvelteStarterKit </a>
	<ul class="flex items-center gap-4">
		<li>
			<a href="/">Home</a>
		</li>
		{#if data.session}
			<li>
				<a href="/protected">Protected</a>
			</li>
		{/if}
		<li>
			{#if data.session}
				<form method="post" action="?/logout" use:enhance>
					<button type="submit">Sign out</button>
				</form>
			{:else}
				<button on:click={() => goto('/api/oauth/discord')}>Login</button>
			{/if}
		</li>
	</ul>
</nav>

<slot />
