<script lang="ts">
	import { page } from '$app/state';
	import { curriculum } from '$lib/data/curriculum';

	const cleanPath = (p: string) => p.replace(/\/$/, '');

	let currentIndex = $derived(
		curriculum.findIndex((m) => cleanPath(m.href) === cleanPath(page.url.pathname))
	);
	let prevModule = $derived(currentIndex > 0 ? curriculum[currentIndex - 1] : null);
	let nextModule = $derived(
		currentIndex >= 0 && currentIndex < curriculum.length - 1 ? curriculum[currentIndex + 1] : null
	);
</script>

<div
	class="col-span-1 flex items-center justify-between border-t border-slate-200 pt-6 lg:col-span-2 dark:border-slate-800"
>
	{#if prevModule}
		<a
			href={prevModule.href}
			class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 font-mono text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
		>
			← {prevModule.title}
		</a>
	{:else}
		<div></div>
	{/if}

	{#if nextModule}
		<a
			href={nextModule.href}
			class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-mono text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500"
		>
			{nextModule.title} →
		</a>
	{/if}
</div>
