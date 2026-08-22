<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// 1. Constraint validation state
	let testEmail = $state('');
	let testNumber = $state(42);

	// 2. Interactive <search> landmark state
	let searchQuery = $state('');
	const html5Features = [
		{ name: '<details name="...">', tag: 'Accordion', desc: 'Exclusive native disclosure' },
		{ name: '<search>', tag: 'Landmark', desc: 'Accessible search container' },
		{ name: ':user-valid', tag: 'CSS Selectors', desc: 'Post-interaction validation' },
		{ name: '<dialog>', tag: 'Top Layer', desc: 'Native modal & backdrop' },
		{ name: 'inert', tag: 'Global Attribute', desc: 'Focus & a11y containment' }
	];

	let filteredFeatures = $derived(
		html5Features.filter(
			(f) =>
				f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				f.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
				f.tag.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<LabShell moduleId="foundation-html" title={data.meta.title} description={data.meta.description}>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock codeHtml={data.codeHtml} rawCode={data.rawCode} filename="html5-primitives.html" />
		</div>

		<h3>Core Specifications</h3>
		<ul>
			<li>
				<strong>Exclusive Accordions (<code>&lt;details name="..."&gt;</code>):</strong> Multiple
				<code>&lt;details&gt;</code>
				sharing a <code>name</code> attribute create an exclusive accordion with zero JavaScript listeners.
			</li>
			<li>
				<strong>The <code>&lt;search&gt;</code> Landmark:</strong> Replaces non-semantic
				<code>&lt;div role="search"&gt;</code> with an accessible, screen-reader discoverable document
				landmark.
			</li>
			<li>
				<strong><code>:user-valid</code> & <code>:user-invalid</code>:</strong> CSS pseudo-classes that
				display validation feedback only after user interaction and blur, eliminating initial load error
				flashes.
			</li>
		</ul>
	{/snippet}

	{#snippet sandbox()}
		<div class="flex flex-col gap-6">
			<div
				class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
			>
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
				>
					<span
						class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
					>
						Exclusive Grouped Accordion
					</span>
					<span
						class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400"
					>
						Zero-JS Native DOM
					</span>
				</div>

				<p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
					Opening any panel automatically collapses siblings linked through <code
						class="font-semibold text-indigo-600 dark:text-indigo-300">name="faq-group"</code
					>.
				</p>

				<div class="space-y-2.5">
					<details
						name="faq-group"
						open
						class="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition open:border-indigo-500/50 open:bg-indigo-50/20 dark:border-slate-800 dark:bg-slate-950 dark:open:border-indigo-500/50 dark:open:bg-indigo-950/20"
					>
						<summary
							class="flex cursor-pointer list-none items-center justify-between font-mono text-xs font-bold text-slate-900 dark:text-slate-100"
						>
							<span>01. Native Accordion Grouping</span>
							<span
								class="text-slate-400 transition-transform duration-200 group-open:rotate-180 dark:text-slate-500"
								>▼</span
							>
						</summary>
						<p
							class="mt-3 border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800/80 dark:text-slate-400"
						>
							Handled directly by the browser engine. Opening a sibling automatically fires a toggle
							event and closes this panel without JavaScript.
						</p>
					</details>

					<details
						name="faq-group"
						class="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition open:border-indigo-500/50 open:bg-indigo-50/20 dark:border-slate-800 dark:bg-slate-950 dark:open:border-indigo-500/50 dark:open:bg-indigo-950/20"
					>
						<summary
							class="flex cursor-pointer list-none items-center justify-between font-mono text-xs font-bold text-slate-900 dark:text-slate-100"
						>
							<span>02. Built-in Keyboard Accessibility</span>
							<span
								class="text-slate-400 transition-transform duration-200 group-open:rotate-180 dark:text-slate-500"
								>▼</span
							>
						</summary>
						<p
							class="mt-3 border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800/80 dark:text-slate-400"
						>
							Full Tab and Space/Enter key navigation is supported natively with no ARIA
							configuration required.
						</p>
					</details>

					<details
						name="faq-group"
						class="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition open:border-indigo-500/50 open:bg-indigo-50/20 dark:border-slate-800 dark:bg-slate-950 dark:open:border-indigo-500/50 dark:open:bg-indigo-950/20"
					>
						<summary
							class="flex cursor-pointer list-none items-center justify-between font-mono text-xs font-bold text-slate-900 dark:text-slate-100"
						>
							<span>03. Page Search Integration</span>
							<span
								class="text-slate-400 transition-transform duration-200 group-open:rotate-180 dark:text-slate-500"
								>▼</span
							>
						</summary>
						<p
							class="mt-3 border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800/80 dark:text-slate-400"
						>
							Closed panels remain indexable via in-page search (<kbd
								class="rounded bg-slate-200 px-1 py-0.5 text-[10px] text-slate-700 dark:bg-slate-800 dark:text-slate-300"
								>Ctrl+F</kbd
							>), auto-expanding when a match is found.
						</p>
					</details>
				</div>
			</div>

			<div
				class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
			>
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
				>
					<span
						class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
					>
						Semantic &lt;search&gt; Landmark
					</span>
					<span class="font-mono text-[10px] text-indigo-600 dark:text-indigo-300">
						HTML5 Search Element
					</span>
				</div>

				<search class="w-full">
					<form onsubmit={(e) => e.preventDefault()} class="relative">
						<input
							type="search"
							bind:value={searchQuery}
							placeholder="Search primitives (e.g., 'dialog', 'accordion')..."
							class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 font-mono text-xs text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500"
						/>
					</form>
				</search>

				<div class="max-h-40 space-y-1.5 overflow-y-auto">
					{#each filteredFeatures as feature (feature.name)}
						<div
							class="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-950"
						>
							<div>
								<span class="font-mono font-bold text-slate-900 dark:text-slate-100"
									>{feature.name}</span
								>
								<span class="block text-[11px] text-slate-500 dark:text-slate-400"
									>{feature.desc}</span
								>
							</div>
							<span
								class="rounded border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/60 dark:text-indigo-300"
							>
								{feature.tag}
							</span>
						</div>
					{:else}
						<div class="p-3 text-center font-mono text-xs text-slate-400">
							No primitives matching query.
						</div>
					{/each}
				</div>
			</div>

			<div
				class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
			>
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
				>
					<span
						class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
					>
						Constraint Validation Lab
					</span>
					<span class="font-mono text-[10px] text-indigo-600 dark:text-indigo-300">
						:user-valid / :user-invalid
					</span>
				</div>

				<form onsubmit={(e) => e.preventDefault()} class="space-y-4 font-mono text-xs">
					<div>
						<label
							for="req-email"
							class="mb-1 block font-semibold text-slate-700 dark:text-slate-300"
						>
							Email Address (Required):
						</label>
						<input
							id="req-email"
							type="email"
							required
							placeholder="developer@modern-web.org"
							bind:value={testEmail}
							class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-slate-900 placeholder-slate-400 transition-colors focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500"
						/>
						<span class="mt-1 block text-[10px] text-slate-500 dark:text-slate-400">
							Validation styles trigger only after user interaction and blur.
						</span>
					</div>

					<div>
						<label
							for="range-num"
							class="mb-1 block font-semibold text-slate-700 dark:text-slate-300"
						>
							Bounded Integer (min: 10, max: 100):
						</label>
						<input
							id="range-num"
							type="number"
							min="10"
							max="100"
							bind:value={testNumber}
							class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-slate-900 placeholder-slate-400 transition-colors focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500"
						/>
					</div>
				</form>
			</div>
		</div>
	{/snippet}
</LabShell>

<style>
	/* Remove default browser disclosure marker */
	summary::-webkit-details-marker {
		display: none;
	}
	summary {
		list-style: none;
	}

	/* Interaction-driven constraint validation styling */
	input:user-valid {
		border-color: rgb(16 185 129 / 0.8) !important;
		background-color: rgb(16 185 129 / 0.08) !important;
	}

	input:user-invalid {
		border-color: rgb(244 63 94 / 0.8) !important;
		background-color: rgb(244 63 94 / 0.08) !important;
	}
</style>
