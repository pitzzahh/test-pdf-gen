<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let fileName = 'test.pdf';
	let iframeKey = 0;
	let debounce: NodeJS.Timeout;

	$: route = `api/pdf/${fileName}?key=${iframeKey}`;

	onMount(() => {
		console.log('Mounted');
	});

	onDestroy(() => {
		console.log('Destroyed');
	});
</script>

<div class="flex items-center justify-between h-screen">
	<div class="flex items-center justify-center flex-col">
		<h1>Welcome to SvelteKit</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
		<input
			class="bg-slate-200 px-4 py-2 border border-slate-300 rounded-md w-80 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
			type="text"
			on:input={(e) => {
				clearTimeout(debounce);
				debounce = setTimeout(() => {
					// @ts-ignore
					fileName = e?.target?.value || '';
					iframeKey += 1;
				}, 500);
			}}
		/>
	</div>
	<iframe title="PDF Preview" src={route} frameborder="0" width="50%" height="100%" />
</div>
