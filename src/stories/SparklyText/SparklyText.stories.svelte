<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import { createRawSnippet } from 'svelte';
	import SparklyText from '$lib/SparklyText/SparklyText.svelte';

	const { Story } = defineMeta({
		title: 'Sparkly Text',
		component: SparklyText,
		tags: ['inline', 'web component', 'wrapper'],
		argTypes: {
			sparkleAmount: { control: 'number' },
			sparkleRate: { control: 'number' },
			sparkleVariance: { control: 'number' },
			disabled: { control: 'boolean' },
			allowPausing: { control: 'boolean' },
			size: { control: 'text', description: 'Accepts any valid CSS size unit.' },
			animationLength: { control: 'text', description: 'Accepts any valid CSS time unit.' },
			color: { control: 'color' },
			textShadowColor: {
				control: 'color',
				description:
					'Accepts any valid CSS color. Intended to match the background color so stars are harder to see when they go behind the text.'
			}
		},
		args: {
			children: createRawSnippet(() => ({ render: () => 'Sparkly Text' }))
		}
	});
</script>

<Story
	name="Default"
	args={{ children: createRawSnippet(() => ({ render: () => 'Sparkly Text' })) }}
></Story>

<Story
	name="Has Image"
	args={{
		children: createRawSnippet(() => ({
			render: () =>
				`<img src="https://nullsignal.games/wp-content/uploads/2025/10/OWL_C9_Illustration.png" style="max-width: 20rem;">`
		})),
		sparkleAmount: 12,
		sparkleRate: 150,
		sparkleVariance: 100,
		size: '1rem',
		allowPausing: false,
		color: '#eee'
	}}
></Story>

<Story
	name="Has Text Shadow"
	args={{
		children: createRawSnippet(() => ({ render: () => 'Sparkly Text' })),
		textShadowColor: 'white'
	}}
></Story>

<Story
	name="Incorrect Sparkle Variance"
	args={{
		children: createRawSnippet(() => ({ render: () => 'Sparkly Text' })),
		sparkleRate: 250,
		sparkleVariance: 300
	}}
></Story>

<Story
	name="Disallow Pausing"
	args={{
		allowPausing: false
	}}
></Story>
