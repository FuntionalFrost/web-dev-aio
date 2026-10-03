<script lang="ts">
	import LabShell from '#lib/components/LabShell.svelte';
	import { simulators } from '#lib/simulators/index.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let mod = $derived(data.mod);
	let GuideComponent = $derived(data.component);
	let Simulator = $derived(simulators[data.slug]);
	let snippet = $derived(data.snippet);
	let filename = $derived(
		`${data.slug}.${
			snippet?.lang === 'typescript'
				? 'ts'
				: snippet?.lang === 'html'
					? 'html'
					: snippet?.lang === 'svelte'
						? 'svelte'
						: snippet?.lang === 'css'
							? 'css'
							: snippet?.lang === 'vue'
								? 'vue'
								: snippet?.lang === 'json'
									? 'json'
									: snippet?.lang === 'yaml'
										? 'yaml'
										: snippet?.lang === 'bash'
											? 'sh'
											: snippet?.lang === 'sql'
												? 'sql'
												: snippet?.lang === 'python'
													? 'py'
													: 'ts'
		}`
	);
</script>

<LabShell
	moduleId={mod.id}
	title={mod.title}
	description={mod.description}
	rawCode={snippet?.code}
	language={snippet?.lang}
	{filename}
>
	{#snippet guide()}
		<GuideComponent />
	{/snippet}

	{#if Simulator}
		<Simulator />
	{/if}
</LabShell>
