<script lang="ts">
	import LabCard from '$lib/components/LabCard.svelte';

	let simulatedNonce = $state('rAnd0mN0nc3Str1ng==');
	let isStrictDynamic = $state(true);
	let isFrameAncestorsBlocked = $state(true);

	let activeViewIndex = $state(1);

	function switchViewTransition(targetView: number) {
		if (typeof document !== 'undefined' && 'startViewTransition' in document) {
			document.startViewTransition(() => {
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

<LabCard title="Strict CSP Header Policy Generator" badge="XSS Mitigation">
	<div class="space-y-4 font-mono text-sm">
		<div class="grid grid-cols-2 gap-4">
			<label
				class="flex cursor-pointer items-center gap-2 font-bold text-slate-700 dark:text-slate-300"
			>
				<input
					type="checkbox"
					bind:checked={isStrictDynamic}
					class="h-4 w-4 rounded text-indigo-600"
				/>
				'strict-dynamic' Trust
			</label>
			<label
				class="flex cursor-pointer items-center gap-2 font-bold text-slate-700 dark:text-slate-300"
			>
				<input
					type="checkbox"
					bind:checked={isFrameAncestorsBlocked}
					class="h-4 w-4 rounded text-indigo-600"
				/>
				frame-ancestors 'none'
			</label>
		</div>

		<div
			class="space-y-2 rounded-2xl border border-slate-200 bg-slate-900 p-4 text-slate-100 dark:border-slate-800"
		>
			<span class="text-sm font-bold text-slate-500 uppercase dark:text-slate-400"
				>Generated Content-Security-Policy Header:</span
			>
			<pre
				class="overflow-x-auto text-sm whitespace-pre-wrap text-emerald-400 sm:text-sm">{generatedCspHeader}</pre>
		</div>
	</div>
</LabCard>

<LabCard title="Native View Transitions API Morphing" badge="document.startViewTransition">
	<div class="space-y-4 font-mono text-sm">
		<div class="flex gap-2">
			<button
				onclick={() => switchViewTransition(1)}
				class="rounded-xl border p-2.5 text-sm font-bold transition {activeViewIndex === 1
					? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
					: 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900'}"
			>
				Layout A (Card)
			</button>
			<button
				onclick={() => switchViewTransition(2)}
				class="rounded-xl border p-2.5 text-sm font-bold transition {activeViewIndex === 2
					? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
					: 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900'}"
			>
				Layout B (Expanded Hero)
			</button>
		</div>

		<div
			class="flex min-h-36 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950"
		>
			{#if activeViewIndex === 1}
				<div
					class="w-64 rounded-xl border border-indigo-500/40 bg-white p-4 text-center shadow-md transition-all dark:bg-slate-900"
				>
					<span class="text-sm font-bold text-indigo-600 uppercase">Morphable Element</span>
					<p class="mt-1 text-lg font-bold text-slate-900 dark:text-white">Compact View</p>
				</div>
			{:else}
				<div
					class="w-full rounded-2xl border-2 border-indigo-600 bg-indigo-50 p-6 text-center shadow-xl transition-all dark:bg-indigo-950/50"
				>
					<span class="text-sm font-bold text-indigo-700 uppercase dark:text-indigo-300"
						>Expanded Spatial Hero</span
					>
					<p class="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
						Smooth View Transition Target
					</p>
				</div>
			{/if}
		</div>
	</div>
</LabCard>
