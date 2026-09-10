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

{#if currentIndex !== -1}
	<div
		class="sticky bottom-0 z-20 col-span-full -mx-6 mt-12 -mb-6 border-t border-slate-200/80 bg-white/80 p-4 backdrop-blur-md sm:-mx-10 sm:-mb-10 sm:px-10 dark:border-slate-800/80 dark:bg-slate-950/80"
	>
		<div class="flex items-center justify-between gap-4 font-mono text-sm">
			<!-- Previous Lab Link -->
			{#if prevModule}
				<a
					href={prevModule.href}
					class="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-800 shadow-xs transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
				>
					<span class="text-base">←</span>
					<div class="text-left">
						<span class="hidden text-sm text-slate-500 uppercase sm:block dark:text-slate-400"
							>Previous Module</span
						>
						<span class="block max-w-40 truncate font-bold sm:max-w-64">{prevModule.title}</span>
					</div>
				</a>
			{:else}
				<div></div>
			{/if}

			<!-- Next Lab Link -->
			{#if nextModule}
				<a
					href={nextModule.href}
					class="flex items-center gap-2.5 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-500"
				>
					<div class="text-right">
						<span class="hidden text-sm text-indigo-200 uppercase sm:block">Next Module</span>
						<span class="block max-w-40 truncate font-bold sm:max-w-64">{nextModule.title}</span>
					</div>
					<span class="text-base">→</span>
				</a>
			{:else}
				<a
					href="/"
					class="rounded-xl bg-emerald-600 px-5 py-2.5 text-base font-bold text-white shadow-sm shadow-emerald-500/20 transition hover:bg-emerald-500"
				>
					Curriculum Complete ✓
				</a>
			{/if}
		</div>
	</div>
{/if}
