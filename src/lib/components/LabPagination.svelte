<script lang="ts">
	import { page } from '$app/state';
	import { curriculum } from '$lib/data/curriculum';

	let currentIndex = $derived(curriculum.findIndex((m) => m.href === page.url.pathname));
	let prevModule = $derived(currentIndex > 0 ? curriculum[currentIndex - 1] : null);
	let nextModule = $derived(
		currentIndex < curriculum.length - 1 ? curriculum[currentIndex + 1] : null
	);
</script>

{#if currentIndex !== -1}
	<div
		class="col-span-full mt-12 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800"
	>
		{#if prevModule}
			<a
				href={prevModule.href}
				class="group flex flex-col rounded-xl p-2 text-left transition hover:bg-slate-100 dark:hover:bg-slate-900"
			>
				<span class="font-mono text-[10px] text-slate-400 uppercase">← Previous Lab</span>
				<span
					class="text-xs font-semibold text-slate-700 group-hover:text-indigo-600 dark:text-slate-300 dark:group-hover:text-indigo-400"
				>
					{prevModule.title}
				</span>
			</a>
		{:else}
			<div></div>
		{/if}

		{#if nextModule}
			<a
				href={nextModule.href}
				class="group flex flex-col rounded-xl p-2 text-right transition hover:bg-slate-100 dark:hover:bg-slate-900"
			>
				<span class="font-mono text-[10px] text-slate-400 uppercase">Next Lab →</span>
				<span
					class="text-xs font-semibold text-slate-700 group-hover:text-indigo-600 dark:text-slate-300 dark:group-hover:text-indigo-400"
				>
					{nextModule.title}
				</span>
			</a>
		{/if}
	</div>
{/if}
