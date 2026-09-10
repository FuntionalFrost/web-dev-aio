<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let rawInput = $state('BigInt(9007199254740993n) + Date()');
	let serializationMode = $state<'devalue' | 'json'>('devalue');

	const serializationOutputs = {
		json: {
			encoded: '{"timestamp":"2026-09-10T10:00:00.000Z","bigIntError":"TypeError: Do not know how to serialize a BigInt"}',
			loss: 'Lossy: Dates converted to strings, BigInts throw TypeError, Sets/Maps turn into empty objects',
			safety: 'Low fidelity across network boundary'
		},
		devalue: {
			encoded: '[{"timestamp":1,"bigInt":2,"tags":3},new Date(1789034400000),9007199254740993n,new Set([4,5]),"svelte5","nitro"]',
			loss: 'Zero loss: Exact JavaScript type fidelity preserved, handles circular references and undefined',
			safety: 'High fidelity (Standard SvelteKit & Nuxt SSR serialization)'
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Hydration Engines & Data Serialization</h3>
		<p class="text-base sm:text-lg">
			Passing state across the server-to-client boundary requires specialized serializers like <code>devalue</code> or <code>SuperJSON</code> that preserve complex JavaScript data structures.
		</p>
		<ul>
			<li>
				<strong>Standard JSON Limitations:</strong> <code>JSON.stringify</code> converts <code>Date</code> objects to strings, loses <code>Set</code> / <code>Map</code> prototypes, and throws on <code>BigInt</code>.
			</li>
			<li>
				<strong><code>devalue</code> Engine:</strong> Powers SvelteKit and Nuxt payload transfers by serializing circular references, custom prototypes, and native ECMAScript data structures safely.
			</li>
			<li>
				<strong>Hydration Mismatch Prevention:</strong> Guarantees identical client state recreation on the initial load without re-triggering network fetches.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="SSR Serialization Protocol Comparison" badge="devalue vs JSON">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-3">
					<button
						onclick={() => (serializationMode = 'devalue')}
						class="rounded-xl border p-3 text-center font-bold text-sm transition {serializationMode === 'devalue'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						devalue (SvelteKit / Nuxt SSR)
					</button>
					<button
						onclick={() => (serializationMode = 'json')}
						class="rounded-xl border p-3 text-center font-bold text-sm transition {serializationMode === 'json'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						Standard JSON.stringify
					</button>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 space-y-3">
					<div>
						<span class="text-xs font-bold text-slate-500 uppercase">Serialized Wire Format:</span>
						<div class="rounded-xl bg-slate-900 p-3.5 text-xs text-slate-100 mt-1 overflow-x-auto">
							<pre class="text-emerald-400 font-mono text-xs">{serializationOutputs[serializationMode].encoded}</pre>
						</div>
					</div>

					<div>
						<span class="text-xs font-bold text-slate-500 uppercase">Type Retention Fidelity:</span>
						<p class="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{serializationOutputs[serializationMode].loss}</p>
					</div>

					<div class="pt-2 border-t border-slate-200 dark:border-slate-800">
						<span class="text-xs font-bold text-indigo-600 uppercase">Assessment:</span>
						<p class="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{serializationOutputs[serializationMode].safety}</p>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
