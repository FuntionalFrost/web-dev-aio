<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const variants = ['default', 'outline', 'destructive'] as const;
	type Variant = (typeof variants)[number];

	// Simulated CVA & headless UI state
	let activeVariant = $state<Variant>('default');
	let isModalOpen = $state(false);
	let toggleActive = $state(true);
</script>

<LabShell
	moduleId="framework-shadcn-svelte"
	title={data.meta.title}
	description={data.meta.description}
>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock
				codeHtml={data.codeHtml}
				rawCode={data.rawCode}
				filename="ButtonAndDialog.svelte"
			/>
		</div>

		<h3>Architectural Principles</h3>
		<ul>
			<li>
				<strong>Zero-Package Component Ownership:</strong> Instead of importing compiled monolithic component
				libraries, code is generated directly into your codebase.
			</li>
			<li>
				<strong>Bits UI Primitive Layer:</strong> Headless runes primitives handle keyboard navigation,
				ARIA focus traps, and modal portaling natively.
			</li>
			<li>
				<strong><code>clsx</code> + <code>tailwind-merge</code>:</strong> Dynamic class conflict
				resolution ensures clean overrides without <code>!important</code> rules.
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
					Component Variance Authority (CVA)
				</span>
				<span class="font-mono text-[10px] text-slate-500">Atomic Variants</span>
			</div>

			<!-- Variant Controls -->
			<div class="space-y-2">
				<span class="font-mono text-xs text-slate-600 dark:text-slate-400"
					>Select CVA Button Variant:</span
				>
				<div class="flex gap-2">
					{#each variants as v (v)}
						<button
							onclick={() => (activeVariant = v)}
							class="rounded-lg border px-3 py-1.5 font-mono text-xs transition {activeVariant === v
								? 'border-indigo-600 bg-indigo-50 font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300'
								: 'border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'}"
						>
							variant: '{v}'
						</button>
					{/each}
				</div>
			</div>

			<!-- Live Primitive Button Render -->
			<div
				class="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950"
			>
				<button
					onclick={() => (isModalOpen = true)}
					class="inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-mono text-xs font-semibold shadow-sm transition {activeVariant ===
					'default'
						? 'bg-indigo-600 text-white shadow-indigo-500/20 hover:bg-indigo-500'
						: activeVariant === 'outline'
							? 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
							: 'bg-rose-600 text-white shadow-rose-500/20 hover:bg-rose-500'}"
				>
					Trigger Headless Dialog ({activeVariant})
				</button>
			</div>

			<!-- Switch Primitive -->
			<div
				class="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800"
			>
				<div>
					<span class="block text-xs font-semibold text-slate-900 dark:text-white"
						>Headless Switch Primitive</span
					>
					<span class="block font-mono text-[11px] text-slate-500"
						>Accessible ARIA Checked State: {toggleActive}</span
					>
				</div>
				<button
					role="switch"
					aria-label="Toggle headless switch primitive"
					aria-checked={toggleActive}
					onclick={() => (toggleActive = !toggleActive)}
					class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none {toggleActive
						? 'bg-indigo-600'
						: 'bg-slate-300 dark:bg-slate-700'}"
				>
					<span
						class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out {toggleActive
							? 'translate-x-5'
							: 'translate-x-0'}"
					></span>
				</button>
			</div>
		</div>

		<!-- Simulated Accessible Modal Overlay -->
		{#if isModalOpen}
			<div
				class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
			>
				<div
					class="w-full max-w-sm space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
				>
					<div class="flex items-center justify-between">
						<h4 class="font-bold text-slate-900 dark:text-white">
							Headless Modal (Bits UI Pattern)
						</h4>
						<button
							onclick={() => (isModalOpen = false)}
							aria-label="Close dialog"
							class="text-slate-400 hover:text-slate-600 dark:hover:text-white"
						>
							✕
						</button>
					</div>
					<p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
						This dialog pattern mirrors Bits UI: focus is trapped inside the portaled overlay, ESC
						dismisses automatically, and background scroll locks natively.
					</p>
					<button
						onclick={() => (isModalOpen = false)}
						class="w-full rounded-xl bg-slate-900 py-2 text-xs font-semibold text-white transition dark:bg-slate-800 dark:hover:bg-slate-700"
					>
						Acknowledge & Close
					</button>
				</div>
			</div>
		{/if}
	{/snippet}
</LabShell>
