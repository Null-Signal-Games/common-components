<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button } from '$lib/index.js';
	import { fn } from 'storybook/test';

	const sampleAlert = () => {
		window.alert('button!');
	};

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			disabled: { control: 'boolean' },
			variant: { control: 'select', options: ['primary', 'secondary'] }
		},
		args: {
			disabled: false,
			onclick: fn(),
			variant: 'primary'
		}
	});
</script>

<Story name="Primary" args={{ onclick: sampleAlert }}>Criminal</Story>

<Story name="Primary Disabled" args={{ disabled: true, onclick: sampleAlert }}>What a shame</Story>

<Story name="Secondary" args={{ onclick: sampleAlert, variant: 'secondary' }}>Jinteki</Story>

<Story
	name="Secondary Disabled"
	args={{ disabled: true, onclick: sampleAlert, variant: 'secondary' }}>Ouch</Story
>
