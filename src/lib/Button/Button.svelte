<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		disabled = false,
		onclick,
		children,
		variant = 'primary'
	}: {
		disabled?: boolean;
		onclick: () => void;
		children: Snippet;
		variant?: 'primary' | 'secondary';
	} = $props();
</script>

<button class={['basic', variant]} {onclick} {disabled}> {@render children()}</button>

<style>
	.basic {
		border: none;
		border-radius: 0.2rem;
		padding: 0.4rem;
		cursor: pointer;
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
