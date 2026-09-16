<script lang="ts">
	import LabCard from '$lib/components/LabCard.svelte';

	let testSuiteState = $state<'idle' | 'running' | 'passed'>('idle');
	let testLogs = $state<string[]>([]);

	async function runTestSuite() {
		testSuiteState = 'running';
		testLogs = [];

		const tests = [
			'✓ [Vitest] Unit: Math.sumPrecise() accumulator accuracy (1.2ms)',
			'✓ [Vitest] Unit: verifyWebhookSignature() timing attack resilience (3.4ms)',
			'✓ [Svelte Testing] Component: <ThemeToggle /> accessibility and keyboard interaction (12.1ms)',
			'✓ [Svelte Testing] Component: <CommandPalette /> ⌘K modal focus trap (18.6ms)',
			'✓ [Playwright] E2E: Full-stack navigation across 35 curriculum tracks (210ms)',
			'✓ [Playwright] E2E: Dark/Light mode local storage persistence (140ms)'
		];

		for (const t of tests) {
			await new Promise((r) => setTimeout(r, 200));
			testLogs = [...testLogs, t];
		}
		testSuiteState = 'passed';
	}
</script>

<LabCard title="Integrated Test Runner Simulator" badge="Vitest + Playwright">
	<div class="space-y-4 font-mono text-sm">
		<div class="flex items-center justify-between">
			<span class="font-bold text-slate-600 dark:text-slate-300">Execute Full Test Harness:</span>
			<button
				onclick={runTestSuite}
				disabled={testSuiteState === 'running'}
				class="rounded-xl bg-indigo-600 px-5 py-2.5 text-base font-bold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-50"
			>
				{testSuiteState === 'running' ? 'Running Tests...' : 'Run Test Suite'}
			</button>
		</div>

		<div
			class="space-y-2 rounded-2xl border border-slate-200 bg-slate-950 p-5 text-slate-100 dark:border-slate-800"
		>
			<div
				class="flex items-center justify-between border-b border-slate-800 pb-2 text-sm text-slate-500 dark:text-slate-400"
			>
				<span>Test Suite: 6 Specs (Unit, Component, E2E)</span>
				<span
					class={testSuiteState === 'passed'
						? 'font-bold text-emerald-400'
						: testSuiteState === 'running'
							? 'animate-pulse text-amber-400'
							: 'text-slate-500'}
				>
					{testSuiteState.toUpperCase()}
				</span>
			</div>

			<div class="mt-3 space-y-1.5">
				{#each testLogs as log (log)}
					<div class="font-mono text-sm text-emerald-400">{log}</div>
				{:else}
					<div class="py-3 text-center text-slate-500">
						Press "Run Test Suite" to execute simulated Vitest & Playwright specs.
					</div>
				{/each}
			</div>
		</div>
	</div>
</LabCard>
