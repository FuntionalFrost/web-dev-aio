<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Live Svelte 5 Runes state playground
	let counter = $state(10);
	let multiplier = $state(3);
	let computedTotal = $derived(counter * multiplier);
	let logHistory = $state<string[]>([]);

	function increment() {
		counter++;
		logHistory = [
			`Counter updated to ${counter} (Total: ${counter * multiplier})`,
			...logHistory.slice(0, 4)
		];
	}

	function reset() {
		counter = 10;
		multiplier = 3;
		logHistory = ['State reset to default'];
	}
</script>

{#snippet customCardHeader(label: string)}
	<div
		class="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800"
	>
		<span
			class="font-mono text-xs font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
		>
			Snippet: {label}
		</span>
		<span
			class="rounded bg-indigo-50 px-2 py-0.5 font-mono text-[10px] text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
		>
			{@render snippetBadge()}
		</span>
	</div>
{/snippet}

{#snippet snippetBadge()}
	<span>&#123;#snippet&#125; active</span>
{/snippet}

<LabShell moduleId="framework-svelte5" title={data.meta.title} description={data.meta.description}>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock codeHtml={data.codeHtml} rawCode={data.rawCode} filename="Svelte5Engine.svelte" />
		</div>

		<h3>Svelte 5 Reactive Innovations</h3>
		<ul>
			<li>
				<strong>Universal Signal Reactivity (<code>$state</code>, <code>$derived</code>):</strong>
				Reactivity is no longer confined to top-level <code>.svelte</code> script tags; it works in
				standard TypeScript classes and functions across <code>.svelte.ts</code> files.
			</li>
			<li>
				<strong
					>Snippets replacing Slots (<code>&#123;#snippet&#125;</code> &
					<code>@render</code>):</strong
				> Snippets provide typed, parameterizable markup closures directly inside component bodies.
			</li>
			<li>
				<strong>Explicit Two-Way Binding (<code>$bindable()</code>):</strong> Components declare
				explicitly whether a prop can be bound by parents with <code>bind:prop</code>.
			</li>
		</ul>
	{/snippet}

	{#snippet sandbox()}
		<div
			class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
		>
			<!-- Snippet rendering test -->
			{@render customCardHeader('Reactive Runes Controller')}

			<!-- Controls -->
			<div class="grid grid-cols-2 gap-4 font-mono text-xs text-slate-700 dark:text-slate-300">
				<div>
					<label for="multiplier" class="flex justify-between text-slate-600 dark:text-slate-400">
						<span>Multiplier ($state)</span>
						<span class="font-bold text-slate-900 dark:text-white">{multiplier}x</span>
					</label>
					<input
						id="multiplier"
						type="range"
						min="1"
						max="10"
						bind:value={multiplier}
						class="mt-2 w-full accent-indigo-600"
					/>
				</div>
				<div class="flex items-end gap-2">
					<button
						onclick={increment}
						class="flex-1 rounded-xl bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-500"
					>
						+ Increment ($state)
					</button>
					<button
						onclick={reset}
						class="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
					>
						Reset
					</button>
				</div>
			</div>

			<!-- Telemetry Cards -->
			<div class="grid grid-cols-3 gap-3 font-mono">
				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="text-[10px] text-slate-400 uppercase">Counter ($state)</span>
					<p class="mt-1 text-xl font-bold text-slate-900 dark:text-white">{counter}</p>
				</div>
				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="text-[10px] text-slate-400 uppercase">Multiplier</span>
					<p class="mt-1 text-xl font-bold text-indigo-600 dark:text-indigo-400">{multiplier}x</p>
				</div>
				<div
					class="rounded-xl border border-emerald-500/30 bg-emerald-50/50 p-3 text-center dark:bg-emerald-950/20"
				>
					<span class="text-[10px] text-emerald-700 uppercase dark:text-emerald-400"
						>Total ($derived)</span
					>
					<p class="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-300">
						{computedTotal}
					</p>
				</div>
			</div>

			<!-- Runes Activity Telemetry -->
			<div
				class="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-[11px] tracking-wider text-slate-400 uppercase">Reactivity Stream:</span>
				<div class="mt-2 space-y-1">
					{#each logHistory as log, i (i)}
						<div class="text-slate-600 dark:text-slate-400">
							<span class="text-indigo-500">›</span>
							{log}
						</div>
					{:else}
						<div class="text-slate-400">Press Increment to dispatch reactive updates.</div>
					{/each}
				</div>
			</div>
		</div>
	{/snippet}
</LabShell>
