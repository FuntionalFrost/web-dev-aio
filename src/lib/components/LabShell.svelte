<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import LabPagination from '$lib/components/LabPagination.svelte';
	import { progress } from '$lib/state/progress.svelte';

	let {
		moduleId,
		title,
		description,
		guide,
		sandbox
	}: {
		moduleId: string;
		title: string;
		description: string;
		guide: Snippet;
		sandbox: Snippet;
	} = $props();

	const siteUrl = 'https://web-engine26.pages.dev';
	let canonicalUrl = $derived(`${siteUrl}${page.url.pathname}`);
	let completed = $derived(progress.isComplete(moduleId));
</script>

<!-- Structured Data for Search Engine Rich Snippets -->
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

<!-- Deep-merged Metadata with Root Layout -->
<MetaTags
	{title}
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
	<!-- Left Column: Guide / Code Walkthrough -->
	<div class="prose flex max-w-none flex-col justify-start prose-slate dark:prose-invert">
		<div class="not-prose mb-2 flex items-center justify-between">
			<span
				class="font-mono text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
			>
				Interactive Lab
			</span>
			<button
				onclick={() => progress.toggleComplete(moduleId)}
				class="rounded-lg border px-2.5 py-1 font-mono text-xs transition {completed
					? 'border-emerald-500/40 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
					: 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'}"
			>
				{completed ? '✓ Completed' : 'Mark as Complete'}
			</button>
		</div>

		<h1 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
			{title}
		</h1>
		<p class="text-sm text-slate-600 dark:text-slate-400">{description}</p>

		{@render guide()}
	</div>

	<!-- Right Column: Interactive UI Lab -->
	<div class="flex flex-col gap-6">
		{@render sandbox()}
	</div>

	<!-- Auto-rendered Module Pagination -->
	<LabPagination />
</div>
