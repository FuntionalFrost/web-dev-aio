<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
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

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Core Advantages</h3>
		<ul>
			<li>
				<strong><code>@starting-style</code>:</strong> Animates element entry from
				<code>display: none</code> without JavaScript animation timers.
			</li>
			<li>
				<strong><code>inert</code> Attribute:</strong> Removes background elements from focus and accessibility
				trees while overlays are active.
			</li>
			<li>
				<strong>Hardware Transforms:</strong> GPU-composited 3D matrix rotations driven by reactive CSS
				tokens.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: Dialog & Inert -->
		<LabCard title="Modal & Inert Visualizer" badge="@starting-style">
			<div
				class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
			>
				<label
					class="flex cursor-pointer items-center gap-2 font-mono text-xs text-slate-700 dark:text-slate-300"
				>
					<input type="checkbox" bind:checked={isInertActive} class="rounded text-indigo-600" />
					Apply <code>inert</code> to background
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
						class="rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-300"
					>
						Tab focusable #2
					</button>
				</div>
			</div>

			<button
				onclick={openDialog}
				class="w-full rounded-xl bg-indigo-600 py-2.5 font-mono text-xs font-semibold text-white transition hover:bg-indigo-500"
			>
				Open showModal() Dialog
			</button>

			<dialog
				bind:this={dialogElement}
				onclose={() => (isModalOpen = false)}
				class="m-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl backdrop:bg-slate-950/60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
			>
				<div class="max-w-sm space-y-4 font-mono text-xs">
					<h3 class="text-base font-bold text-slate-900 dark:text-white">
						CSS Discrete Transition
					</h3>
					<p class="text-slate-600 dark:text-slate-400">
						Rendered natively using <code>@starting-style</code> and
						<code>display: allow-discrete</code>.
					</p>
					<button
						onclick={closeDialog}
						class="w-full rounded-lg bg-slate-100 py-2 font-medium text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
					>
						Dismiss Modal
					</button>
				</div>
			</dialog>
		</LabCard>

		<!-- Simulator 2: 3D Transform -->
		<LabCard title="Hardware 3D Spatial Transforms" badge="GPU Compositor">
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
					<label for="tz">Depth ({depth}px)</label>
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
		</LabCard>
	{/snippet}
</LabShell>
