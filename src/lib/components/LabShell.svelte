<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
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

	let completed = $derived(progress.isComplete(moduleId));
</script>

<svelte:head>
	<title>{title} | Web Engine 2026</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="{title} | Web Engine 2026" />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={page.url.href} />
</svelte:head>

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

		<h2>{title}</h2>
		<p>{description}</p>

		{@render guide()}
	</div>

	<!-- Right Column: Interactive UI Lab -->
	<div class="flex flex-col gap-6">
		{@render sandbox()}
	</div>

	<!-- Auto-rendered Module Pagination -->
	<LabPagination />
</div>
