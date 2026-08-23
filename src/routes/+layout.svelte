<script lang="ts">
	import './layout.css';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { curriculum, type CurriculumModule } from '$lib/data/curriculum';

	let { children } = $props();

	const trackOrder: Array<CurriculumModule['track']> = [
		'Foundations',
		'Modern ECMAScript',
		'UI & Frameworks',
		'APIs & Real-Time',
		'Data, Caching & Auth',
		'Infrastructure & Monetization'
	];

	let groupedTracks = $derived.by(() => {
		return trackOrder
			.map((track) => ({
				track,
				modules: curriculum.filter((m) => m.track === track)
			}))
			.filter((group) => group.modules.length > 0);
	});

	const siteUrl = 'https://web-engine26.pages.dev';
	let currentCanonical = $derived(`${siteUrl}${page.url.pathname}`);
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

<!-- Global SEO Baseline -->
<MetaTags
	title={activeModule ? activeModule.title : 'Modern Web Engineering Guide'}
	titleTemplate="%s | Web Engine 2026"
	description={activeModule?.description ??
		'Interactive reference architecture and 21 engineering labs covering modern TypeScript, Svelte 5, Tailwind v4, Drizzle, Neon, and Edge runtimes.'}
	canonical={currentCanonical}
	openGraph={{
		type: 'website',
		url: currentCanonical,
		title: activeModule ? activeModule.title : 'Web Engine 2026 | Full-Stack Architecture Guide',
		description:
			activeModule?.description ??
			'Master full-stack web architecture across 21 interactive engineering labs and simulators.',
		siteName: 'Web Engine 2026',
		images: [
			{
				url: `${siteUrl}/og-card.png`,
				width: 1200,
				height: 630,
				alt: 'Web Engine 2026 Architecture'
			}
		]
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: activeModule ? activeModule.title : 'Web Engine 2026',
		description: activeModule?.description ?? 'Modern Web Engineering Guide & Interactive Labs',
		image: `${siteUrl}/og-card.png`
	}}
	additionalMetaTags={[
		{ name: 'theme-color', content: '#4f46e5' },
		{ name: 'author', content: 'Web Engine 2026 Team' },
		{
			name: 'keywords',
			content:
				'Svelte 5, Tailwind CSS v4, TypeScript 6, Drizzle ORM, Neon Postgres, Better Auth, Hono, Upstash, Edge Isolates'
		}
	]}
/>

<div
	class="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-150 dark:bg-slate-950 dark:text-slate-100"
>
	<!-- Desktop Fixed Sticky Sidebar -->
	<aside
		class="sticky top-0 hidden h-screen w-80 shrink-0 flex-col border-r border-slate-200 bg-white/80 backdrop-blur-xl md:flex dark:border-slate-800/80 dark:bg-slate-900/40"
	>
		<div class="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-5">
			<!-- Brand Header -->
			<a href={resolve('/')} class="flex shrink-0 items-center gap-2.5">
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

			<!-- Dynamic Navigation Tracks -->
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
								<a
									href={mod.href}
									class="flex items-center rounded-lg px-2.5 py-1.5 text-xs font-medium transition {active
										? 'bg-indigo-50 font-semibold text-indigo-950 dark:bg-indigo-950/50 dark:text-indigo-200'
										: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'}"
								>
									<span class="leading-snug">{mod.title}</span>
								</a>
							{/each}
						</div>
					</div>
				{/each}
			</nav>
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
			<div class="flex items-center gap-2">
				<div
					class="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 font-mono text-xs font-bold text-white"
				>
					26
				</div>
				<span class="text-xs font-bold tracking-wider uppercase">Curriculum Tracks</span>
			</div>
			<button
				onclick={() => (mobileDrawerOpen = false)}
				aria-label="Close navigation drawer"
				class="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
			>
				✕
			</button>
		</div>

		<nav class="mt-4 max-h-[calc(100vh-8rem)] space-y-6 overflow-y-auto pr-2">
			{#each groupedTracks as group, i (group.track)}
				<div class="space-y-1.5">
					<span
						class="font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500"
					>
						0{i + 1}. {group.track}
					</span>
					<div class="space-y-1">
						{#each group.modules as mod (mod.id)}
							{@const active = mod.href.replace(/\/$/, '') === page.url.pathname.replace(/\/$/, '')}
							<a
								href={mod.href}
								class="block rounded-lg px-2.5 py-1.5 text-xs transition {active
									? 'bg-indigo-50 font-semibold text-indigo-950 dark:bg-indigo-950/50 dark:text-indigo-200'
									: 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50'}"
							>
								{mod.title}
							</a>
						{/each}
					</div>
				</div>
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
					<a href={resolve('/')} class="transition hover:text-slate-900 dark:hover:text-white"
						>Home</a
					>
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
