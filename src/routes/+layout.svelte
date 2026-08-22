<script lang="ts">
	import './layout.css';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { curriculum } from '$lib/data/curriculum';
	import { progress } from '$lib/state/progress.svelte';

	let { children } = $props();

	let foundationModules = $derived(curriculum.filter((m) => m.track === 'Foundations'));
	let advancedModules = $derived(curriculum.filter((m) => m.track === 'Advanced 2026'));
	let frameworkModules = $derived(curriculum.filter((m) => m.track === 'Frameworks & UI Systems'));

	let percentComplete = $derived(Math.round((progress.count / curriculum.length) * 100) || 0);
	let activeModule = $derived(curriculum.find((m) => m.href === page.url.pathname));

	let mobileDrawerOpen = $state(false);

	onNavigate((navigation) => {
		mobileDrawerOpen = false;
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div
	class="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-150 dark:bg-slate-950 dark:text-slate-100"
>
	<!-- Desktop Sidebar -->
	<aside
		class="hidden w-72 flex-col justify-between border-r border-slate-200 bg-white/80 backdrop-blur-xl md:flex dark:border-slate-800/80 dark:bg-slate-900/40"
	>
		<div class="flex flex-col gap-5 overflow-y-auto p-5">
			<a href="/" class="flex items-center gap-2.5">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-mono text-sm font-bold text-white shadow-md shadow-indigo-500/20"
				>
					26
				</div>
				<div>
					<span class="block text-xs font-bold tracking-tight text-slate-900 dark:text-white"
						>Web Engine 2026</span
					>
					<span class="block font-mono text-[10px] text-slate-400">Interactive Architecture</span>
				</div>
			</a>

			<!-- Navigation Tracks -->
			<nav class="space-y-5">
				<!-- Track 1: Foundations -->
				<div class="space-y-1">
					<span
						class="px-2 font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500"
					>
						01. Foundations
					</span>
					<div class="space-y-0.5">
						{#each foundationModules as mod (mod.id)}
							{@const active = page.url.pathname === mod.href}
							{@const done = progress.isComplete(mod.id)}
							<a
								href={mod.href}
								class="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition {active
									? 'bg-indigo-50 font-semibold text-indigo-950 dark:bg-indigo-950/50 dark:text-indigo-200'
									: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'}"
							>
								<span class="truncate">{mod.title}</span>
								{#if done}
									<span
										class="ml-1 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
										>✓</span
									>
								{/if}
							</a>
						{/each}
					</div>
				</div>

				<!-- Track 2: Advanced Labs -->
				<div class="space-y-1">
					<span
						class="px-2 font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500"
					>
						02. Advanced Labs
					</span>
					<div class="space-y-0.5">
						{#each advancedModules as mod (mod.id)}
							{@const active = page.url.pathname === mod.href}
							{@const done = progress.isComplete(mod.id)}
							<a
								href={mod.href}
								class="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition {active
									? 'bg-indigo-50 font-semibold text-indigo-950 dark:bg-indigo-950/50 dark:text-indigo-200'
									: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'}"
							>
								<span class="truncate">{mod.title}</span>
								{#if done}
									<span
										class="ml-1 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
										>✓</span
									>
								{/if}
							</a>
						{/each}
					</div>
				</div>

				<!-- Track 3: Frameworks & UI Systems -->
				<div class="space-y-1">
					<span
						class="px-2 font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500"
					>
						03. Frameworks & UI
					</span>
					<div class="space-y-0.5">
						{#each frameworkModules as mod (mod.id)}
							{@const active = page.url.pathname === mod.href}
							{@const done = progress.isComplete(mod.id)}
							<a
								href={mod.href}
								class="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition {active
									? 'bg-indigo-50 font-semibold text-indigo-950 dark:bg-indigo-950/50 dark:text-indigo-200'
									: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'}"
							>
								<span class="truncate">{mod.title}</span>
								{#if done}
									<span
										class="ml-1 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
										>✓</span
									>
								{/if}
							</a>
						{/each}
					</div>
				</div>
			</nav>
		</div>

		<!-- Sidebar Bottom Telemetry -->
		<div
			class="border-t border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-950/40"
		>
			<div
				class="flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400"
			>
				<span>Curriculum Mastery</span>
				<span class="font-bold text-indigo-600 dark:text-indigo-400">{percentComplete}%</span>
			</div>
			<div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
				<div
					class="h-full rounded-full bg-indigo-500 transition-all duration-300"
					style="width: {percentComplete}%"
				></div>
			</div>
		</div>
	</aside>

	<!-- Content Container -->
	<div class="flex flex-1 flex-col overflow-x-hidden">
		<header
			class="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md sm:px-6 dark:border-slate-800/80 dark:bg-slate-950/80"
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
					<a href="/" class="transition hover:text-slate-900 dark:hover:text-white">Home</a>
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
