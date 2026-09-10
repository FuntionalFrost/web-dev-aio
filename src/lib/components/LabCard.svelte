<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		badge,
		children
	}: {
		title: string;
		badge?: string;
		children: Snippet;
	} = $props();
</script>

<div
	class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
>
	<div
		class="flex items-center justify-between border-b border-slate-200 pb-3.5 dark:border-slate-800"
	>
		<span
			class="text-sm font-bold tracking-wider text-indigo-600 uppercase sm:text-base dark:text-indigo-400"
		>
			{title}
		</span>
		{#if badge}
			<span
				class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
			>
				{badge}
			</span>
		{/if}
	</div>

	{@render children()}
</div>
