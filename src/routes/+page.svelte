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

<div class="mx-auto max-w-7xl space-y-8 p-6 sm:p-10">
	<!-- Hero Section -->
	<div class="space-y-3">
		<span
			class="inline-block rounded-lg bg-indigo-50 px-3 py-1 font-mono text-sm font-bold tracking-wider text-indigo-600 uppercase dark:bg-indigo-950/60 dark:text-indigo-400"
		>
			Engineering Labs & Architecture 2026
		</span>
		<h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
			Full-Stack Architecture Labs
		</h1>
		<p class="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
			35 production-grade engineering modules covering Svelte 5 Universal Runes & Async streaming,
			SvelteKit 2 routing & adapters, Nuxt 4, Nitro & Hono engines, Node 24 / Bun / Deno runtimes,
			SSG/SSR rendering strategies, strict CSP security, and software license architectures.
		</p>
	</div>

	<!-- Unified Toolbar: Filter Tabs + Search -->
	<div
		class="flex flex-col gap-5 border-y border-slate-200/80 py-6 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800/80"
	>
		<!-- Filter Pills -->
		<div class="flex flex-wrap items-center gap-2">
			<button
				onclick={() => (activeTrack = 'All')}
				class="rounded-xl px-4 py-2 font-mono text-sm font-semibold transition-all {activeTrack ===
				'All'
					? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
					: 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'}"
			>
				All ({curriculum.length})
			</button>

			{#each TRACK_ORDER as track (track)}
				{@const count = curriculum.filter((m) => m.track === track).length}
				<button
					onclick={() => (activeTrack = track)}
					class="rounded-xl px-4 py-2 font-mono text-sm font-semibold transition-all {activeTrack ===
					track
						? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
						: 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'}"
				>
					{track} ({count})
				</button>
			{/each}
		</div>

		<!-- Search Input -->
		<div class="relative w-full shrink-0 lg:w-80">
			<span
				class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-base text-slate-500 dark:text-slate-400"
			>
				🔍
			</span>
			<input
				type="search"
				bind:value={searchQuery}
				placeholder="Filter 35 engineering labs..."
				class="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 pr-4 pl-10 font-mono text-base text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-950"
			/>
		</div>
	</div>

	<!-- Cards Grid -->
	{#if filteredModules.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredModules as mod (mod.id)}
				<a
					href={mod.href}
					class="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-indigo-500/50"
				>
					<div class="space-y-3.5">
						<div class="flex items-center justify-between">
							<span
								class="rounded-md bg-indigo-50 px-2.5 py-1 font-mono text-sm font-bold tracking-wide text-indigo-600 uppercase dark:bg-indigo-950/60 dark:text-indigo-400"
							>
								{mod.category}
							</span>
							<span class="font-mono text-sm text-slate-500 dark:text-slate-400">
								{mod.track}
							</span>
						</div>
						<h2
							class="text-lg font-bold tracking-tight text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400"
						>
							{mod.title}
						</h2>
						<p class="text-base leading-relaxed text-slate-600 dark:text-slate-300">
							{mod.description}
						</p>
					</div>

					<div
						class="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800/80"
					>
						{#each mod.tech as tag (tag)}
							<span
								class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
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
			class="rounded-2xl border border-dashed border-slate-300 p-16 text-center font-mono text-base text-slate-500 dark:border-slate-800"
		>
			No modules found matching your search. Try searching for Svelte, Nitro, Bun, Adapters, or
			Licenses.
		</div>
	{/if}
</div>
