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
	class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
>
	<div
		class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
	>
		<span
			class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
		>
			{title}
		</span>
		{#if badge}
			<span
				class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400"
			>
				{badge}
			</span>
		{/if}
	</div>

	{@render children()}
</div>
