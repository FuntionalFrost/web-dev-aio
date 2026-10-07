<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Badge } from 'yaxa-svelte';

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
	class="yaxa-surface-elevated space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900/50"
>
	<div
		class="flex items-center justify-between border-b border-slate-200 pb-3.5 dark:border-slate-800"
	>
		<span
			class="text-primary-600 dark:text-primary-400 text-sm font-bold tracking-wider uppercase transition-colors sm:text-base"
		>
			{title}
		</span>
		{#if badge}
			<Badge variant="subtle" color="neutral" size="sm">
				{badge}
			</Badge>
		{/if}
	</div>

	{@render children()}
</div>
