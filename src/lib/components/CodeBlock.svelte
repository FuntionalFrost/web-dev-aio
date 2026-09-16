<script lang="ts">
	import { CodeBlock as YaxaCodeBlock } from 'yaxa-svelte';

	let {
		codeHtml,
		rawCode = '',
		filename = 'snippet.ts',
		language
	}: {
		codeHtml?: string;
		rawCode?: string;
		filename?: string;
		language?: string;
	} = $props();

	let detectedLang = $derived(
		language ||
			(filename.endsWith('.html') ? 'html' : filename.endsWith('.css') ? 'css' : 'typescript')
	);
</script>

{#if rawCode}
	<YaxaCodeBlock code={rawCode} language={detectedLang} {filename} class="my-4" />
{:else if codeHtml}
	<div
		class="relative my-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 font-mono text-base shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:shadow-xl"
	>
		<div
			class="flex items-center justify-between border-b border-slate-200 bg-slate-100/90 px-4 py-2.5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
		>
			<span class="flex items-center gap-2.5 font-medium">
				<span class="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
				{filename}
			</span>
		</div>
		<div
			class="overflow-x-auto p-4 text-sm sm:text-base [&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!"
		>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html codeHtml}
		</div>
	</div>
{/if}
