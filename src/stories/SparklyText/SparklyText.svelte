<script lang="ts">
	import { SparklyText } from './sparkly-text.ts';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		sparkleAmount?: number;
		sparkleRate?: number;
		sparkleVariance?: number;
		disabled?: boolean;
		allowPausing?: boolean;
		size?: string;
		animationLength?: string;
		color?: string;
		textShadowColor?: string;
	}

	const {
		sparkleAmount = 8,
		sparkleRate = 250,
		sparkleVariance = 200,
		disabled = false,
		allowPausing = true,
		size = '15px',
		animationLength = '900ms',
		color = '#FFC700',
		textShadowColor = 'none',
		children
	}: Props = $props();
</script>

{#key allowPausing}
	{#key sparkleAmount}
		<sparkly-text
			sparkle-amount={sparkleAmount}
			sparkle-rate={sparkleRate}
			sparkle-variance={sparkleVariance}
			{disabled}
			allow-pausing={allowPausing}
			style="
			  --sparkly-text-size: {size};
				--sparkly-text-animation-length: {animationLength};
				--sparkly-text-color: {color};
				--sparkly-text-shadow-color: {textShadowColor};
			"
		>
			{@render children?.()}
		</sparkly-text>
	{/key}
{/key}

<style>
	sparkly-text {
		font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}
</style>
