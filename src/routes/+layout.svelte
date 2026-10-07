<script lang="ts">
	import './layout.css';
	import 'yaxa-svelte/yaxa.css';
	import { YaxaApp, Slideover, Breadcrumb, useShortcuts, theme } from 'yaxa-svelte';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import CommandPalette from '#lib/components/CommandPalette.svelte';
	import SEO from '#lib/components/SEO.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { curriculum, getCurriculumByTrack } from '#lib/data/curriculum.js';
	import { SITE, siteConfig } from '#lib/config/site.js';
	import { cleanPath } from '#lib/utils/url.js';

	let { children } = $props();

	let groupedTracks = $derived(getCurriculumByTrack());
	let activeModule = $derived(
		curriculum.find((m) => cleanPath(m.href) === cleanPath(page.url.pathname))
	);
	let isThemeStudio = $derived(cleanPath(page.url.pathname) === '/theme');
	let mobileDrawerOpen = $state(false);

	let breadcrumbItems = $derived(
		isThemeStudio
			? [{ label: 'Home', href: '/' }, { label: 'Theme Studio' }]
			: activeModule
				? [
						{ label: 'Home', href: '/' },
						{
							label: activeModule.track,
							href: `/?track=${encodeURIComponent(activeModule.track)}`
						},
						{ label: activeModule.title }
					]
				: [{ label: 'Home', href: '/' }]
	);

	useShortcuts({
		t: () => {
			theme.toggle();
			if (typeof document !== 'undefined') {
				document.documentElement.dataset.theme = theme.resolvedTheme;
			}
		}
	});

	onNavigate((navigation) => {
		if (navigation.shallow) return;

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

<YaxaApp config={siteConfig} enableDefaultSeo={false}>
	<SEO />

	<div
		class="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-150 dark:bg-slate-950 dark:text-slate-100"
	>
		<!-- Desktop Fixed Sticky Sidebar -->
		<aside
			class="sticky top-0 hidden h-screen w-88 shrink-0 flex-col border-r border-slate-200 bg-white/80 backdrop-blur-xl md:flex dark:border-slate-800/80 dark:bg-slate-900/40"
		>
			<div class="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-5">
				<a href="/" class="flex shrink-0 items-center gap-3">
					<div
						class="bg-primary-600 shadow-primary-500/20 flex h-10 w-10 items-center justify-center rounded-xl font-mono text-base font-bold text-white shadow-md transition-colors"
					>
						26
					</div>
					<div>
						<span
							class="block text-sm font-bold tracking-tight text-slate-900 sm:text-base dark:text-white"
							>{SITE.name}</span
						>
						<span class="block font-mono text-sm text-slate-500 dark:text-slate-400"
							>Engineering Labs</span
						>
					</div>
				</a>

				<nav class="space-y-6">
					{#each groupedTracks as group, i (group.track)}
						<div class="space-y-1.5">
							<span
								class="text-primary-600 dark:text-primary-400 block px-2 font-mono text-sm font-bold tracking-wider uppercase transition-colors"
							>
								0{i + 1}. {group.track}
							</span>
							<div class="space-y-1">
								{#each group.modules as mod (mod.id)}
									{@const active = cleanPath(page.url.pathname) === cleanPath(mod.href)}
									<a
										href={mod.href}
										class="flex items-center rounded-xl px-3 py-2 text-sm font-medium transition {active
											? 'bg-primary-50 text-primary-950 dark:bg-primary-950/60 dark:text-primary-200 font-bold shadow-xs'
											: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100'}"
									>
										<span class="leading-relaxed">{mod.title}</span>
									</a>
								{/each}
							</div>
						</div>
					{/each}

					<!-- Tools / Theme Studio Link -->
					<div class="space-y-1.5 pt-2">
						<span
							class="block px-2 font-mono text-sm font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500"
						>
							Design System
						</span>
						<a
							href="/theme"
							class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition {isThemeStudio
								? 'bg-primary-50 text-primary-950 dark:bg-primary-950/60 dark:text-primary-200 font-bold shadow-xs'
								: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100'}"
						>
							<span>🎨 Theme Studio</span>
						</a>
					</div>
				</nav>

				<div
					class="mt-auto border-t border-slate-200/80 pt-4 font-mono text-xs text-slate-500 dark:border-slate-800/80 dark:text-slate-400"
				>
					Powered by <a
						href="https://yaxa.vercel.app"
						target="_blank"
						rel="noreferrer"
						class="text-primary-600 dark:text-primary-400 font-bold hover:underline">Yaxa UI 1.15</a
					> & Svelte 5
				</div>
			</div>
		</aside>

		<!-- Accessible Mobile Navigation Drawer via Yaxa Slideover -->
		<Slideover
			bind:open={mobileDrawerOpen}
			side="left"
			title="Curriculum Tracks"
			class="w-88 md:hidden"
		>
			{#snippet header()}
				<div class="flex items-center gap-2.5">
					<div
						class="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-lg font-mono text-sm font-bold text-white"
					>
						26
					</div>
					<span class="text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white"
						>Curriculum Tracks</span
					>
				</div>
			{/snippet}

			{#snippet footer()}
				<div
					class="border-t border-slate-200/80 pt-3 font-mono text-xs text-slate-500 dark:border-slate-800/80 dark:text-slate-400"
				>
					Powered by <a
						href="https://yaxa.vercel.app"
						target="_blank"
						rel="noreferrer"
						class="text-primary-600 dark:text-primary-400 font-bold hover:underline">Yaxa UI 1.15</a
					> & Svelte 5
				</div>
			{/snippet}

			<nav class="space-y-6 overflow-y-auto pr-2">
				{#each groupedTracks as group, i (group.track)}
					<div class="space-y-1.5">
						<span
							class="text-primary-600 dark:text-primary-400 block font-mono text-sm font-bold tracking-wider uppercase"
						>
							0{i + 1}. {group.track}
						</span>
						<div class="space-y-1">
							{#each group.modules as mod (mod.id)}
								{@const active = cleanPath(page.url.pathname) === cleanPath(mod.href)}
								<a
									href={mod.href}
									onclick={() => (mobileDrawerOpen = false)}
									class="block rounded-xl px-3 py-2 text-sm font-medium transition {active
										? 'bg-primary-50 text-primary-950 dark:bg-primary-950/60 dark:text-primary-200 font-bold'
										: 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100'}"
								>
									{mod.title}
								</a>
							{/each}
						</div>
					</div>
				{/each}

				<div class="space-y-1.5 pt-2">
					<span
						class="block font-mono text-sm font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500"
					>
						Design System
					</span>
					<a
						href="/theme"
						onclick={() => (mobileDrawerOpen = false)}
						class="block rounded-xl px-3 py-2 text-sm font-medium transition {isThemeStudio
							? 'bg-primary-50 text-primary-950 dark:bg-primary-950/60 dark:text-primary-200 font-bold'
							: 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100'}"
					>
						🎨 Theme Studio
					</a>
				</div>
			</nav>
		</Slideover>

		<!-- Main Content Area -->
		<div class="flex min-w-0 flex-1 flex-col overflow-x-hidden">
			<header
				class="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md sm:px-6 dark:border-slate-800/80 dark:bg-slate-950/80"
			>
				<div class="flex items-center gap-3">
					<button
						onclick={() => (mobileDrawerOpen = !mobileDrawerOpen)}
						class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-base text-slate-700 md:hidden dark:border-slate-800 dark:text-slate-300"
						aria-label="Toggle navigation drawer"
					>
						☰
					</button>

					<div class="hidden sm:block">
						<Breadcrumb items={breadcrumbItems} class="font-mono text-sm" />
					</div>
				</div>

				<div class="flex items-center gap-3">
					<CommandPalette />
					<ThemeToggle />
				</div>
			</header>

			<main class="flex-1 overflow-y-auto">
				{@render children()}
			</main>
		</div>
	</div>
</YaxaApp>
