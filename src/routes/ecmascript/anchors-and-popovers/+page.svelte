<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let minThreshold = $state(15);
	let takeCount = $state(3);
	const rawStream = $state<number[]>([12, 45, 8, 92, 104, 3, 76, 55, 19, 88]);

	let processedStream = $derived.by(() => {
		if (typeof Iterator !== 'undefined' && typeof Iterator.from === 'function') {
			try {
				return Iterator.from(rawStream)
					.filter((val) => val >= minThreshold)
					.map((val) => `Node-0x${val.toString(16).toUpperCase()}`)
					.take(takeCount)
					.toArray();
			} catch {
				// Fallback
			}
		}
		return rawStream
			.filter((val) => val >= minThreshold)
			.map((val) => `Node-0x${val.toString(16).toUpperCase()}`)
			.slice(0, takeCount);
	});
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Key Mechanics</h3>
		<ul>
			<li>
				<strong>CSS Anchor Positioning:</strong> Tether floating menus in pure CSS without JavaScript
				bounding calculations.
			</li>
			<li>
				<strong>Native Popovers:</strong> Top-layer promotion and light-dismiss without click listeners.
			</li>
			<li>
				<strong>Iterator Helpers:</strong> Lazy pipeline transformations with zero intermediate array
				allocations.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: CSS Anchor & Popover -->
		<LabCard title="Native CSS Anchor & Popover" badge="Pure CSS">
			<div
				class="flex justify-center rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950"
			>
				<button
					id="action-anchor"
					popovertarget="demo-popover"
					class="rounded-xl bg-indigo-600 px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition [anchor-name:--menu-trigger] hover:bg-indigo-500"
				>
					Toggle Anchored Popover ▼
				</button>

				<div
					id="demo-popover"
					popover="auto"
					class="m-0 mt-2 rounded-xl border border-slate-200 bg-white p-4 text-slate-800 shadow-2xl [position-anchor:--menu-trigger] [position-area:bottom_span-right] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
				>
					<div class="w-48 space-y-2 font-mono text-xs">
						<div class="border-b border-slate-200 pb-1 font-bold dark:border-slate-800">
							Tethered Options
						</div>
						<button
							class="w-full rounded p-1.5 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
						>
							Action Alpha
						</button>
						<button
							class="w-full rounded p-1.5 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
						>
							Action Beta
						</button>
						<button
							class="w-full rounded p-1.5 text-left text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
						>
							Disconnect
						</button>
					</div>
				</div>
			</div>
		</LabCard>

		<!-- Simulator 2: Lazy Iterator Helpers -->
		<LabCard title="Lazy Iterator Pipeline" badge="Iterator.from()">
			<div class="grid grid-cols-2 gap-4 font-mono text-xs text-slate-600 dark:text-slate-400">
				<div>
					<label for="threshold">Filter: val &gt;= {minThreshold}</label>
					<input
						id="threshold"
						type="range"
						min="0"
						max="90"
						bind:value={minThreshold}
						class="mt-1 w-full accent-indigo-600"
					/>
				</div>
				<div>
					<label for="take">Take: {takeCount} items</label>
					<input
						id="take"
						type="range"
						min="1"
						max="6"
						bind:value={takeCount}
						class="mt-1 w-full accent-indigo-600"
					/>
				</div>
			</div>

			<div class="font-mono text-xs">
				<span class="text-[10px] text-slate-500 uppercase">Source Stream:</span>
				<div class="mt-1.5 flex flex-wrap gap-1.5">
					{#each rawStream as item, i (`raw-${i}`)}
						<span
							class="rounded border px-2 py-1 {item >= minThreshold
								? 'border-indigo-400 bg-indigo-50 font-bold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300'
								: 'border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-800 dark:bg-slate-950'}"
						>
							{item}
						</span>
					{/each}
				</div>
			</div>

			<div
				class="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-[10px] text-slate-500 uppercase">Iterator Result (.toArray()):</span>
				<div class="mt-2 flex flex-wrap gap-2">
					{#each processedStream as mappedVal (mappedVal)}
						<span
							class="rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 font-bold text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-950/60 dark:text-indigo-200"
						>
							{mappedVal}
						</span>
					{:else}
						<span class="text-slate-500">No items match the pipeline criteria.</span>
					{/each}
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
