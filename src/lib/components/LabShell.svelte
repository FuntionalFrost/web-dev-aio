<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import LabPagination from '$lib/components/LabPagination.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { curriculum } from '$lib/data/curriculum';
	import { SITE } from '$lib/config/site';

	let {
		moduleId,
		title: propTitle,
		description: propDescription,
		codeHtml,
		rawCode,
		filename,
		guide,
		children,
		lab,
		sandbox
	}: {
		moduleId?: string;
		title?: string;
		description?: string;
		codeHtml?: string;
		rawCode?: string;
		filename?: string;
		guide?: Snippet;
		children?: Snippet;
		lab?: Snippet;
		sandbox?: Snippet;
	} = $props();

	const cleanPath = (p: string) => p.replace(/\/$/, '');

	// Resolve active curriculum module by moduleId or current route path
	let mod = $derived(
		curriculum.find(
			(m) => (moduleId && m.id === moduleId) || cleanPath(m.href) === cleanPath(page.url.pathname)
		)
	);

	let title = $derived(propTitle ?? mod?.title ?? 'Engineering Lab');
	let description = $derived(propDescription ?? mod?.description ?? SITE.description);
	let interactiveSnippet = $derived(children ?? lab ?? sandbox);
</script>

<div class="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-2">
	<!-- Left Column: Guide & CodeBlock -->
	<div class="prose flex max-w-none flex-col justify-start prose-slate dark:prose-invert">
		<div class="not-prose mb-3">
			<span
				class="inline-block rounded-md bg-indigo-50 px-3 py-1 font-mono text-sm font-bold tracking-wider text-indigo-600 uppercase dark:bg-indigo-950/60 dark:text-indigo-400"
			>
				{mod?.category ?? 'Architecture Guide'}
			</span>
		</div>

		<h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
			{title}
		</h1>
		<p class="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>

		{#if codeHtml}
			<div class="not-prose my-2">
				<CodeBlock {codeHtml} {rawCode} {filename} />
			</div>
		{/if}

		{#if guide}
			<div class="space-y-4 text-base sm:text-lg leading-relaxed [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:dark:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-2">
				{@render guide()}
			</div>
		{/if}
	</div>

	<!-- Right Column: Interactive Simulators -->
	<div class="flex flex-col gap-6">
		{#if interactiveSnippet}
			{@render interactiveSnippet()}
		{/if}
	</div>

	<LabPagination />
</div>
