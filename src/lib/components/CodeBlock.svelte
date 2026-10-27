<script lang="ts">
	import { CodeBlock as YaxaCodeBlock } from 'yaxa-svelte';

	let {
		rawCode = '',
		code = '',
		filename = 'snippet.ts',
		language,
		themeMode = 'adaptive',
		class: className = ''
	}: {
		rawCode?: string;
		code?: string;
		filename?: string;
		language?: string;
		themeMode?: 'dark' | 'adaptive';
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
							: filename.endsWith('.sql')
								? 'sql'
								: filename.endsWith('.yml') || filename.endsWith('.yaml')
									? 'yaml'
									: filename.endsWith('.sh') || filename.endsWith('.dockerfile')
										? 'bash'
										: 'typescript')
	);
</script>

{#if textToCopy}
	<YaxaCodeBlock
		code={textToCopy}
		language={detectedLang}
		{filename}
		{themeMode}
		class="my-4 yaxa-surface-elevated {className}"
	/>
{/if}
