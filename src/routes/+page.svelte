<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let fileName = 'test.pdf';
	let iframeKey = 0;
	$: route = `api/pdf/${fileName}?key=${iframeKey}`;

	const updatePreview = () => {
		fileName = Math.random().toString(36).substring(7) + '.pdf';
		iframeKey += 1;
	};

	onMount(() => {
		console.log('Mounted');
	});

	onDestroy(() => {
		console.log('Destroyed');
	});
</script>

<div style="display: flex; justify-content: center; width: 100%; height: 100vh;">
	<div>
		<h1>Welcome to SvelteKit</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

		<input type="text" bind:value={fileName} />
	</div>

	<iframe title="PDF Preview" src={route} frameborder="0" width="100%" height="100%" />
</div>
