<script lang="ts">
	import { curriculum, TRACK_ORDER } from '$lib/data/curriculum';

	let activeTrack = $state<string>('All');
	let searchQuery = $state<string>('');

	let filteredModules = $derived(
		curriculum.filter((mod) => {
			const matchesTrack = activeTrack === 'All' || mod.track === activeTrack;
			const q = searchQuery.toLowerCase().trim();
			const matchesQuery =
				!q ||
				mod.title.toLowerCase().includes(q) ||
				mod.description.toLowerCase().includes(q) ||
				mod.category.toLowerCase().includes(q) ||
				mod.tech.some((t) => t.toLowerCase().includes(q));

			return matchesTrack && matchesQuery;
		})
	);
</script>

<div class="mx-auto max-w-7xl space-y-8 p-6 sm:p-8">
	<!-- Hero Section -->
	<div class="space-y-2">
		<span
			class="font-mono text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400"
		>
			Interactive Curriculum
		</span>
		<h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
			Full-Stack Architecture Labs
		</h1>
		<p class="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
			21 production-grade engineering modules covering modern HTML5 semantics, ECMAScript standards,
			Svelte 5 runes, RPC schemas, and serverless edge deployments.
		</p>
	</div>

	<!-- Unified Toolbar: Filter Tabs + Prominent Search -->
	<div
		class="flex flex-col gap-4 border-y border-slate-200/80 py-4 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800/80"
	>
		<!-- Filter Pills -->
		<div class="flex flex-wrap items-center gap-1.5">
			<button
				onclick={() => (activeTrack = 'All')}
				class="rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all {activeTrack ===
				'All'
					? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
					: 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'}"
			>
				All ({curriculum.length})
			</button>

			{#each TRACK_ORDER as track (track)}
				{@const count = curriculum.filter((m) => m.track === track).length}
				<button
					onclick={() => (activeTrack = track)}
					class="rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold transition-all {activeTrack ===
					track
						? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
						: 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'}"
				>
					{track} ({count})
				</button>
			{/each}
		</div>

		<!-- Search Input -->
		<div class="relative w-full shrink-0 lg:w-72">
			<span
				class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"
			>
				🔍
			</span>
			<input
				type="search"
				bind:value={searchQuery}
				placeholder="Filter 21 engineering labs..."
				class="h-9 w-full rounded-xl border border-slate-300 bg-slate-50 pr-3 pl-8 font-mono text-xs text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-950"
			/>
		</div>
	</div>

	<!-- Cards Grid -->
	{#if filteredModules.length > 0}
		<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredModules as mod (mod.id)}
				<a
					href={mod.href}
					class="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-indigo-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-indigo-500/50"
				>
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<span
								class="rounded bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-indigo-600 uppercase dark:bg-indigo-950/60 dark:text-indigo-400"
							>
								{mod.category}
							</span>
							<span class="font-mono text-[10px] text-slate-400">
								{mod.track}
							</span>
						</div>
						<h2
							class="text-sm font-bold tracking-tight text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400"
						>
							{mod.title}
						</h2>
						<p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
							{mod.description}
						</p>
					</div>

					<div
						class="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3 dark:border-slate-800/80"
					>
						{#each mod.tech as tag (tag)}
							<span
								class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
							>
								{tag}
							</span>
						{/each}
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<div
			class="rounded-2xl border border-dashed border-slate-300 p-12 text-center font-mono text-xs text-slate-500 dark:border-slate-800"
		>
			No modules found matching your search.
		</div>
	{/if}
</div>
