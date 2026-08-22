<script lang="ts">
	import './layout.css';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { curriculum, type CurriculumModule } from '$lib/data/curriculum';
	import { progress } from '$lib/state/progress.svelte';

	let { children } = $props();

	const trackOrder: Array<CurriculumModule['track']> = [
		'Foundations',
		'Modern ECMAScript',
		'UI & Frameworks',
		'APIs, Schema & Realtime',
		'Data, Auth & Infrastructure'
	];

	let groupedTracks = $derived.by(() => {
		return trackOrder
			.map((track) => ({
				track,
				modules: curriculum.filter((m) => m.track === track)
			}))
			.filter((group) => group.modules.length > 0);
	});

	let percentComplete = $derived(Math.round((progress.count / curriculum.length) * 100) || 0);
	let activeModule = $derived(curriculum.find((m) => m.href === page.url.pathname));

	let mobileDrawerOpen = $state(false);

	onNavigate((navigation) => {
		mobileDrawerOpen = false;
		if (!document.startViewTransition) return;
		return new Promise((resolveNav) => {
			document.startViewTransition(async () => {
				resolveNav();
				await navigation.complete;
			});
		});
	});
</script>

<div
	class="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-150 dark:bg-slate-950 dark:text-slate-100"
>
	<!-- Desktop Fixed Sticky Sidebar (w-80, h-screen pinned) -->
	<aside
		class="sticky top-0 hidden h-screen w-80 shrink-0 flex-col justify-between border-r border-slate-200 bg-white/80 backdrop-blur-xl md:flex dark:border-slate-800/80 dark:bg-slate-900/40"
	>
		<!-- Independently Scrollable Track Navigation List -->
		<div class="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-5">
			<!-- Brand Header -->
			<a href="{base}/" class="flex shrink-0 items-center gap-2.5">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-mono text-sm font-bold text-white shadow-md shadow-indigo-500/20"
				>
					26
				</div>
				<div>
					<span class="block text-xs font-bold tracking-tight text-slate-900 dark:text-white"
						>Web Engine 2026</span
					>
					<span class="block font-mono text-[10px] text-slate-400">Engineering Architecture</span>
				</div>
			</a>

			<!-- Dynamic Navigation Tracks (All 5 Tracks) -->
			<nav class="space-y-5">
				{#each groupedTracks as group, i (group.track)}
					<div class="space-y-1">
						<span
							class="px-2 font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500"
						>
							0{i + 1}. {group.track}
						</span>
						<div class="space-y-0.5">
							{#each group.modules as mod (mod.id)}
								{@const active = page.url.pathname === mod.href}
								{@const done = progress.isComplete(mod.id)}
								<a
									href="{base}{mod.href}"
									class="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition {active
										? 'bg-indigo-50 font-semibold text-indigo-950 dark:bg-indigo-950/50 dark:text-indigo-200'
										: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'}"
								>
									<span class="pr-2 leading-snug">{mod.title}</span>
									{#if done}
										<span
											class="shrink-0 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
											>✓</span
										>
									{/if}
								</a>
							{/each}
						</div>
					</div>
				{/each}
			</nav>
		</div>

		<!-- Pinned Sidebar Bottom Telemetry Widget -->
		<div
			class="shrink-0 border-t border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800/80 dark:bg-slate-950/60"
		>
			<div
				class="flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400"
			>
				<span>Curriculum Mastery</span>
				<span class="font-bold text-indigo-600 dark:text-indigo-400">{percentComplete}%</span>
			</div>
			<div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
				<div
					class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
					style="width: {percentComplete}%"
				></div>
			</div>
		</div>
	</aside>

	<!-- Mobile Drawer Overlay -->
	{#if mobileDrawerOpen}
		<div
			role="button"
			tabindex="0"
			aria-label="Close navigation overlay"
			onclick={() => (mobileDrawerOpen = false)}
			onkeydown={(e) => e.key === 'Escape' && (mobileDrawerOpen = false)}
			class="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
		></div>
	{/if}

	<!-- Mobile Navigation Drawer -->
	<aside
		class="fixed inset-y-0 left-0 z-50 w-80 transform bg-white p-6 shadow-2xl transition-transform duration-200 md:hidden dark:bg-slate-900 {mobileDrawerOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		<div
			class="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800"
		>
			<span class="text-sm font-bold">Navigation</span>
			<button
				onclick={() => (mobileDrawerOpen = false)}
				aria-label="Close navigation drawer"
				class="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
			>
				✕
			</button>
		</div>
		<nav class="mt-4 max-h-[calc(100vh-8rem)] space-y-4 overflow-y-auto">
			{#each curriculum as mod (mod.id)}
				<a
					href="{base}{mod.href}"
					class="block py-1.5 text-xs text-slate-600 hover:text-indigo-500 dark:text-slate-400"
				>
					{mod.title}
				</a>
			{/each}
		</nav>
	</aside>

	<!-- Content Container with Sticky Top Navigation Bar -->
	<div class="flex min-w-0 flex-1 flex-col overflow-x-hidden">
		<header
			class="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md sm:px-6 dark:border-slate-800/80 dark:bg-slate-950/80"
		>
			<div class="flex items-center gap-3">
				<button
					onclick={() => (mobileDrawerOpen = !mobileDrawerOpen)}
					class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 md:hidden dark:border-slate-800 dark:text-slate-400"
					aria-label="Toggle navigation drawer"
				>
					☰
				</button>

				<div
					class="hidden items-center gap-2 font-mono text-xs text-slate-500 sm:flex dark:text-slate-400"
				>
					<a href="{base}/" class="transition hover:text-slate-900 dark:hover:text-white">Home</a>
					{#if activeModule}
						<span>/</span>
						<span>{activeModule.track}</span>
						<span>/</span>
						<span class="font-semibold text-slate-900 dark:text-slate-100"
							>{activeModule.title}</span
						>
					{/if}
				</div>
			</div>

			<div class="flex items-center gap-2.5">
				<CommandPalette />
				<ThemeToggle />
			</div>
		</header>

		<main class="flex-1 overflow-y-auto">
			{@render children()}
		</main>
	</div>
</div>
