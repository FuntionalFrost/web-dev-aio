<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Simulated Nuxt 4 AsyncData lifecycle state
	let asyncStatus = $state<'idle' | 'pending' | 'success'>('idle');
	let fetchedData = $state<{ clusterId: string; pingMs: number } | null>(null);

	function triggerAsyncData() {
		asyncStatus = 'pending';
		fetchedData = null;

		setTimeout(() => {
			asyncStatus = 'success';
			fetchedData = {
				clusterId: 'eu-central-04',
				pingMs: 14
			};
		}, 700);
	}
</script>

<LabShell moduleId="framework-nuxt4" title={data.meta.title} description={data.meta.description}>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock codeHtml={data.codeHtml} rawCode={data.rawCode} filename="Nuxt4Index.vue" />
		</div>

		<h3>Nuxt 4 Paradigm Shifts</h3>
		<ul>
			<li>
				<strong>Unified <code>app/</code> Directory:</strong> Consolidates application source files
				(<code>app/pages</code>, <code>app/components</code>, <code>app/composables</code>) into a
				single directory, leaving the project root dedicated to configuration and server engine
				layers.
			</li>
			<li>
				<strong>Nuxt UI (Powered by Reka UI):</strong> Features first-class Tailwind v4 token support,
				accessible unstyled primitives, and native command palettes.
			</li>
			<li>
				<strong>Predictable Data Lifecycles:</strong> <code>useAsyncData</code> and
				<code>useFetch</code> share cached payloads between server rendering and client hydration without
				duplicate network requests.
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
					useAsyncData Lifecycle Simulator
				</span>
				<span
					class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-700 dark:bg-slate-800 dark:text-slate-300"
				>
					Nuxt 4 Fetch Engine
				</span>
			</div>

			<div class="flex items-center justify-between">
				<button
					onclick={triggerAsyncData}
					disabled={asyncStatus === 'pending'}
					class="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-40"
				>
					{asyncStatus === 'pending' ? 'Hydrating Payload...' : 'Execute useAsyncData()'}
				</button>

				<span
					class="font-mono text-xs {asyncStatus === 'pending'
						? 'animate-pulse text-amber-600 dark:text-amber-300'
						: asyncStatus === 'success'
							? 'font-bold text-emerald-600 dark:text-emerald-400'
							: 'text-slate-400'}"
				>
					status: '{asyncStatus}'
				</span>
			</div>

			<!-- Telemetry Surface -->
			<div
				class="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-[11px] tracking-wider text-slate-400 uppercase"
					>Hydrated Server Response:</span
				>

				{#if asyncStatus === 'idle'}
					<div class="mt-2 text-slate-400">
						Click execute to simulate server-to-client payload transfer.
					</div>
				{:else if asyncStatus === 'pending'}
					<div class="mt-3 space-y-2">
						<div class="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
						<div class="h-4 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
					</div>
				{:else if asyncStatus === 'success' && fetchedData}
					<div
						class="mt-2 space-y-1 rounded-lg border border-slate-200 bg-white p-3 text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-emerald-300"
					>
						<div>
							clusterId: <span class="font-bold text-slate-900 dark:text-white"
								>"{fetchedData.clusterId}"</span
							>
						</div>
						<div>
							pingMs: <span class="font-bold text-slate-900 dark:text-white"
								>{fetchedData.pingMs}ms</span
							>
						</div>
						<div>
							ssrHydrated: <span class="font-bold text-slate-900 dark:text-white">true</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/snippet}
</LabShell>
