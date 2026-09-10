<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let cacheKey = $state('telemetry-metrics');
	let isLazy = $state(false);
	let fetchState = $state<'idle' | 'fetching' | 'cached' | 'refreshed'>('cached');
	let cachedHits = $state(3);

	function simulateAsyncDataRefresh() {
		fetchState = 'fetching';
		setTimeout(() => {
			cachedHits++;
			fetchState = 'refreshed';
		}, 400);
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Nuxt 4 Architecture, Nitro Hooks & useAsyncData</h3>
		<p class="text-base sm:text-lg">
			Nuxt 4 introduces a forward-compatible directory layout with <code>app/</code>, universal caching via <code>useAsyncData</code> and <code>useFetch</code>, and deep Nitro server integration.
		</p>
		<ul>
			<li>
				<strong>Universal Data Fetching (<code>useAsyncData</code>):</strong> Prevents double-fetching during client hydration by serializing server-fetched data in the SSR payload.
			</li>
			<li>
				<strong>Deduplication Keys:</strong> Key-based cache management ensures multiple components requesting the same key share a single network request.
			</li>
			<li>
				<strong>Server Routes (<code>server/api/</code>):</strong> Backed by Nitro with automatic HMR, typed endpoints, and cross-platform multi-runtime presets.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Nuxt 4 useAsyncData Cache Simulator" badge="Universal Data Cache">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-3">
					<div>
						<label for="async-cache-key" class="block mb-1 text-xs font-bold text-slate-500 uppercase">Cache Key:</label>
						<input
							id="async-cache-key"
							type="text"
							bind:value={cacheKey}
							class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
						/>
					</div>
					<div>
						<div class="block mb-1 text-xs font-bold text-slate-500 uppercase">Options:</div>
						<div class="flex items-center gap-4 pt-2">
							<label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
								<input type="checkbox" bind:checked={isLazy} class="h-4 w-4 rounded text-indigo-600" />
								Lazy Hydration
							</label>
						</div>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<button
						onclick={simulateAsyncDataRefresh}
						disabled={fetchState === 'fetching'}
						class="rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-base text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-50"
					>
						{fetchState === 'fetching' ? 'Refreshing...' : 'refresh() useAsyncData'}
					</button>
					<span class="text-xs text-slate-500 font-bold uppercase">Cached Reads: {cachedHits}</span>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 space-y-2">
					<div class="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
						<span class="text-xs text-slate-500 uppercase font-bold">Key: "{cacheKey}"</span>
						<span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Status: {fetchState.toUpperCase()}</span>
					</div>
					<div class="pt-2 text-slate-700 dark:text-slate-300 text-sm">
						<p>• Data transferred across SSR payload boundary without client re-fetch.</p>
						<p>• Lazy mode: {isLazy ? 'Enabled (Hydration deferred)' : 'Disabled (Blocking server render)'}</p>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
