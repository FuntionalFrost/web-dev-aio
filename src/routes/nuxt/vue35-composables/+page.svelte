<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let counterValue = $state(42);
	let metricLabel = $state('Active Edge Isolates');
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Vue 3.5 Core Primitives & Composables</h3>
		<p class="text-base sm:text-lg">
			Vue 3.5 enhances the Composition API with compiler improvements for prop destructuring,
			SSR-safe element IDs, and typed template references.
		</p>
		<ul>
			<li>
				<strong>Reactive Prop Destructuring:</strong> Destructuring <code>defineProps()</code>
				directly retains full reactivity without requiring <code>toRefs()</code> or
				<code>toRef()</code> boilerplate.
			</li>
			<li>
				<strong><code>useId()</code>:</strong> Generates unique, stable element IDs across server rendering
				and client hydration to prevent accessibility mismatches.
			</li>
			<li>
				<strong><code>useTemplateRef()</code>:</strong> Strongly typed DOM ref bindings that decouple
				variable names from template string literals.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Vue 3.5 Reactive Destructure Simulator" badge="Vue 3.5 Compiler">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-3">
					<div>
						<label for="metric-label" class="mb-1 block text-sm font-bold text-slate-500 uppercase"
							>Label Prop:</label
						>
						<input
							id="metric-label"
							type="text"
							bind:value={metricLabel}
							class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
						/>
					</div>
					<div>
						<label
							for="metric-counter"
							class="mb-1 block text-sm font-bold text-slate-500 uppercase">Count Prop:</label
						>
						<div class="flex gap-2">
							<input
								id="metric-counter"
								type="number"
								bind:value={counterValue}
								class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
							/>
							<button
								onclick={() => counterValue++}
								class="rounded-xl bg-indigo-600 px-4 py-2 text-base font-bold text-white hover:bg-indigo-500"
							>
								+1
							</button>
						</div>
					</div>
				</div>

				<div
					class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
				>
					<div
						class="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800"
					>
						<span class="text-sm font-bold text-slate-500 uppercase"
							>Simulated Vue 3.5 Component State</span
						>
						<span class="text-sm font-bold text-emerald-600 dark:text-emerald-400"
							>SSR useId() = v-id-109</span
						>
					</div>

					<div
						class="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900"
					>
						<div>
							<span class="text-sm font-bold text-indigo-600 uppercase">Destructured Prop:</span>
							<h4 class="text-lg font-bold text-slate-900 dark:text-white">{metricLabel}</h4>
						</div>
						<div class="text-right">
							<span class="text-sm font-bold text-slate-500 uppercase">Reactive Value:</span>
							<p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{counterValue}</p>
						</div>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
