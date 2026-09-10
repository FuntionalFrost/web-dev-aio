<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

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

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Modern Testing Architecture: Vitest & Playwright</h3>
		<p class="text-base sm:text-lg">
			A comprehensive testing pyramid combines instantaneous unit testing with Vitest, accessible component testing, and deterministic end-to-end browser automation with Playwright.
		</p>
		<ul>
			<li>
				<strong>Vitest:</strong> Native Vite-powered test runner sharing the exact same plugins, TypeScript configurations, and transforms with zero config duplication.
			</li>
			<li>
				<strong>Component Testing:</strong> Renders real Svelte 5 Runes components in JSDOM / Happy-DOM to assert accessibility roles, keyboard interactions, and event emissions.
			</li>
			<li>
				<strong>Playwright E2E:</strong> Drives real Chromium, Firefox, and WebKit browsers in headless mode to validate user flows and view transitions.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Integrated Test Runner Simulator" badge="Vitest + Playwright">
			<div class="space-y-4 font-mono text-sm">
				<div class="flex items-center justify-between">
					<span class="text-slate-600 dark:text-slate-300 font-bold">Execute Full Test Harness:</span>
					<button
						onclick={runTestSuite}
						disabled={testSuiteState === 'running'}
						class="rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-base text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-50"
					>
						{testSuiteState === 'running' ? 'Running Tests...' : 'Run Test Suite'}
					</button>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-slate-100 dark:border-slate-800 space-y-2">
					<div class="flex items-center justify-between border-b border-slate-800 pb-2 text-xs text-slate-400">
						<span>Test Suite: 6 Specs (Unit, Component, E2E)</span>
						<span class={testSuiteState === 'passed' ? 'text-emerald-400 font-bold' : testSuiteState === 'running' ? 'text-amber-400 animate-pulse' : 'text-slate-500'}>
							{testSuiteState.toUpperCase()}
						</span>
					</div>

					<div class="mt-3 space-y-1.5">
						{#each testLogs as log}
							<div class="text-emerald-400 text-sm font-mono">{log}</div>
						{:else}
							<div class="text-slate-500 py-3 text-center">Press "Run Test Suite" to execute simulated Vitest & Playwright specs.</div>
						{/each}
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
