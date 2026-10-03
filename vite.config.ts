import { mdsvex, escapeSvelte } from 'mdsvex';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { yaxa } from 'yaxa-svelte/vite';
import { createHighlighter } from 'shiki';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { defineConfig } from 'vite';

const highlighter = await createHighlighter({
	themes: ['github-dark-dimmed'],
	langs: [
		'typescript',
		'javascript',
		'html',
		'css',
		'svelte',
		'vue',
		'json',
		'yaml',
		'bash',
		'sql',
		'python'
	],
	engine: createJavaScriptRegexEngine()
});

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter({
				fallback: '404.html'
			}),
			alias: {
				$lib: 'src/lib'
			},
			paths: {
				relative: false
			},
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					highlight: {
						highlighter: async (code, lang = 'typescript') => {
							const html = escapeSvelte(
								highlighter.codeToHtml(code.trim(), {
									lang: lang || 'typescript',
									theme: 'github-dark-dimmed'
								})
							);
							return `{@html \`${html}\`}`;
						}
					}
				}),
				vitePreprocess()
			],
			extensions: ['.svelte', '.svx', '.md'],
			compilerOptions: {
				runes: true
			}
		}),
		yaxa()
	]
});
