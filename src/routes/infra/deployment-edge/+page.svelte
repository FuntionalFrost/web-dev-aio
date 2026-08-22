<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Simulated Runtime Execution Benchmark State
	let selectedPlatform = $state<'edge' | 'serverless'>('edge');
	let isExecuting = $state(false);
	let benchmarkResult = $state<{
		coldStartMs: number;
		executionMs: number;
		memoryMb: number;
		globalEdge: boolean;
		nodeApiSupport: boolean;
	} | null>(null);

	function runBenchmark() {
		isExecuting = true;
		benchmarkResult = null;

		setTimeout(() => {
			isExecuting = false;
			if (selectedPlatform === 'edge') {
				benchmarkResult = {
					coldStartMs: 3,
					executionMs: 12,
					memoryMb: 128,
					globalEdge: true,
					nodeApiSupport: false
				};
			} else {
				benchmarkResult = {
					coldStartMs: 240,
					executionMs: 18,
					memoryMb: 1024,
					globalEdge: false,
					nodeApiSupport: true
				};
			}
		}, 450);
	}
</script>

<LabShell
	moduleId="infra-deployment-edge"
	title={data.meta.title}
	description={data.meta.description}
>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock codeHtml={data.codeHtml} rawCode={data.rawCode} filename="edge-vs-node.ts" />
		</div>

		<h3>Runtime Architectural Comparison</h3>
		<div class="not-prose my-4 overflow-x-auto">
			<table
				class="w-full overflow-hidden rounded-xl border border-slate-200 text-left font-mono text-xs dark:border-slate-800"
			>
				<thead
					class="border-b border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
				>
					<tr>
						<th class="p-3">Attribute</th>
						<th class="p-3">V8 Edge Isolates</th>
						<th class="p-3">Node.js Serverless</th>
					</tr>
				</thead>
				<tbody
					class="divide-y divide-slate-200 bg-white text-slate-600 dark:divide-slate-800/60 dark:bg-slate-950/40 dark:text-slate-400"
				>
					<tr>
						<td class="p-3 font-semibold text-slate-900 dark:text-slate-200">Cold Start</td>
						<td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">&lt; 5 ms</td>
						<td class="p-3 text-amber-600 dark:text-amber-400">150 – 500 ms</td>
					</tr>
					<tr>
						<td class="p-3 font-semibold text-slate-900 dark:text-slate-200">Distribution</td>
						<td class="p-3 text-indigo-600 dark:text-indigo-400">Global (300+ locations)</td>
						<td class="p-3">Single Region / Multi-region</td>
					</tr>
					<tr>
						<td class="p-3 font-semibold text-slate-900 dark:text-slate-200">API Support</td>
						<td class="p-3">Standard Web APIs (fetch, crypto)</td>
						<td class="p-3 text-emerald-600 dark:text-emerald-400"
							>Full Node.js (fs, child_process)</td
						>
					</tr>
				</tbody>
			</table>
		</div>
	{/snippet}

	{#snippet sandbox()}
		<div
			class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
		>
			<div
				class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
			>
				<span
					class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
				>
					Cloud Runtime Benchmark Emulator
				</span>
				<div
					class="flex rounded-lg border border-slate-200 bg-slate-100 p-1 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
				>
					<button
						onclick={() => (selectedPlatform = 'edge')}
						class="rounded px-2.5 py-1 transition {selectedPlatform === 'edge'
							? 'bg-indigo-600 text-white'
							: 'text-slate-600 dark:text-slate-400'}"
					>
						Cloudflare / Vercel Edge
					</button>
					<button
						onclick={() => (selectedPlatform = 'serverless')}
						class="rounded px-2.5 py-1 transition {selectedPlatform === 'serverless'
							? 'bg-indigo-600 text-white'
							: 'text-slate-600 dark:text-slate-400'}"
					>
						Node.js Serverless
					</button>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<button
					onclick={runBenchmark}
					disabled={isExecuting}
					class="rounded-xl bg-indigo-600 px-4 py-2 font-mono text-xs font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-40"
				>
					{isExecuting ? 'Benchmarking Boot Time...' : 'Dispatch Simulated Invocation'}
				</button>

				<span class="font-mono text-xs text-slate-500">
					Architecture: {selectedPlatform === 'edge' ? 'V8 Isolate' : 'Containerized MicroVM'}
				</span>
			</div>

			{#if benchmarkResult}
				<div class="grid grid-cols-2 gap-3 font-mono sm:grid-cols-4">
					<div
						class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950"
					>
						<span class="text-[10px] text-slate-400 uppercase">Cold Start</span>
						<p
							class="mt-1 text-xl font-bold {benchmarkResult.coldStartMs < 10
								? 'text-emerald-600 dark:text-emerald-400'
								: 'text-amber-600 dark:text-amber-400'}"
						>
							{benchmarkResult.coldStartMs}ms
						</p>
					</div>
					<div
						class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950"
					>
						<span class="text-[10px] text-slate-400 uppercase">Execution</span>
						<p class="mt-1 text-xl font-bold text-slate-900 dark:text-white">
							{benchmarkResult.executionMs}ms
						</p>
					</div>
					<div
						class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950"
					>
						<span class="text-[10px] text-slate-400 uppercase">Global Edge</span>
						<p class="mt-1 text-xl font-bold text-indigo-600 dark:text-indigo-400">
							{benchmarkResult.globalEdge ? 'YES' : 'NO'}
						</p>
					</div>
					<div
						class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950"
					>
						<span class="text-[10px] text-slate-400 uppercase">Node APIs</span>
						<p
							class="mt-1 text-xl font-bold {benchmarkResult.nodeApiSupport
								? 'text-emerald-600 dark:text-emerald-400'
								: 'text-slate-400'}"
						>
							{benchmarkResult.nodeApiSupport ? 'FULL' : 'LIMITED'}
						</p>
					</div>
				</div>
			{:else}
				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center font-mono text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-950"
				>
					Click "Dispatch Simulated Invocation" to measure latency and memory profiles.
				</div>
			{/if}
		</div>
	{/snippet}
</LabShell>
