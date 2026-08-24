<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
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
	let canonicalUrl = $derived(`${SITE.url}${page.url.pathname}`);
	let interactiveSnippet = $derived(children ?? lab ?? sandbox);
</script>

<!-- Structured Data -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
		headline: title,
		description,
		inLanguage: 'en-US',
		author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
		publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url }
	}}
/>

<!-- SEO Metadata -->
<MetaTags
	title="{title} | {SITE.name}"
	{description}
	canonical={canonicalUrl}
	openGraph={{
		title: `${title} | ${SITE.name}`,
		description,
		url: canonicalUrl,
		type: 'article'
	}}
/>

<div class="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-2">
	<!-- Left Column: Guide & CodeBlock -->
	<div class="prose flex max-w-none flex-col justify-start prose-slate dark:prose-invert">
		<div class="not-prose mb-2">
			<span
				class="inline-block rounded bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-indigo-600 uppercase dark:bg-indigo-950/50 dark:text-indigo-400"
			>
				{mod?.category ?? 'Architecture Guide'}
			</span>
		</div>

		<h1 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
			{title}
		</h1>
		<p class="text-sm text-slate-600 dark:text-slate-400">{description}</p>

		{#if codeHtml}
			<div class="not-prose">
				<CodeBlock {codeHtml} {rawCode} {filename} />
			</div>
		{/if}

		{#if guide}
			{@render guide()}
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
