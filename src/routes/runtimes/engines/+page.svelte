<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type RuntimeKey = 'node' | 'bun' | 'deno';

	let selectedRuntime = $state<RuntimeKey>('bun');

	const runtimeSpecs: Record<
		RuntimeKey,
		{
			name: string;
			version: string;
			engine: string;
			coldStartMs: number;
			installSpeedSec: number;
			securityModel: string;
			highlights: string[];
		}
	> = {
		bun: {
			name: 'Bun',
			version: '1.2+',
			engine: 'JavaScriptCore (WebKit) + Zig',
			coldStartMs: 4.5,
			installSpeedSec: 0.35,
			securityModel: 'Direct OS access, high-throughput IPC',
			highlights: [
				'Built-in bundler, test runner & package manager',
				'Native Web APIs (fetch, WebSocket, Streams)',
				'Zero-transpilation TypeScript & JSX execution'
			]
		},
		deno: {
			name: 'Deno',
			version: '2.2+',
			engine: 'V8 + Rust',
			coldStartMs: 8.2,
			installSpeedSec: 0.9,
			securityModel: 'Strict secure-by-default sandbox (--allow-net, --allow-read)',
			highlights: [
				'Backwards-compatible full npm & Node: imports',
				'Integrated task runner, linter & test framework',
				'First-class Web Standards alignment'
			]
		},
		node: {
			name: 'Node.js',
			version: '24 LTS',
			engine: 'V8 + C++',
			coldStartMs: 32.0,
			installSpeedSec: 2.4,
			securityModel: 'Permission flags (--permission, --allow-fs-read)',
			highlights: [
				'Native TypeScript stripping (--experimental-strip-types)',
				'Universal enterprise ecosystem compatibility',
				'Built-in SQLite module & test runner'
			]
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Modern JavaScript Runtimes: Node.js 24, Bun & Deno 2</h3>
		<p class="text-base sm:text-lg">
			The JavaScript runtime landscape in 2026 offers distinct trade-offs across execution engines, security models, cold-start latency, and tooling integration.
		</p>
		<ul>
			<li>
				<strong>Node.js 24 LTS:</strong> The industry standard runtime featuring native TypeScript execution (type stripping), built-in SQLite, and stable permission models.
			</li>
			<li>
				<strong>Bun 1.2:</strong> An all-in-one toolkit powered by WebKit JavaScriptCore and Zig with instant package installs, native bundler, and ultra-fast cold starts.
			</li>
			<li>
				<strong>Deno 2.2:</strong> A secure-by-default runtime with granular CLI permissions, out-of-the-box npm compatibility, and deep Web Standards compliance.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Runtime Benchmark & Feature Matrix" badge="Runtime Comparison">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-3 gap-2">
					{#each (['bun', 'deno', 'node'] as const) as rk}
						<button
							onclick={() => (selectedRuntime = rk)}
							class="rounded-xl border p-3 text-center font-bold text-base transition {selectedRuntime === rk
								? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
								: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
						>
							{runtimeSpecs[rk].name} ({runtimeSpecs[rk].version})
						</button>
					{/each}
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 space-y-3">
					<div class="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3 dark:border-slate-800">
						<div>
							<span class="text-xs text-slate-500 uppercase font-bold">Underlying Engine:</span>
							<p class="text-base font-bold text-slate-900 dark:text-white">{runtimeSpecs[selectedRuntime].engine}</p>
						</div>
						<div>
							<span class="text-xs text-slate-500 uppercase font-bold">Security Model:</span>
							<p class="text-base font-bold text-slate-900 dark:text-white">{runtimeSpecs[selectedRuntime].securityModel}</p>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 dark:border-indigo-900 dark:bg-indigo-950/40">
							<span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Cold Start Latency:</span>
							<p class="text-xl font-bold text-indigo-700 dark:text-indigo-300">{runtimeSpecs[selectedRuntime].coldStartMs} ms</p>
						</div>
						<div class="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
							<span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Package Install (100 pkgs):</span>
							<p class="text-xl font-bold text-emerald-700 dark:text-emerald-300">{runtimeSpecs[selectedRuntime].installSpeedSec} s</p>
						</div>
					</div>

					<div class="pt-2">
						<span class="text-xs font-bold text-slate-500 uppercase">Core Architectural Highlights:</span>
						<ul class="mt-1 space-y-1 text-sm text-slate-700 dark:text-slate-300">
							{#each runtimeSpecs[selectedRuntime].highlights as item}
								<li>• {item}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
