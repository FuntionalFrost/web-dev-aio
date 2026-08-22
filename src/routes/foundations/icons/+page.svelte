<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let iconCount = $state(200);
	let activeColor = $state('bg-indigo-600 text-indigo-600');
	let activeTech = $state<'svg' | 'css-mask'>('svg');

	const boltSvgPath = 'M13 10V3L4 14h7v7l9-11h-7z';
	const boltMaskUri =
		"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M13 10V3L4 14h7v7l9-11h-7z'/></svg>\")";

	const colorOptions = [
		{ label: 'Indigo', class: 'bg-indigo-600 text-indigo-600' },
		{ label: 'Emerald', class: 'bg-emerald-600 text-emerald-600' },
		{ label: 'Amber', class: 'bg-amber-600 text-amber-600' },
		{ label: 'Rose', class: 'bg-rose-600 text-rose-600' }
	];

	let domNodesCalculated = $derived(activeTech === 'svg' ? iconCount * 2 : iconCount);
</script>

<LabShell moduleId="foundation-icons" title={data.meta.title} description={data.meta.description}>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock
				codeHtml={data.codeHtml}
				rawCode={data.rawCode}
				filename="icon-architectures.html"
			/>
		</div>

		<h3>Architectural Comparison</h3>
		<div class="not-prose my-4 overflow-x-auto">
			<table
				class="w-full overflow-hidden rounded-xl border border-slate-200 text-left font-mono text-xs dark:border-slate-800"
			>
				<thead
					class="border-b border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
				>
					<tr>
						<th class="p-3">Feature</th>
						<th class="p-3">Inline SVG</th>
						<th class="p-3">CSS Mask (<code>mask-image</code>)</th>
					</tr>
				</thead>
				<tbody
					class="divide-y divide-slate-200 bg-white text-slate-600 dark:divide-slate-800/60 dark:bg-slate-950/40 dark:text-slate-400"
				>
					<tr>
						<td class="p-3 font-semibold text-slate-900 dark:text-slate-200">DOM Overhead</td>
						<td class="p-3 text-rose-600 dark:text-rose-400">2-5+ nodes per icon</td>
						<td class="p-3 text-emerald-600 dark:text-emerald-400">1 single node (&lt;span&gt;)</td>
					</tr>
					<tr>
						<td class="p-3 font-semibold text-slate-900 dark:text-slate-200">Theming / Color</td>
						<td class="p-3 text-indigo-600 dark:text-indigo-300"
							><code>currentColor</code> / stroke</td
						>
						<td class="p-3 text-indigo-600 dark:text-indigo-300"
							>Tailwind <code>bg-*</code> utilities</td
						>
					</tr>
					<tr>
						<td class="p-3 font-semibold text-slate-900 dark:text-slate-200">Multi-Color Paths</td>
						<td class="p-3 text-emerald-600 dark:text-emerald-400">Full native support</td>
						<td class="p-3 text-amber-600 dark:text-amber-400">Monochromatic only</td>
					</tr>
				</tbody>
			</table>
		</div>
	{/snippet}

	{#snippet sandbox()}
		<div
			class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
		>
			<div
				class="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800"
			>
				<span
					class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
				>
					Live Icon Engine Sandbox
				</span>
				<div
					class="flex rounded-lg border border-slate-200 bg-slate-100 p-1 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
				>
					<button
						onclick={() => (activeTech = 'svg')}
						class="rounded px-2.5 py-1 transition {activeTech === 'svg'
							? 'bg-indigo-600 text-white'
							: 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}"
					>
						Inline SVG
					</button>
					<button
						onclick={() => (activeTech = 'css-mask')}
						class="rounded px-2.5 py-1 transition {activeTech === 'css-mask'
							? 'bg-indigo-600 text-white'
							: 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}"
					>
						CSS Mask
					</button>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4 font-mono text-xs text-slate-600 dark:text-slate-400">
				<div>
					<label for="count">Render Batch: {iconCount} Icons</label>
					<input
						id="count"
						type="range"
						min="20"
						max="400"
						step="20"
						bind:value={iconCount}
						class="mt-1 w-full accent-indigo-600"
					/>
				</div>
				<div>
					<span>Palette Preset</span>
					<div class="mt-1.5 flex gap-2">
						{#each colorOptions as opt (opt.label)}
							<button
								onclick={() => (activeColor = opt.class)}
								class="h-6 w-6 rounded-full border border-slate-300 dark:border-slate-700 {opt.class.split(
									' '
								)[0]} transition hover:scale-110 {activeColor === opt.class
									? 'ring-2 ring-indigo-500 ring-offset-2'
									: ''}"
								aria-label={opt.label}
							></button>
						{/each}
					</div>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="font-mono text-[11px] text-slate-500 uppercase">Rendered DOM Elements</span>
					<p class="mt-1 font-mono text-2xl font-bold text-indigo-600 dark:text-indigo-400">
						{domNodesCalculated}
					</p>
				</div>
				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="font-mono text-[11px] text-slate-500 uppercase">Styling Strategy</span>
					<p class="mt-2 font-mono text-xs text-emerald-600 dark:text-emerald-400">
						{activeTech === 'svg' ? 'stroke="currentColor"' : 'background-color (mask)'}
					</p>
				</div>
			</div>

			<!-- Icon Viewport Area -->
			<div
				class="h-64 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-inner dark:border-slate-800 dark:bg-slate-950/60"
			>
				<div class="flex flex-wrap justify-center gap-2">
					{#if activeTech === 'svg'}
						{#each Array(iconCount) as _, i (i)}
							<svg
								class="h-6 w-6 transition-colors duration-150 {activeColor.split(' ')[1]}"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d={boltSvgPath} />
							</svg>
						{/each}
					{:else}
						{#each Array(iconCount) as _, i (i)}
							<span
								class="inline-block h-6 w-6 transition-colors duration-150 {activeColor.split(
									' '
								)[0]}"
								style:mask="{boltMaskUri} no-repeat center / contain"
								style:-webkit-mask="{boltMaskUri} no-repeat center / contain"
							></span>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	{/snippet}
</LabShell>
