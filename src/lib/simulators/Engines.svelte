<script lang="ts">
	import LabCard from '#lib/components/LabCard.svelte';
	import { MetricCard, Terminal, type TerminalLine } from 'yaxa-svelte';

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
			sparklineCold: number[];
			sparklineInstall: number[];
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
			],
			sparklineCold: [18, 12, 7, 4.5],
			sparklineInstall: [1.8, 1.2, 0.6, 0.35]
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
			],
			sparklineCold: [24, 16, 11, 8.2],
			sparklineInstall: [2.5, 1.8, 1.2, 0.9]
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
			],
			sparklineCold: [48, 40, 36, 32.0],
			sparklineInstall: [4.2, 3.5, 2.9, 2.4]
		}
	};

	const terminalProfiles: Record<RuntimeKey, TerminalLine[]> = {
		bun: [
			{ prompt: '~/app $', command: 'bun test --coverage' },
			{ output: '✓ 34 test suites passed in 12.4ms (100% statement coverage)' },
			{ prompt: '~/app $', command: 'bun add yaxa-svelte@latest' },
			{ output: '+ yaxa-svelte@2.10.0 [saved 4 pkgs in 21ms]' }
		],
		deno: [
			{ prompt: '~/app $', command: 'deno task check' },
			{ output: 'Task check: deno check src/main.ts (OK)' },
			{ prompt: '~/app $', command: 'deno test --allow-net --allow-read' },
			{ output: '34 passed | 0 failed (78ms)' }
		],
		node: [
			{ prompt: '~/app $', command: 'node --experimental-strip-types app.ts' },
			{ output: '[Node 24 LTS] Native TypeScript type-stripping completed in 32ms' },
			{ prompt: '~/app $', command: 'node --test' },
			{ output: '✔ all test suites passed (114ms)' }
		]
	};
</script>

<LabCard title="Runtime Benchmark & Feature Matrix" badge="Runtime Comparison">
	<div class="space-y-4 font-mono text-sm">
		<div class="grid grid-cols-3 gap-2">
			{#each ['bun', 'deno', 'node'] as const as rk (rk)}
				<button
					onclick={() => (selectedRuntime = rk)}
					class="rounded-xl border p-3 text-center text-base font-bold transition {selectedRuntime ===
					rk
						? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
						: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
				>
					{runtimeSpecs[rk].name} ({runtimeSpecs[rk].version})
				</button>
			{/each}
		</div>

		<div
			class="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
		>
			<div class="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3 dark:border-slate-800">
				<div>
					<span class="text-sm font-bold text-slate-500 uppercase">Underlying Engine:</span>
					<p class="text-base font-bold text-slate-900 dark:text-white">
						{runtimeSpecs[selectedRuntime].engine}
					</p>
				</div>
				<div>
					<span class="text-sm font-bold text-slate-500 uppercase">Security Model:</span>
					<p class="text-base font-bold text-slate-900 dark:text-white">
						{runtimeSpecs[selectedRuntime].securityModel}
					</p>
				</div>
			</div>

			<!-- Live Metric Cards with Sparklines -->
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<MetricCard
					title="Cold Start Latency"
					value="{runtimeSpecs[selectedRuntime].coldStartMs} ms"
					variant="outline"
					sparkline={runtimeSpecs[selectedRuntime].sparklineCold}
					sparklineColor="primary"
					class="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
				/>
				<MetricCard
					title="Package Install Speed (100 pkgs)"
					value="{runtimeSpecs[selectedRuntime].installSpeedSec} s"
					variant="outline"
					sparkline={runtimeSpecs[selectedRuntime].sparklineInstall}
					sparklineColor="success"
					class="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
				/>
			</div>

			<div class="pt-2">
				<span class="text-sm font-bold text-slate-500 uppercase">
					Core Architectural Highlights:
				</span>
				<ul class="mt-1 space-y-1 text-sm text-slate-700 dark:text-slate-300">
					{#each runtimeSpecs[selectedRuntime].highlights as item (item)}
						<li>• {item}</li>
					{/each}
				</ul>
			</div>

			<!-- Interactive CLI Shell Simulator -->
			<div class="pt-2">
				<span class="mb-2 block text-sm font-bold text-slate-500 uppercase">
					Execution Shell ({runtimeSpecs[selectedRuntime].name}):
				</span>
				<Terminal
					title="{runtimeSpecs[selectedRuntime].name} CLI Shell"
					lines={terminalProfiles[selectedRuntime]}
					copyable={true}
					class="rounded-xl border border-slate-700 shadow-lg"
				/>
			</div>
		</div>
	</div>
</LabCard>
