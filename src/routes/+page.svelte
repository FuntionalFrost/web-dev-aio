<script lang="ts">
	import { curriculum } from '$lib/data/curriculum';
	import { progress } from '$lib/state/progress.svelte';

	let percentComplete = $derived(Math.round((progress.count / curriculum.length) * 100) || 0);
	let foundationModules = $derived(curriculum.filter((m) => m.track === 'Foundations'));
	let advancedModules = $derived(curriculum.filter((m) => m.track === 'Advanced 2026'));
</script>

<div class="mx-auto max-w-6xl space-y-12 p-6 sm:p-10">
	<!-- Hero Section -->
	<div class="space-y-4">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-xs text-indigo-600 dark:text-indigo-400"
		>
			<span>Interactive Project-Based Curriculum</span>
		</div>
		<h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
			Modern Web Engineering <span
				class="bg-linear-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">2026</span
			>
		</h1>
		<p class="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
			An architectural deep-dive into ES2026 specifications, TypeScript 6 sound type narrowing,
			HTML5 native landmarks, and Tailwind CSS v4 CSS-first design systems.
		</p>
	</div>

	<!-- Telemetry Progress Monitor -->
	<div
		class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40"
	>
		<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-base font-bold text-slate-900 dark:text-white">
					Learning Track Completion
				</h2>
				<p class="text-xs text-slate-500 dark:text-slate-400">
					Progress is stored locally in client runtime via Svelte 5 Universal Runes.
				</p>
			</div>
			<span class="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
				{progress.count} / {curriculum.length} Completed ({percentComplete}%)
			</span>
		</div>

		<div
			class="mt-4 h-2.5 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950"
		>
			<div
				class="h-full rounded-full bg-linear-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
				style="width: {percentComplete}%"
			></div>
		</div>
	</div>

	<!-- Track 1: Foundations & Systems -->
	<div class="space-y-6">
		<div class="border-b border-slate-200 pb-2 dark:border-slate-800">
			<span
				class="font-mono text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400"
				>Part 01</span
			>
			<h3 class="text-xl font-bold text-slate-900 dark:text-white">Foundations & Iconography</h3>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
			{#each foundationModules as mod (mod.id)}
				{@const completed = progress.isComplete(mod.id)}
				<div
					class="flex flex-col justify-between rounded-2xl border p-6 transition duration-200 {completed
						? 'border-emerald-500/40 bg-emerald-50/30 dark:border-emerald-500/30 dark:bg-emerald-950/10'
						: 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40'} hover:border-slate-300 dark:hover:border-slate-700"
				>
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<span
								class="font-mono text-[10px] font-bold tracking-wider uppercase {completed
									? 'text-emerald-600 dark:text-emerald-400'
									: 'text-slate-400 dark:text-slate-500'}"
							>
								{mod.category}
							</span>
							<button
								onclick={() => progress.toggleComplete(mod.id)}
								class="rounded border px-2 py-0.5 font-mono text-[11px] transition {completed
									? 'border-emerald-500/40 bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300'
									: 'border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}"
							>
								{completed ? '✓ Done' : 'Mark Done'}
							</button>
						</div>

						<h4 class="text-lg font-bold text-slate-900 dark:text-white">{mod.title}</h4>
						<p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
							{mod.description}
						</p>

						<div class="flex flex-wrap gap-1.5 pt-2">
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
						class="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-indigo-600 dark:hover:text-white"
					>
						Launch Interactive Sandbox →
					</a>
				</div>
			{/each}
		</div>
	</div>

	<!-- Track 2: Advanced 2026 Labs -->
	<div class="space-y-6">
		<div class="border-b border-slate-200 pb-2 dark:border-slate-800">
			<span
				class="font-mono text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400"
				>Part 02</span
			>
			<h3 class="text-xl font-bold text-slate-900 dark:text-white">
				Advanced ES2026 & Modern APIs
			</h3>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each advancedModules as mod (mod.id)}
				{@const completed = progress.isComplete(mod.id)}
				<div
					class="flex flex-col justify-between rounded-2xl border p-6 transition duration-200 {completed
						? 'border-emerald-500/40 bg-emerald-50/30 dark:border-emerald-500/30 dark:bg-emerald-950/10'
						: 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40'} hover:border-slate-300 dark:hover:border-slate-700"
				>
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<span
								class="font-mono text-[10px] font-bold tracking-wider uppercase {completed
									? 'text-emerald-600 dark:text-emerald-400'
									: 'text-slate-400 dark:text-slate-500'}"
							>
								{mod.category}
							</span>
							<button
								onclick={() => progress.toggleComplete(mod.id)}
								class="rounded border px-2 py-0.5 font-mono text-[11px] transition {completed
									? 'border-emerald-500/40 bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300'
									: 'border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}"
							>
								{completed ? '✓ Done' : 'Mark Done'}
							</button>
						</div>

						<h4 class="text-base font-bold text-slate-900 dark:text-white">{mod.title}</h4>
						<p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
							{mod.description}
						</p>

						<div class="flex flex-wrap gap-1.5 pt-2">
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
						class="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-indigo-600 dark:hover:text-white"
					>
						Launch Interactive Sandbox →
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>
