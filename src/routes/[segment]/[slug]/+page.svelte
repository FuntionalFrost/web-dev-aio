<script lang="ts">
	import LabShell from '#lib/components/LabShell.svelte';
	import { simulators } from '#lib/simulators/index.js';
	import type { PageData } from './$types';

	const EXT_MAP: Record<string, string> = {
		typescript: 'ts',
		html: 'html',
		svelte: 'svelte',
		css: 'css',
		vue: 'vue',
		json: 'json',
		yaml: 'yaml',
		bash: 'sh',
		sql: 'sql',
		python: 'py'
	};

	let { data }: { data: PageData } = $props();

	let mod = $derived(data.mod);
	let Simulator = $derived(simulators[data.slug]);
	let snippet = $derived(data.snippet);
	let ext = $derived(EXT_MAP[snippet?.lang ?? 'typescript'] ?? 'ts');
	let filename = $derived(`${data.slug}.${ext}`);
</script>

<LabShell
	moduleId={mod.id}
	title={mod.title}
	description={mod.description}
	rawCode={snippet?.code}
	language={snippet?.lang}
	{filename}
	guideHtml={data.guideHtml}
>
	{#if Simulator}
		<Simulator />
	{/if}
</LabShell>
