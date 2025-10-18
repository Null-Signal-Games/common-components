<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SparklyText from './SparklyText.svelte';

	const { Story } = defineMeta({
		title: 'Sparkly Text',
		component: SparklyText,
		tags: ['inline'],
		argTypes: {
			sparkleAmount: { control: 'number' },
			sparkleRate: { control: 'number' },
			sparkleVariance: { control: 'number' },
			disabled: { control: 'boolean' },
			allowPausing: { control: 'boolean' }
		}
	});
</script>

<Story name="Default" args={{ label: 'Sparkly Text' }} />
