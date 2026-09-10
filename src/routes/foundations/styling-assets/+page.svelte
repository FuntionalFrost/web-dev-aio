<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let containerWidth = $state(450);
	let selectedAssetType = $state<'avif' | 'webp' | 'png'>('avif');

	const assetSizes = {
		avif: { sizeKb: 18.4, compression: '92% vs raw PNG', format: 'Modern Next-Gen AV1' },
		webp: { sizeKb: 29.1, compression: '84% vs raw PNG', format: 'Universal Modern WebP' },
		png: { sizeKb: 230.0, compression: 'Baseline Lossless', format: 'Legacy Raster PNG' }
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Tailwind CSS v4 & Modern Asset Pipelines</h3>
		<p class="text-base sm:text-lg">
			Tailwind CSS v4 introduces a CSS-first architecture that eliminates <code
				>tailwind.config.js</code
			>
			in favor of native <code>@theme</code> blocks, cascade layers, and container queries.
		</p>
		<ul>
			<li>
				<strong>CSS-First <code>@theme</code>:</strong> Tokens bind directly to native CSS custom properties
				without JavaScript runtime compilation overhead.
			</li>
			<li>
				<strong>Modular Container Queries (<code>@container</code>):</strong> Components adapt based on
				their parent container width rather than the global viewport width.
			</li>
			<li>
				<strong>Asset Optimisation & Immutable Delivery:</strong> Modern bundlers hash static assets
				and serve them with <code>Cache-Control: public, max-age=31536000, immutable</code>.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Container Query Live Simulator" badge="@container">
			<div class="space-y-4">
				<label class="block space-y-1 font-mono text-sm">
					<div class="flex justify-between text-slate-700 dark:text-slate-300">
						<span>Container Width:</span>
						<span class="font-bold text-indigo-600 dark:text-indigo-400">{containerWidth}px</span>
					</div>
					<input
						type="range"
						min="280"
						max="600"
						bind:value={containerWidth}
						class="w-full accent-indigo-600"
					/>
				</label>

				<!-- Resizable container simulation -->
				<div
					style="width: {containerWidth}px; max-width: 100%;"
					class="mx-auto rounded-2xl border-2 border-dashed border-indigo-400/50 bg-slate-100/60 p-4 transition-all dark:bg-slate-950/60"
				>
					<div
						class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 {containerWidth >=
						420
							? 'grid grid-cols-2 gap-4'
							: 'space-y-3'}"
					>
						<div>
							<span class="text-sm font-bold text-indigo-600 uppercase">Modular Card</span>
							<h4 class="text-base font-bold text-slate-900 dark:text-white">
								Responsive Metric Widget
							</h4>
							<p class="text-sm text-slate-500">Adapts layout when container &gt; 420px</p>
						</div>
						<div class="rounded-lg bg-indigo-50 p-3 text-center dark:bg-indigo-950/50">
							<span class="text-sm font-bold text-indigo-600">Active Layout</span>
							<p class="text-base font-bold text-slate-900 dark:text-white">
								{containerWidth >= 420 ? '2-Column Grid' : 'Stacked Column'}
							</p>
						</div>
					</div>
				</div>
			</div>
		</LabCard>

		<LabCard title="Modern Media Format Comparison" badge="AVIF / WebP / PNG">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-3 gap-2">
					{#each ['avif', 'webp', 'png'] as const as type (type)}
						<button
							onclick={() => (selectedAssetType = type)}
							class="rounded-xl border p-2.5 text-center text-base font-bold transition {selectedAssetType ===
							type
								? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
								: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
						>
							{type.toUpperCase()}
						</button>
					{/each}
				</div>

				<div
					class="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
				>
					<div class="flex items-center justify-between">
						<span class="text-slate-500">Payload Weight:</span>
						<span class="text-lg font-bold text-indigo-600 dark:text-indigo-400"
							>{assetSizes[selectedAssetType].sizeKb} KB</span
						>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-slate-500">Compression Efficiency:</span>
						<span class="text-base font-semibold text-emerald-600 dark:text-emerald-400"
							>{assetSizes[selectedAssetType].compression}</span
						>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-slate-500">Format Profile:</span>
						<span class="text-sm text-slate-700 dark:text-slate-300"
							>{assetSizes[selectedAssetType].format}</span
						>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
