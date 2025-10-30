<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		disabled = false,
		onclick,
		children,
		type = 'primary'
	}: {
		disabled?: boolean;
		onclick: () => null;
		children: Snippet;
		type?: 'primary' | 'secondary';
	} = $props();
</script>

<button class={['basic', type]} {onclick} {disabled}> {@render children()}</button>

<style>
	.basic {
		border: none;
		border-radius: 0.2rem;
		padding: 0.4rem;
	}
	.basic:disabled {
		opacity: 0.5;
	}

	.primary {
		background-color: #194c9b;
		color: white;
	}

	.secondary {
		background-color: #e81328;
		color: white;
	}
</style>
