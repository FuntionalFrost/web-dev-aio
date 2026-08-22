<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let dialogElement = $state<HTMLDialogElement | null>(null);
	let isModalOpen = $state(false);
	let isInertActive = $state(true);

	let rotateX = $state(15);
	let rotateY = $state(-20);
	let depth = $state(40);

	function openDialog() {
		dialogElement?.showModal();
		isModalOpen = true;
	}

	function closeDialog() {
		dialogElement?.close();
		isModalOpen = false;
	}
</script>

<LabShell moduleId="module-3" title={data.meta.title} description={data.meta.description}>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock
				codeHtml={data.codeHtml}
				rawCode={data.rawCode}
				filename="transitions-and-a11y.css"
			/>
		</div>

		<h3>Core Advantages</h3>
		<ul>
			<li>
				<strong>@starting-style:</strong> CSS transitions from <code>display: none</code> without JavaScript
				timers.
			</li>
			<li>
				<strong>inert:</strong> Disables focus and accessibility trees for background containers automatically.
			</li>
			<li>
				<strong>Hardware 3D:</strong> Dynamic CSS variable transforms execute directly on the GPU compositor.
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
						Modal & Inert Visualizer
					</span>
					<label
						class="flex cursor-pointer items-center gap-2 font-mono text-xs text-slate-700 dark:text-slate-300"
					>
						<input
							type="checkbox"
							bind:checked={isInertActive}
							class="rounded border-slate-300 text-indigo-600 dark:border-slate-700"
						/>
						Apply <code>inert</code>
					</label>
				</div>

				<div
					inert={isModalOpen && isInertActive ? true : undefined}
					class="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-opacity duration-200 dark:border-slate-800 dark:bg-slate-950 {isModalOpen &&
					isInertActive
						? 'opacity-30 select-none'
						: 'opacity-100'}"
				>
					<p class="mb-3 font-mono text-xs text-slate-500">// Background container</p>
					<div class="flex flex-wrap gap-2">
						<input
							type="text"
							placeholder="Tab focusable #1"
							class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
						/>
						<button
							class="rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300"
						>
							Tab focusable #2
						</button>
					</div>
				</div>

				<button
					onclick={openDialog}
					class="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
				>
					Open Smooth Dialog
				</button>

				<dialog
					bind:this={dialogElement}
					onclose={() => (isModalOpen = false)}
					class="fixed m-auto rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
				>
					<div class="max-w-sm space-y-4">
						<h3 class="text-lg font-bold">Pure CSS Entry Animation</h3>
						<p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
							This dialog opens and transitions smoothly from <code
								class="text-indigo-600 dark:text-indigo-300">display: none</code
							>
							using the CSS
							<code class="text-indigo-600 dark:text-indigo-300">@starting-style</code> rule.
						</p>
						<button
							onclick={closeDialog}
							class="w-full rounded-lg border border-slate-300 bg-slate-100 py-2 text-xs font-medium text-slate-800 transition hover:bg-slate-200 dark:border-transparent dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
						>
							Dismiss Modal
						</button>
					</div>
				</dialog>
			</div>

			<!-- 3D Transform Controller -->
			<div
				class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
			>
				<span
					class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
				>
					Hardware 3D Transforms
				</span>

				<div class="grid grid-cols-3 gap-3 font-mono text-xs text-slate-600 dark:text-slate-400">
					<div>
						<label for="rx">Rotate X ({rotateX}°)</label>
						<input
							id="rx"
							type="range"
							min="-45"
							max="45"
							bind:value={rotateX}
							class="mt-1 w-full accent-indigo-600"
						/>
					</div>
					<div>
						<label for="ry">Rotate Y ({rotateY}°)</label>
						<input
							id="ry"
							type="range"
							min="-45"
							max="45"
							bind:value={rotateY}
							class="mt-1 w-full accent-indigo-600"
						/>
					</div>
					<div>
						<label for="tz">Translate Z ({depth}px)</label>
						<input
							id="tz"
							type="range"
							min="0"
							max="80"
							bind:value={depth}
							class="mt-1 w-full accent-indigo-600"
						/>
					</div>
				</div>

				<div
					class="flex h-44 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-4 perspective-midrange dark:border-slate-800 dark:bg-slate-950"
				>
					<div
						class="rounded-xl border border-indigo-500/40 bg-linear-to-br from-indigo-500/20 to-white p-6 shadow-lg transition-transform duration-75 dark:from-indigo-900/50 dark:to-slate-900"
						style:transform="rotateX({rotateX}deg) rotateY({rotateY}deg) translateZ({depth}px)"
					>
						<div class="text-center font-mono">
							<span
								class="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400"
								>3D Matrix Node</span
							>
							<p class="mt-1 text-base font-bold text-slate-900 dark:text-white">Spatial Engine</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</LabShell>

<style>
	dialog {
		transition:
			opacity 0.25s ease-out,
			transform 0.25s ease-out,
			display 0.25s allow-discrete,
			overlay 0.25s allow-discrete;
		opacity: 0;
		transform: scale(0.92) translateY(8px);
	}

	dialog[open] {
		opacity: 1;
		transform: scale(1) translateY(0);
	}

	@starting-style {
		dialog[open] {
			opacity: 0;
			transform: scale(0.92) translateY(8px);
		}
	}

	dialog::backdrop {
		transition:
			opacity 0.25s ease-out,
			display 0.25s allow-discrete,
			overlay 0.25s allow-discrete;
		opacity: 0;
	}

	dialog[open]::backdrop {
		opacity: 1;
	}

	@starting-style {
		dialog[open]::backdrop {
			opacity: 0;
		}
	}
</style>
