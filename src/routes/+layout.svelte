<script lang="ts">
	import './layout.css';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { curriculum, getCurriculumByTrack } from '$lib/data/curriculum';
	import { SITE } from '$lib/config/site';

	let { children } = $props();

	const cleanPath = (p: string) => p.replace(/\/$/, '');

	let groupedTracks = $derived(getCurriculumByTrack());
	let activeModule = $derived(
		curriculum.find((m) => cleanPath(m.href) === cleanPath(page.url.pathname))
	);
	let currentCanonical = $derived(`${SITE.url}${page.url.pathname}`);
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

<MetaTags
	title={activeModule ? activeModule.title : 'Modern Web Engineering Guide'}
	titleTemplate={`%s | ${SITE.name}`}
	description={activeModule?.description ?? SITE.description}
	canonical={currentCanonical}
	openGraph={{
		type: 'website',
		url: currentCanonical,
		title: activeModule ? activeModule.title : `${SITE.name} | Full-Stack Architecture Guide`,
		description: activeModule?.description ?? SITE.description,
		siteName: SITE.name,
		images: [
			{
				url: SITE.ogImage,
				width: 1200,
				height: 630,
				alt: `${SITE.name} Architecture`
			}
		]
	}}
	twitter={{
		cardType: 'summary_large_image',
		title: activeModule ? activeModule.title : SITE.name,
		description: activeModule?.description ?? SITE.description,
		image: SITE.ogImage
	}}
	additionalMetaTags={[
		{ name: 'theme-color', content: '#4f46e5' },
		{ name: 'author', content: SITE.author },
		{ name: 'keywords', content: SITE.keywords }
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
			<a href={resolve('/')} class="flex shrink-0 items-center gap-2.5">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-mono text-sm font-bold text-white shadow-md shadow-indigo-500/20"
				>
					26
				</div>
				<div>
					<span class="block text-xs font-bold tracking-tight text-slate-900 dark:text-white"
						>{SITE.name}</span
					>
					<span class="block font-mono text-[10px] text-slate-400">Engineering Architecture</span>
				</div>
			</a>

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
								{@const active = cleanPath(page.url.pathname) === cleanPath(mod.href)}
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
							{@const active = cleanPath(page.url.pathname) === cleanPath(mod.href)}
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

	<!-- Main Content Area -->
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
