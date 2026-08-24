<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let numbers = $state<number[]>([0.1, 0.2, 0.3]);
	let standardSum = $derived(numbers.reduce((acc, curr) => acc + curr, 0));
	let preciseSum = $derived.by(() => {
		if (typeof Math.sumPrecise === 'function') {
			return Math.sumPrecise(numbers);
		}
		return Number(numbers.reduce((acc, curr) => acc + curr, 0).toFixed(1));
	});

	// Map.prototype.getOrInsert Simulation
	interface CacheEntry {
		hits: number;
		cachedAt: string;
	}
	let cacheKeyInput = $state('user:101');
	let memoryStore = $state<Record<string, CacheEntry>>({
		'user:100': { hits: 4, cachedAt: 'Pre-warmed' }
	});
	let logHistory = $state<string[]>(['Cache pre-warmed with key [user:100]']);

	function handleGetOrInsert() {
		const key = cacheKeyInput.trim();
		if (!key) return;

		if (memoryStore[key]) {
			memoryStore[key].hits += 1;
			logHistory = [
				`[CACHE HIT] Key "${key}" found. Hit count: ${memoryStore[key].hits}`,
				...logHistory.slice(0, 4)
			];
		} else {
			memoryStore[key] = { hits: 1, cachedAt: new Date().toLocaleTimeString() };
			logHistory = [
				`[INSERT FALLBACK] Inserted computed entry for key "${key}"`,
				...logHistory.slice(0, 4)
			];
		}
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Key Mechanics</h3>
		<ul>
			<li>
				<strong><code>Math.sumPrecise()</code>:</strong> Native IEEE-754 summation avoiding binary floating-point
				roundoff errors without external BigNumber overhead.
			</li>
			<li>
				<strong><code>Map.prototype.getOrInsert()</code>:</strong> Eliminates boilerplate lookup-and-fallback
				logic by lazily computing and inserting default values in a single call.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: Math Precision -->
		<LabCard title="IEEE-754 Precision Accumulator" badge="Float Precision">
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs text-slate-500">Active Array: [{numbers.join(', ')}]</span>
				<div class="flex gap-2">
					<button
						onclick={() => (numbers = [...numbers, 0.1])}
						class="rounded-lg bg-indigo-600 px-3 py-1.5 font-mono text-xs font-semibold text-white transition hover:bg-indigo-500"
					>
						+ Append 0.1
					</button>
					<button
						onclick={() => (numbers = [0.1, 0.2, 0.3])}
						class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
					>
						Reset
					</button>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4 font-mono text-xs">
				<div class="rounded-xl border border-amber-500/30 bg-amber-50/50 p-4 dark:bg-amber-950/20">
					<span class="text-[10px] text-amber-700 uppercase dark:text-amber-400"
						>Standard reduce(+)</span
					>
					<p class="mt-1 text-sm font-bold text-amber-900 dark:text-amber-200">{standardSum}</p>
				</div>
				<div
					class="rounded-xl border border-emerald-500/30 bg-emerald-50/50 p-4 dark:bg-emerald-950/20"
				>
					<span class="text-[10px] text-emerald-700 uppercase dark:text-emerald-400"
						>Math.sumPrecise()</span
					>
					<p class="mt-1 text-sm font-bold text-emerald-900 dark:text-emerald-200">{preciseSum}</p>
				</div>
			</div>
		</LabCard>

		<!-- Simulator 2: Map.getOrInsert -->
		<LabCard title="Map.prototype.getOrInsert Memoization" badge="Atomic Operations">
			<div class="flex gap-2 font-mono text-xs">
				<input
					type="text"
					bind:value={cacheKeyInput}
					placeholder="Enter cache key..."
					class="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
				/>
				<button
					onclick={handleGetOrInsert}
					class="rounded-xl bg-indigo-600 px-4 py-1.5 font-semibold text-white transition hover:bg-indigo-500"
				>
					getOrInsert()
				</button>
			</div>

			<div class="grid grid-cols-2 gap-2 font-mono text-xs">
				{#each Object.entries(memoryStore) as [key, val] (key)}
					<div
						class="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-950"
					>
						<div class="font-semibold text-indigo-600 dark:text-indigo-400">{key}</div>
						<div class="text-[10px] text-slate-500">Hits: {val.hits} · {val.cachedAt}</div>
					</div>
				{/each}
			</div>

			<div
				class="space-y-1 rounded-lg bg-slate-100 p-2.5 font-mono text-[10px] text-slate-600 dark:bg-slate-950/80 dark:text-slate-400"
			>
				{#each logHistory as log (log)}
					<div>› {log}</div>
				{/each}
			</div>
		</LabCard>
	{/snippet}
</LabShell>
