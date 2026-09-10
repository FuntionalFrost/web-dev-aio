<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let simulatedNonce = $state('rAnd0mN0nc3Str1ng==');
	let isStrictDynamic = $state(true);
	let isFrameAncestorsBlocked = $state(true);

	let activeViewIndex = $state(1);

	function switchViewTransition(targetView: number) {
		if (typeof document !== 'undefined' && 'startViewTransition' in document) {
			(document as any).startViewTransition(() => {
				activeViewIndex = targetView;
			});
		} else {
			activeViewIndex = targetView;
		}
	}

	let generatedCspHeader = $derived(
		[
			"default-src 'self'",
			`script-src 'self' 'nonce-${simulatedNonce}'${isStrictDynamic ? " 'strict-dynamic'" : ''}`,
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: https:",
			"object-src 'none'",
			"base-uri 'self'",
			isFrameAncestorsBlocked ? "frame-ancestors 'none'" : "frame-ancestors 'self'"
		].join('; ')
	);
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Security: Strict CSP, Nonces & View Transitions</h3>
		<p class="text-base sm:text-lg">
			Securing web applications against Cross-Site Scripting (XSS) and clickjacking with strict Content Security Policies while providing fluid navigational animations with the View Transitions API.
		</p>
		<ul>
			<li>
				<strong>Cryptographic CSP Nonces:</strong> Server-generated nonces ensure that only vetted scripts executed by the framework can run, blocking malicious injected payloads.
			</li>
			<li>
				<strong>Clickjacking Mitigation (<code>frame-ancestors 'none'</code>):</strong> Prevents unauthorized embedding inside foreign iframes.
			</li>
			<li>
				<strong>View Transitions API:</strong> Natively morphs DOM elements between pages and route navigations without complex layout calculations.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Strict CSP Header Policy Generator" badge="XSS Mitigation">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-4">
					<label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
						<input type="checkbox" bind:checked={isStrictDynamic} class="h-4 w-4 rounded text-indigo-600" />
						'strict-dynamic' Trust
					</label>
					<label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
						<input type="checkbox" bind:checked={isFrameAncestorsBlocked} class="h-4 w-4 rounded text-indigo-600" />
						frame-ancestors 'none'
					</label>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-slate-100 dark:border-slate-800 space-y-2">
					<span class="text-xs font-bold text-slate-400 uppercase">Generated Content-Security-Policy Header:</span>
					<pre class="overflow-x-auto text-xs sm:text-sm text-emerald-400 whitespace-pre-wrap">{generatedCspHeader}</pre>
				</div>
			</div>
		</LabCard>

		<LabCard title="Native View Transitions API Morphing" badge="document.startViewTransition">
			<div class="space-y-4 font-mono text-sm">
				<div class="flex gap-2">
					<button
						onclick={() => switchViewTransition(1)}
						class="rounded-xl border p-2.5 font-bold text-sm transition {activeViewIndex === 1
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900'}"
					>
						Layout A (Card)
					</button>
					<button
						onclick={() => switchViewTransition(2)}
						class="rounded-xl border p-2.5 font-bold text-sm transition {activeViewIndex === 2
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900'}"
					>
						Layout B (Expanded Hero)
					</button>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950 min-h-36 flex items-center justify-center">
					{#if activeViewIndex === 1}
						<div class="rounded-xl border border-indigo-500/40 bg-white p-4 shadow-md dark:bg-slate-900 text-center w-64 transition-all">
							<span class="text-xs font-bold text-indigo-600 uppercase">Morphable Element</span>
							<p class="text-lg font-bold text-slate-900 dark:text-white mt-1">Compact View</p>
						</div>
					{:else}
						<div class="rounded-2xl border-2 border-indigo-600 bg-indigo-50 p-6 shadow-xl dark:bg-indigo-950/50 text-center w-full transition-all">
							<span class="text-sm font-bold text-indigo-700 dark:text-indigo-300 uppercase">Expanded Spatial Hero</span>
							<p class="text-2xl font-bold text-slate-900 dark:text-white mt-2">Smooth View Transition Target</p>
						</div>
					{/if}
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
