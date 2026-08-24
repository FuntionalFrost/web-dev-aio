<script lang="ts">
	import {
		curriculum,
		getCurriculumByTrack,
		TRACK_ORDER,
		type CurriculumModule
	} from '$lib/data/curriculum';

	let searchQuery = $state('');
	let selectedTrack = $state<string>('All');

	const tracks: Array<CurriculumModule['track'] | 'All'> = ['All', ...TRACK_ORDER];

	let filteredModules = $derived(
		curriculum.filter((mod) => {
			const matchesTrack = selectedTrack === 'All' || mod.track === selectedTrack;
			const matchesSearch =
				mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				mod.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
				mod.category.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesTrack && matchesSearch;
		})
	);

	let groupedTracks = $derived(getCurriculumByTrack(filteredModules));
</script>

<svelte:head>
	<title>Modern Web Engineering 2026 | Full-Stack Architectural Guide</title>
	<meta
		name="description"
		content="Interactive engineering guide & architecture simulators: HTML5, CSS Anchor, Tailwind v4, TypeScript 6, ES2026, Svelte 5, Vue 3.5, Nuxt 4, Schemas, Auth, and Edge infrastructure."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl space-y-10 p-6 sm:p-10">
	<div class="space-y-4">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-50 px-3 py-1 font-mono text-xs text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
		>
			<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500"></span>
			<span>Comprehensive 21-Module Engineering Roadmap</span>
		</div>
		<h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
			Modern Web Engineering <span
				class="bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
				>2026</span
			>
		</h1>
		<p class="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
			From language primitives and headless component architectures to cryptographic webhook
			validation, connection pooling, and globally distributed V8 edge runtimes.
		</p>
	</div>

	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex flex-wrap gap-1.5">
			{#each tracks as track (track)}
				<button
					onclick={() => (selectedTrack = track)}
					class="rounded-xl px-3 py-1.5 font-mono text-xs transition {selectedTrack === track
						? 'bg-indigo-600 font-semibold text-white shadow-sm shadow-indigo-500/20'
						: 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:bg-slate-800'}"
				>
					{track}
				</button>
			{/each}
		</div>

		<div class="relative w-full sm:w-72">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Filter 21 engineering labs..."
				class="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 font-mono text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
			/>
			{#if searchQuery}
				<button
					onclick={() => (searchQuery = '')}
					class="absolute top-2 right-3 font-mono text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
				>
					✕
				</button>
			{/if}
		</div>
	</div>

	<div class="space-y-12">
		{#each groupedTracks as { track, modules } (track)}
			<div class="space-y-5">
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800"
				>
					<div>
						<span
							class="font-mono text-[10px] font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400"
							>Track</span
						>
						<h3 class="text-lg font-bold text-slate-900 dark:text-white">{track}</h3>
					</div>
					<span class="font-mono text-xs text-slate-400">
						{modules.length}
						{modules.length === 1 ? 'Lab' : 'Labs'}
					</span>
				</div>

				<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
					{#each modules as mod (mod.id)}
						<div
							class="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-slate-300 hover:shadow dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700"
						>
							<div class="space-y-3">
								<span
									class="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500"
								>
									{mod.category}
								</span>

								<h4 class="text-base leading-snug font-bold text-slate-900 dark:text-white">
									{mod.title}
								</h4>
								<p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
									{mod.description}
								</p>

								<div class="flex flex-wrap gap-1.5 pt-1">
									{#each mod.tech as t (t)}
										<span
											class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-700 dark:border dark:border-slate-700/50 dark:bg-slate-800 dark:text-slate-300"
										>
											{t}
										</span>
									{/each}
								</div>
							</div>

							<a
								href={mod.href}
								class="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-900 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-indigo-600 dark:hover:text-white"
							>
								Launch Lab →
							</a>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div
				class="rounded-2xl border border-dashed border-slate-300 p-12 text-center font-mono text-xs text-slate-400 dark:border-slate-800"
			>
				No modules match "{searchQuery}" in track "{selectedTrack}".
			</div>
		{/each}
	</div>
</div>
