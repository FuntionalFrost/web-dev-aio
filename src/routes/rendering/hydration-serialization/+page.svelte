<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let serialisationMode = $state<'devalue' | 'json'>('devalue');

	const serialisationOutputs = {
		json: {
			encoded:
				'{"timestamp":"2026-09-10T10:00:00.000Z","bigIntError":"TypeError: Do not know how to serialise a BigInt"}',
			loss: 'Lossy: Dates converted to strings, BigInts throw TypeError, Sets/Maps turn into empty objects',
			safety: 'Low fidelity across network boundary'
		},
		devalue: {
			encoded:
				'[{"timestamp":1,"bigInt":2,"tags":3},new Date(1789034400000),9007199254740993n,new Set([4,5]),"svelte5","nitro"]',
			loss: 'Zero loss: Exact JavaScript type fidelity preserved, handles circular references and undefined',
			safety: 'High fidelity (Standard SvelteKit & Nuxt SSR serialisation)'
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Hydration Engines & Data Serialisation</h3>
		<p class="text-base sm:text-lg">
			Passing state across the server-to-client boundary requires specialised serialisers like <code
				>devalue</code
			>
			or <code>SuperJSON</code> that preserve complex JavaScript data structures.
		</p>
		<ul>
			<li>
				<strong>Standard JSON Limitations:</strong> <code>JSON.stringify</code> converts
				<code>Date</code>
				objects to strings, loses <code>Set</code> / <code>Map</code> prototypes, and throws on
				<code>BigInt</code>.
			</li>
			<li>
				<strong><code>devalue</code> Engine:</strong> Powers SvelteKit and Nuxt payload transfers by serialising
				circular references, custom prototypes, and native ECMAScript data structures safely.
			</li>
			<li>
				<strong>Hydration Mismatch Prevention:</strong> Guarantees identical client state recreation on
				the initial load without re-triggering network fetches.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="SSR Serialisation Protocol Comparison" badge="devalue vs JSON">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-3">
					<button
						onclick={() => (serialisationMode = 'devalue')}
						class="rounded-xl border p-3 text-center text-sm font-bold transition {serialisationMode ===
						'devalue'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						devalue (SvelteKit / Nuxt SSR)
					</button>
					<button
						onclick={() => (serialisationMode = 'json')}
						class="rounded-xl border p-3 text-center text-sm font-bold transition {serialisationMode ===
						'json'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						Standard JSON.stringify
					</button>
				</div>

				<div
					class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
				>
					<div>
						<span class="text-sm font-bold text-slate-500 uppercase">Serialised Wire Format:</span>
						<div class="mt-1 overflow-x-auto rounded-xl bg-slate-900 p-3.5 text-sm text-slate-100">
							<pre class="font-mono text-sm text-emerald-400">{serialisationOutputs[
									serialisationMode
								].encoded}</pre>
						</div>
					</div>

					<div>
						<span class="text-sm font-bold text-slate-500 uppercase">Type Retention Fidelity:</span>
						<p class="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
							{serialisationOutputs[serialisationMode].loss}
						</p>
					</div>

					<div class="border-t border-slate-200 pt-2 dark:border-slate-800">
						<span class="text-sm font-bold text-indigo-600 uppercase">Assessment:</span>
						<p class="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
							{serialisationOutputs[serialisationMode].safety}
						</p>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
