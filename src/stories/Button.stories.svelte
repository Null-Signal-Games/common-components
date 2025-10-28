<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '$lib/Button.svelte';
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
			children: {
				control: 'text'
			}
		},
		args: {
			disabled: false,
			onclick: fn(),
			children: 'button'
		}
	});
</script>

<Story name="Primary" args={{ children: 'Button', onclick: sampleAlert }} />

<Story name="Disabled" args={{ children: 'Button', disabled: true, onclick: sampleAlert }} />
