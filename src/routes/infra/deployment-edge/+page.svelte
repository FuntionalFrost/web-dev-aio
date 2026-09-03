<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// 1. Runtime Capability Comparator
	type RuntimeKey = 'workers' | 'node';
	let selectedRuntime = $state<RuntimeKey>('workers');

	const runtimes: Record<
		RuntimeKey,
		{
			label: string;
			badge: string;
			coldStart: string;
			memory: string;
			maxCpu: string;
			color: string;
			apis: { name: string; available: boolean }[];
		}
	> = {
		workers: {
			label: 'Cloudflare Workers',
			badge: 'V8 Isolate',
			coldStart: '~0 ms',
			memory: '128 MB',
			maxCpu: '50 ms / req',
			color: 'text-orange-600 dark:text-orange-400',
			apis: [
				{ name: 'fetch()', available: true },
				{ name: 'WebCrypto', available: true },
				{ name: 'Cache API', available: true },
				{ name: 'KV / Durable Objects', available: true },
				{ name: 'Node:fs / Node:path', available: false },
				{ name: 'process.env (via env binding)', available: true },
				{ name: 'WebSockets (Upgrade)', available: true },
				{ name: 'Native addons (.node)', available: false }
			]
		},
		node: {
			label: 'Serverless Node.js',
			badge: 'Container',
			coldStart: '200 – 800 ms',
			memory: '1024 MB',
			maxCpu: '15 min (Lambda)',
			color: 'text-emerald-600 dark:text-emerald-400',
			apis: [
				{ name: 'fetch()', available: true },
				{ name: 'WebCrypto', available: true },
				{ name: 'Cache API', available: false },
				{ name: 'KV / Durable Objects', available: false },
				{ name: 'Node:fs / Node:path', available: true },
				{ name: 'process.env', available: true },
				{ name: 'WebSockets (ws)', available: true },
				{ name: 'Native addons (.node)', available: true }
			]
		}
	};

	let activeRuntime = $derived(runtimes[selectedRuntime]);

	// 2. Cold Start Visualizer
	type SimState = 'idle' | 'cold' | 'warm' | 'done';
	let simState = $state<SimState>('idle');
	let simRuntime = $state<RuntimeKey>('workers');
	let coldMs = $state(0);
	let execMs = $state(0);
	let isMeasuring = $state(false);

	const coldStartProfiles: Record<RuntimeKey, { cold: number; exec: number }> = {
		workers: { cold: 0, exec: 4 },
		node: { cold: Math.floor(250 + Math.random() * 400), exec: 18 }
	};

	function runSimulation(rt: RuntimeKey) {
		if (isMeasuring) return;
		simRuntime = rt;
		isMeasuring = true;
		simState = 'cold';
		coldMs = 0;
		execMs = 0;

		const profile = {
			...coldStartProfiles[rt],
			cold: rt === 'node' ? Math.floor(250 + Math.random() * 400) : 0
		};

		setTimeout(
			() => {
				coldMs = profile.cold;
				simState = 'warm';
				setTimeout(() => {
					execMs = profile.exec;
					simState = 'done';
					isMeasuring = false;
				}, 400);
			},
			rt === 'workers' ? 300 : 900
		);
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>V8 Isolates vs Node.js Containers</h3>
		<ul>
			<li>
				<strong>V8 Isolate Model (Cloudflare Workers):</strong> Each request runs inside a
				pre-warmed V8 isolate — the same engine as Chrome. No OS process boot, no container spin-up.
				Cold start is effectively <code>0 ms</code> after initial deployment.
			</li>
			<li>
				<strong>Serverless Node.js (Lambda / Cloud Run):</strong> Each new instance requires booting
				a Node.js process inside a container. Cold starts typically add
				<code>250–800 ms</code> to the first request per instance.
			</li>
			<li>
				<strong>Runtime API Differences:</strong> Workers expose a subset of Web APIs (no
				<code>node:fs</code>, no native addons) but add proprietary APIs like KV, Durable Objects,
				and R2. Node functions have access to the full Node.js ecosystem including native addons.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Card 1: Runtime Capability Comparator -->
		<LabCard title="Runtime API Capability Matrix" badge="Workers vs Node.js">
			<!-- Toggle -->
			<div class="mb-4 flex gap-2 font-mono text-xs">
				{#each Object.entries(runtimes) as [key, rt] (key)}
					<button
						onclick={() => (selectedRuntime = key as RuntimeKey)}
						class="rounded-xl border px-4 py-2 font-semibold transition {selectedRuntime === key
							? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						{rt.label}
					</button>
				{/each}
			</div>

			<!-- Stats Row -->
			<div class="mb-4 grid grid-cols-3 gap-2 font-mono text-xs">
				{#each [['Cold Start', activeRuntime.coldStart], ['Max Memory', activeRuntime.memory], ['Max CPU', activeRuntime.maxCpu]] as [label, value] (label)}
					<div
						class="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
					>
						<span class="block text-[10px] tracking-wider text-slate-400 uppercase">{label}</span>
						<span class="mt-1 block font-bold {activeRuntime.color}">{value}</span>
					</div>
				{/each}
			</div>

			<!-- API Availability Grid -->
			<div class="space-y-1.5 font-mono text-xs">
				{#each activeRuntime.apis as api (api.name)}
					<div
						class="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2 dark:border-slate-800/60 dark:bg-slate-950/60"
					>
						<span class="text-slate-700 dark:text-slate-300">{api.name}</span>
						<span
							class={api.available
								? 'font-bold text-emerald-600 dark:text-emerald-400'
								: 'font-bold text-rose-500 dark:text-rose-400'}
						>
							{api.available ? '✓ Available' : '✗ Unavailable'}
						</span>
					</div>
				{/each}
			</div>
		</LabCard>

		<!-- Card 2: Cold Start Simulator -->
		<LabCard title="Cold Start Latency Simulator" badge="Boot Time Visualizer">
			<div class="mb-4 flex gap-2 font-mono text-xs">
				{#each ['workers', 'node'] as RuntimeKey[] as rt (rt)}
					<button
						onclick={() => runSimulation(rt)}
						disabled={isMeasuring}
						class="rounded-xl px-4 py-2 font-semibold text-white shadow-md transition disabled:opacity-40 {rt ===
						'workers'
							? 'bg-orange-500 shadow-orange-500/20 hover:bg-orange-400'
							: 'bg-emerald-600 shadow-emerald-500/20 hover:bg-emerald-500'}"
					>
						Simulate {runtimes[rt].label}
					</button>
				{/each}
			</div>

			{#if simState !== 'idle'}
				<div class="space-y-3 font-mono text-xs">
					<!-- Timeline Bar -->
					<div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
						<div class="flex h-8">
							<!-- Cold start phase -->
							<div
								class="flex items-center justify-center overflow-hidden text-[10px] font-bold text-white transition-all duration-700 {simRuntime ===
								'node'
									? 'bg-rose-500'
									: 'bg-emerald-500'}"
								style="width: {simRuntime === 'workers' ? 5 : 90}%"
							>
								{simRuntime === 'workers' ? '~0ms' : 'Cold'}
							</div>
							<!-- Exec phase -->
							<div
								class="flex flex-1 items-center justify-center text-[10px] font-bold text-white {simState ===
								'done'
									? 'bg-indigo-600'
									: 'bg-slate-300 dark:bg-slate-700'} transition-colors duration-300"
							>
								exec
							</div>
						</div>
					</div>

					<!-- Stats -->
					<div class="grid grid-cols-3 gap-2">
						{#each [['Runtime', runtimes[simRuntime].label], ['Cold Start', simState === 'cold' ? '…' : `${coldMs} ms`], ['Handler Exec', simState === 'done' ? `${execMs} ms` : '…']] as [label, value] (label)}
							<div
								class="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
							>
								<span class="block text-[10px] tracking-wider text-slate-400 uppercase"
									>{label}</span
								>
								<span class="mt-1 block font-bold text-slate-900 dark:text-white">{value}</span>
							</div>
						{/each}
					</div>

					{#if simState === 'done'}
						<p
							class="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
						>
							{simRuntime === 'workers'
								? '✓ Isolate was pre-warmed. Total overhead: <5 ms. No container spin-up required.'
								: `⚠ Container cold-start added ${coldMs} ms before handler could execute. Mitigate with provisioned concurrency or edge deployment.`}
						</p>
					{/if}
				</div>
			{:else}
				<p
					class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-xs text-slate-400 dark:border-slate-700"
				>
					Click a runtime above to simulate a cold-start request lifecycle.
				</p>
			{/if}
		</LabCard>
	{/snippet}
</LabShell>
