<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let numbers = $state<number[]>([0.1, 0.2, 0.3]);
	let standardSum = $derived(numbers.reduce((acc, curr) => acc + curr, 0));
	interface ModernMath {
		sumPrecise?: (values: Iterable<number>) => number;
	}

	let preciseSum = $derived.by(() => {
		const modernMath = Math as ModernMath;
		if (typeof modernMath.sumPrecise === 'function') {
			return modernMath.sumPrecise(numbers);
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
		<h3>Precision Math, Maps & Modern Iterators</h3>
		<p class="text-base sm:text-lg">
			ES2026 introduces native mathematical accuracy algorithms and collection ergonomics directly
			into standard ECMAScript.
		</p>
		<ul>
			<li>
				<strong><code>Math.sumPrecise()</code>:</strong> Native IEEE-754 exact accumulator avoiding binary
				floating-point roundoff errors without external BigNumber overhead.
			</li>
			<li>
				<strong><code>Map.prototype.getOrInsert()</code>:</strong> Eliminates lookup-and-fallback boilerplate
				logic by atomically inserting default values in a single call.
			</li>
			<li>
				<strong>Iterator Helpers:</strong> Compose lazy, unallocated data transformation pipelines
				using <code>.map()</code>, <code>.filter()</code>, <code>.take()</code>, and
				<code>.drop()</code> directly on standard Iterators.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: Math Precision -->
		<LabCard title="IEEE-754 Precision Accumulator" badge="Float Precision">
			<div class="space-y-4 font-mono text-sm">
				<div class="flex items-center justify-between">
					<span class="text-sm font-bold text-slate-600 dark:text-slate-300"
						>Active Array: [{numbers.join(', ')}]</span
					>
					<div class="flex gap-2">
						<button
							onclick={() => (numbers = [...numbers, 0.1])}
							class="rounded-xl bg-indigo-600 px-3.5 py-2 text-sm font-bold text-white transition hover:bg-indigo-500"
						>
							+ Append 0.1
						</button>
						<button
							onclick={() => (numbers = [0.1, 0.2, 0.3])}
							class="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
						>
							Reset
						</button>
					</div>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div
						class="rounded-2xl border border-amber-500/30 bg-amber-50/50 p-4 dark:bg-amber-950/20"
					>
						<span class="text-sm font-bold text-amber-700 uppercase dark:text-amber-400"
							>Standard reduce(+)</span
						>
						<p class="mt-1 text-lg font-bold text-amber-900 dark:text-amber-200">{standardSum}</p>
					</div>
					<div
						class="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-4 dark:bg-emerald-950/20"
					>
						<span class="text-sm font-bold text-emerald-700 uppercase dark:text-emerald-400"
							>Math.sumPrecise()</span
						>
						<p class="mt-1 text-lg font-bold text-emerald-900 dark:text-emerald-200">
							{preciseSum}
						</p>
					</div>
				</div>
			</div>
		</LabCard>

		<!-- Simulator 2: Map.getOrInsert -->
		<LabCard title="Map.prototype.getOrInsert Memoization" badge="Atomic Map Primitives">
			<div class="space-y-4 font-mono text-sm">
				<div class="flex gap-2">
					<input
						type="text"
						bind:value={cacheKeyInput}
						placeholder="Enter cache key..."
						class="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-base text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					/>
					<button
						onclick={handleGetOrInsert}
						class="rounded-xl bg-indigo-600 px-5 py-2 text-base font-bold text-white transition hover:bg-indigo-500"
					>
						getOrInsert()
					</button>
				</div>

				<div class="grid grid-cols-2 gap-2">
					{#each Object.entries(memoryStore) as [key, val] (key)}
						<div
							class="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
						>
							<div class="text-base font-bold text-indigo-600 dark:text-indigo-400">{key}</div>
							<div class="text-sm text-slate-500">Hits: {val.hits} · {val.cachedAt}</div>
						</div>
					{/each}
				</div>

				<div
					class="space-y-1 rounded-xl bg-slate-100 p-3.5 text-sm text-slate-700 dark:bg-slate-950/80 dark:text-slate-300"
				>
					{#each logHistory as log (log)}
						<div>› {log}</div>
					{/each}
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
