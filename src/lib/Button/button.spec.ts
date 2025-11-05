import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Button from './Button.svelte';
import { simple } from './testsnippet.svelte';

// https://github.com/testing-library/user-event/issues/1146#issuecomment-1719689359
import { userEvent } from '@testing-library/user-event';

describe('button', () => {
	it('calls onclick when enabled', async () => {
		const fn = vi.fn();
		const user = userEvent.setup();

		render(Button, { props: { onclick: fn, children: simple } });
		const button = screen.getByRole('button');
		await user.click(button);

		expect(fn).toHaveBeenCalled();
	});
	it("doesn't call onclick when disabled", async () => {
		const fn = vi.fn();
		const user = userEvent.setup();

		render(Button, { props: { onclick: fn, children: simple, disabled: true } });
		const button = screen.getByRole('button');
		await user.click(button);

		expect(fn).not.toHaveBeenCalled();
	});
});
