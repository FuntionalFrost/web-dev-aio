<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import { Badge, Button, EmptyState, Input } from 'yaxa-svelte';
	import { curriculum, TRACK_ORDER } from '$lib/data/curriculum';

	// Initialize directly from URL — safe for static prerender (page.url is available at mount)
	let activeTrack = $state<string>(page.url.searchParams.get('track') ?? 'All');
	let searchQuery = $state<string>(page.url.searchParams.get('q') ?? '');

	// Call this from user-interaction handlers only — never from a reactive $effect.
	function updateUrl() {
		if (!browser) return;
		const url = new URL(page.url);
		if (activeTrack !== 'All') {
			url.searchParams.set('track', activeTrack);
		} else {
			url.searchParams.delete('track');
		}
		if (searchQuery.trim()) {
			url.searchParams.set('q', searchQuery.trim());
		} else {
			url.searchParams.delete('q');
		}
		if (url.search !== page.url.search) {
			replaceState(url, {});
		}
	}

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
			{curriculum.length} production-grade engineering modules covering Svelte 5 Universal Runes & Async
			streaming, SvelteKit 2 routing & adapters, Nuxt 4, Nitro & Hono engines, Node 24 / Bun / Deno runtimes,
			SSG/SSR rendering strategies, strict CSP security, and software licence architectures.
		</p>
	</div>

	<!-- Unified Toolbar: Filter Tabs + Search -->
	<div
		class="flex flex-col gap-5 border-y border-slate-200/80 py-6 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800/80"
	>
		<!-- Filter Pills -->
		<div class="flex flex-wrap items-center gap-2">
			<Button
				variant={activeTrack === 'All' ? 'solid' : 'subtle'}
				color={activeTrack === 'All' ? 'primary' : 'neutral'}
				size="sm"
				class="rounded-xl font-mono text-sm"
				onclick={() => {
					activeTrack = 'All';
					updateUrl();
				}}
			>
				All ({curriculum.length})
			</Button>

			{#each TRACK_ORDER as track (track)}
				{@const count = curriculum.filter((m) => m.track === track).length}
				<Button
					variant={activeTrack === track ? 'solid' : 'subtle'}
					color={activeTrack === track ? 'primary' : 'neutral'}
					size="sm"
					class="rounded-xl font-mono text-sm"
					onclick={() => {
						activeTrack = track;
						updateUrl();
					}}
				>
					{track} ({count})
				</Button>
			{/each}
		</div>

		<!-- Search Input via Yaxa Input -->
		<div class="w-full shrink-0 lg:w-80">
			<Input
				type="search"
				bind:value={searchQuery}
				oninput={() => updateUrl()}
				placeholder="Filter {curriculum.length} engineering labs..."
				icon="search"
				clearable
				size="md"
				class="rounded-xl font-mono text-sm"
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
							<Badge variant="soft" color="primary" size="sm">
								{mod.category}
							</Badge>
							<span class="font-mono text-sm text-slate-400">
								{mod.tech[0]}
							</span>
						</div>

						<div>
							<h3
								class="text-xl font-bold tracking-tight text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400"
							>
								{mod.title}
							</h3>
							<p
								class="mt-2 line-clamp-2 text-base leading-relaxed text-slate-600 dark:text-slate-300"
							>
								{mod.description}
							</p>
						</div>
					</div>

					<div class="mt-6 flex flex-wrap items-center gap-1.5 pt-4">
						{#each mod.tech as t (t)}
							<Badge variant="subtle" color="neutral" size="xs">
								{t}
							</Badge>
						{/each}
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<EmptyState
			title="No architectural modules found"
			description={`No engineering modules matched "${searchQuery}".`}
			icon="search"
			size="md"
			class="border-dashed"
		>
			{#snippet actions()}
				<Button
					variant="soft"
					color="primary"
					size="sm"
					class="font-mono text-sm"
					onclick={() => {
						searchQuery = '';
						activeTrack = 'All';
						updateUrl();
					}}
				>
					Reset filters
				</Button>
			{/snippet}
		</EmptyState>
	{/if}

	<footer
		class="mt-16 border-t border-slate-200/80 pt-8 text-center font-mono text-sm text-slate-500 dark:border-slate-800/80 dark:text-slate-400"
	>
		Made possible with <a
			href="https://yaxa.vercel.app"
			target="_blank"
			rel="noreferrer"
			class="font-bold text-indigo-600 hover:underline dark:text-indigo-400">Yaxa UI</a
		>
		&
		<a
			href="https://svelte.dev"
			target="_blank"
			rel="noreferrer"
			class="font-bold text-indigo-600 hover:underline dark:text-indigo-400">Svelte 5</a
		>
	</footer>
</div>
