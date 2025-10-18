<script lang="ts">
	import { SparklyText } from './sparkly-text/sparkly-text.ts';

	interface Props {
		label: string;
		sparkleAmount?: number;
		sparkleRate?: number;
		sparkleVariance?: number;
		disabled?: boolean;
		allowPausing?: boolean;
	}

	const {
		sparkleAmount = 8,
		sparkleRate = 250,
		sparkleVariance = 200,
		disabled = false,
		allowPausing = true,
		label
	}: Props = $props();
</script>

<sparkly-text
	sparkle-amount={sparkleAmount}
	sparkle-rate={sparkleRate}
	sparkle-variance={sparkleVariance}
	{disabled}
	allow-pausing={allowPausing}
>
	{label}
</sparkly-text>
