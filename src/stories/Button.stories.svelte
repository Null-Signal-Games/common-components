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
			type: { control: 'select', options: ['primary', 'secondary'] }
		},
		args: {
			disabled: false,
			onclick: fn(),
			type: 'primary'
		}
	});
</script>

<Story name="Primary" args={{ onclick: sampleAlert }}>Criminal</Story>

<Story name="Primary Disabled" args={{ disabled: true, onclick: sampleAlert }}>What a shame</Story>

<Story name="Secondary" args={{ onclick: sampleAlert, type: 'secondary' }}>Jinteki</Story>

<Story name="Secondary Disabled" args={{ disabled: true, onclick: sampleAlert, type: 'secondary' }}
	>Ouch</Story
>
