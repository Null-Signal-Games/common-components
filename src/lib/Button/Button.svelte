<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		disabled = false,
		onclick,
		children
	}: { disabled?: boolean; onclick: () => null; children: Snippet } = $props();
</script>

<button {onclick} {disabled}> {@render children()}</button>

<style>
</style>
