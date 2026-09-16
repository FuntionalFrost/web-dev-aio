<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { Badge, Breadcrumb } from 'yaxa-svelte';
	import LabPagination from '$lib/components/LabPagination.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { curriculum } from '$lib/data/curriculum';
	import { cleanPath } from '$lib/utils/url';
	import { SITE } from '$lib/config/site';

	let {
		moduleId,
		title: propTitle,
		description: propDescription,
		codeHtml,
		rawCode,
		filename,
		guideHtml,
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
		guideHtml?: string;
		guide?: Snippet;
		children?: Snippet;
		lab?: Snippet;
		sandbox?: Snippet;
	} = $props();

	// Resolve active curriculum module by moduleId or current route path
	let mod = $derived(
		curriculum.find(
			(m) => (moduleId && m.id === moduleId) || cleanPath(m.href) === cleanPath(page.url.pathname)
		)
	);

	let title = $derived(propTitle ?? mod?.title ?? 'Engineering Lab');
	let description = $derived(propDescription ?? mod?.description ?? SITE.description);
	let interactiveSnippet = $derived(children ?? lab ?? sandbox);

	let breadcrumbItems = $derived(
		mod
			? [
					{ label: 'Curriculum', href: '/' },
					{ label: mod.track, href: `/?track=${encodeURIComponent(mod.track)}` },
					{ label: mod.title }
				]
			: [{ label: 'Curriculum', href: '/' }, { label: title }]
	);
</script>

<div class="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-2">
	<!-- Left Column: Guide & CodeBlock -->
	<div class="prose flex max-w-none flex-col justify-start prose-slate dark:prose-invert">
		<div class="not-prose mb-3 flex flex-wrap items-center gap-3">
			<Breadcrumb items={breadcrumbItems} class="font-mono text-xs" />
			<Badge variant="soft" color="primary" size="sm">
				{mod?.category ?? 'Architecture Guide'}
			</Badge>
		</div>

		<h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
			{title}
		</h1>
		<p class="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
			{description}
		</p>

		{#if codeHtml}
			<div class="not-prose my-2">
				<CodeBlock {codeHtml} {rawCode} {filename} />
			</div>
		{/if}

		{#if guideHtml}
			<div
				class="space-y-4 text-base leading-relaxed sm:text-lg [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:dark:text-white [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html guideHtml}
			</div>
		{:else if guide}
			<div
				class="space-y-4 text-base leading-relaxed sm:text-lg [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:dark:text-white [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5"
			>
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
