import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { yaxa } from 'yaxa-svelte/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter({
				fallback: '404.html'
			}),
			paths: {
				relative: false
			},
			compilerOptions: {
				runes: true
			}
		}),
		yaxa()
	]
});
