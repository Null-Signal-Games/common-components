import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		expect: { requireAssertions: true },
		projects: [
			// {
			// 	extends: './vite.config.ts',
			// 	test: {
			// 		name: 'client',
			// 		environment: 'browser',
			// 		browser: {
			// 			enabled: true,
			// 			provider: 'playwright',
			// 			instances: [{ browser: 'chromium' }]
			// 		},
			// 		include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
			// 		exclude: ['src/lib/server/**'],
			// 		setupFiles: ['./vitest-setup-client.ts']
			// 	}
			// },
			{
				plugins: [sveltekit(), svelteTesting()],
				test: {
					environment: 'jsdom',
					setupFiles: ['./vitest-setup-components.js'],
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
			// {
			// 	extends: './vite.config.ts',
			// 	test: {
			// 		name: 'server',
			// 		environment: 'node',
			// 		include: ['src/**/*.{test,spec}.{js,ts}'],
			// 		exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
			// 	}
			// }
		]
	}
});
