<script lang="ts">
	import { CodeBlock as YaxaCodeBlock, Button, Icon, useToast } from 'yaxa-svelte';

	let {
		codeHtml,
		rawCode = '',
		code = '',
		filename = 'snippet.ts',
		language,
		class: className = ''
	}: {
		codeHtml?: string;
		rawCode?: string;
		code?: string;
		filename?: string;
		language?: string;
		class?: string;
	} = $props();

	let textToCopy = $derived(rawCode || code);
	let detectedLang = $derived(
		language ||
			(filename.endsWith('.html')
				? 'html'
				: filename.endsWith('.css')
					? 'css'
					: filename.endsWith('.json')
						? 'json'
						: filename.endsWith('.svelte')
							? 'svelte'
							: 'typescript')
	);

	let copied = $state(false);
	const toast = useToast();

	function copyToClipboard() {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(textToCopy);
			copied = true;
			toast.success('Copied to clipboard', filename || `${detectedLang.toUpperCase()} snippet`);
			setTimeout(() => {
				copied = false;
			}, 2000);
		}
	}
</script>

{#if codeHtml}
	<div
		class="relative my-4 overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950 font-mono text-base shadow-lg transition-all dark:border-slate-800 dark:shadow-2xl {className}"
	>
		<div
			class="flex items-center justify-between border-b border-slate-800/90 bg-slate-900/90 px-4 py-2.5 text-xs font-semibold text-slate-300 sm:text-sm"
		>
			<div class="flex items-center gap-2">
				<span class="flex items-center gap-2 font-medium text-slate-200">
					<span class="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400/50"
					></span>
					{filename}
				</span>
			</div>
			<div class="flex items-center gap-2">
				{#if detectedLang}
					<span
						class="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase"
					>
						{detectedLang}
					</span>
				{/if}
				{#if textToCopy}
					<Button
						size="xs"
						variant="ghost"
						onclick={copyToClipboard}
						class="h-7 px-2.5 text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
						aria-label="Copy code to clipboard"
					>
						<Icon name={copied ? 'check' : 'copy'} size="xs" class="mr-1" />
						{copied ? 'Copied' : 'Copy'}
					</Button>
				{/if}
			</div>
		</div>
		<div
			class="overflow-x-auto p-4 text-xs leading-relaxed text-slate-200 sm:text-sm [&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!"
		>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html codeHtml}
		</div>
	</div>
{:else if textToCopy}
	<YaxaCodeBlock code={textToCopy} language={detectedLang} {filename} class="my-4 {className}" />
{/if}
