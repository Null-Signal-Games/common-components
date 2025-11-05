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
		cursor: auto;
	}
	.basic:disabled:hover {
		filter: brightness(100%);
	}
	.basic:active:disabled {
		filter: brightness(100%);
	}
	.basic:hover {
		filter: brightness(125%);
	}
	.basic:active {
		filter: brightness(50%);
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
