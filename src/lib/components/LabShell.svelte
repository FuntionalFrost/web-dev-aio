<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import LabPagination from '$lib/components/LabPagination.svelte';

	let {
		title,
		description,
		guide,
		lab,
		sandbox
	}: {
		moduleId?: string;
		title: string;
		description: string;
		guide: Snippet;
		lab?: Snippet;
		sandbox?: Snippet;
	} = $props();

	const siteUrl = 'https://web-engine26.pages.dev';
	let canonicalUrl = $derived(`${siteUrl}${page.url.pathname}`);
	let interactiveSnippet = $derived(lab ?? sandbox);
</script>

<!-- Structured Data -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': canonicalUrl
		},
		headline: title,
		description: description,
		inLanguage: 'en-US',
		author: {
			'@type': 'Organization',
			name: 'Web Engine 2026',
			url: siteUrl
		},
		publisher: {
			'@type': 'Organization',
			name: 'Web Engine 2026',
			url: siteUrl
		}
	}}
/>

<!-- SEO Metadata -->
<MetaTags
	title="{title} | Web Engine 2026"
	{description}
	canonical={canonicalUrl}
	openGraph={{
		title: `${title} | Web Engine 2026`,
		description: description,
		url: canonicalUrl,
		type: 'article'
	}}
/>

<div class="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-2">
	<!-- Left Column: Guide / Architecture Walkthrough -->
	<div class="prose flex max-w-none flex-col justify-start prose-slate dark:prose-invert">
		<div class="not-prose mb-2">
			<span
				class="inline-block rounded bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-indigo-600 uppercase dark:bg-indigo-950/50 dark:text-indigo-400"
			>
				Architecture Guide
			</span>
		</div>

		<h1 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
			{title}
		</h1>
		<p class="text-sm text-slate-600 dark:text-slate-400">{description}</p>

		{@render guide()}
	</div>

	<!-- Right Column: Interactive Simulator -->
	<div class="flex flex-col gap-6">
		{#if interactiveSnippet}
			{@render interactiveSnippet()}
		{/if}
	</div>

	<!-- Auto-rendered Module Pagination -->
	<LabPagination />
</div>
