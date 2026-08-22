<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Simulated Vue 3.5 reactive destructure behavior
	let rawPropCount = $state(42);
	let propLabel = $state('Telemetry Node');
	let autoId = 'vue-uid-89f2a';
</script>

<LabShell moduleId="framework-vue35" title={data.meta.title} description={data.meta.description}>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock codeHtml={data.codeHtml} rawCode={data.rawCode} filename="ModernComponent.vue" />
		</div>

		<h3>Vue 3.5 Upgrades</h3>
		<ul>
			<li>
				<strong>Reactive Props Destructure:</strong> Destructuring
				<code>const &#123; prop &#125; = defineProps()</code>
				retains reactivity via compile-time transforms without needing <code>toRefs()</code>.
			</li>
			<li>
				<strong><code>useTemplateRef()</code>:</strong> Replaces fragile string-matched ref declarations
				with typed ref handles that survive refactorings.
			</li>
			<li>
				<strong><code>useId()</code>:</strong> Generates deterministic IDs across SSR and client hydration
				to prevent accessibility attribute mismatches.
			</li>
			<li>
				<strong>Reactivity Memory Optimization:</strong> Vue 3.5 overhauled internal dependency tracking
				arrays, reducing reactive memory consumption by ~56%.
			</li>
		</ul>
	{/snippet}

	{#snippet sandbox()}
		<div
			class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
		>
			<div
				class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
			>
				<span
					class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
				>
					Vue 3.5 Props & ID Emulator
				</span>
				<span class="font-mono text-[10px] text-slate-500">useId() active</span>
			</div>

			<!-- Live Prop Controls -->
			<div class="grid grid-cols-2 gap-4 font-mono text-xs text-slate-600 dark:text-slate-400">
				<div>
					<label for="label-input">Prop: label</label>
					<input
						id="label-input"
						type="text"
						bind:value={propLabel}
						class="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					/>
				</div>
				<div>
					<label for="count-input">Prop: count ({rawPropCount})</label>
					<input
						id="count-input"
						type="range"
						min="0"
						max="100"
						bind:value={rawPropCount}
						class="mt-2.5 w-full accent-indigo-600"
					/>
				</div>
			</div>

			<!-- Reactive Consumer Card -->
			<div
				class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
			>
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-2 text-[11px] text-slate-500 dark:border-slate-900"
				>
					<span
						>Deterministic useId(): <strong class="text-indigo-600 dark:text-indigo-300"
							>{autoId}</strong
						></span
					>
					<span class="text-emerald-600 dark:text-emerald-400">Reactivity Connected</span>
				</div>

				<div class="grid grid-cols-2 gap-3">
					<div
						class="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
					>
						<span class="text-[10px] text-slate-400 uppercase">Destructured Label</span>
						<p class="mt-1 font-bold text-slate-900 dark:text-white">{propLabel}</p>
					</div>
					<div
						class="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
					>
						<span class="text-[10px] text-slate-400 uppercase">Destructured Count</span>
						<p class="mt-0.5 text-xl font-bold text-indigo-600 dark:text-indigo-400">
							{rawPropCount}
						</p>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</LabShell>
