<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type VariantType = 'primary' | 'secondary' | 'danger';
	type SizeType = 'sm' | 'base' | 'lg';

	let selectedVariant = $state<VariantType>('primary');
	let selectedSize = $state<SizeType>('base');

	const variantClasses: Record<VariantType, string> = {
		primary: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-500/20',
		secondary:
			'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
		danger: 'bg-rose-600 text-white hover:bg-rose-500 shadow-md shadow-rose-500/20'
	};

	const sizeClasses: Record<SizeType, string> = {
		sm: 'px-3 py-1.5 text-sm rounded-lg',
		base: 'px-5 py-2.5 text-base rounded-xl font-semibold',
		lg: 'px-6 py-3.5 text-lg rounded-2xl font-bold'
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Nuxt UI & Headless Design Systems</h3>
		<p class="text-base sm:text-lg">
			Modern headless design architectures decouple accessibility and keyboard interaction mechanics
			(Reka UI / Bits UI) from atomic styling tokens (Tailwind CSS v4 & CVA).
		</p>
		<ul>
			<li>
				<strong>Headless Primitives:</strong> Zero-dependency accessible primitives guarantee WAI-ARIA
				compliance, roving tabindex, and screen reader announcements.
			</li>
			<li>
				<strong>Class Variance Authority (CVA):</strong> Type-safe variant configuration maps component
				properties cleanly to atomic Tailwind classes.
			</li>
			<li>
				<strong>Tailwind Merge:</strong> Safely resolves conflicting utility classes without CSS specificity
				wars.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="CVA Token Variant Synthesiser" badge="Headless UI Primitives">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-4">
					<div>
						<div class="mb-1.5 block text-sm font-bold text-slate-500 uppercase">
							Select Variant:
						</div>
						<div class="grid grid-cols-3 gap-1.5">
							{#each ['primary', 'secondary', 'danger'] as const as v (v)}
								<button
									onclick={() => (selectedVariant = v)}
									class="rounded-xl border p-2 text-center text-sm font-bold capitalize transition {selectedVariant ===
									v
										? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
										: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
								>
									{v}
								</button>
							{/each}
						</div>
					</div>

					<div>
						<div class="mb-1.5 block text-sm font-bold text-slate-500 uppercase">Select Size:</div>
						<div class="grid grid-cols-3 gap-1.5">
							{#each ['sm', 'base', 'lg'] as const as s (s)}
								<button
									onclick={() => (selectedSize = s)}
									class="rounded-xl border p-2 text-center text-sm font-bold uppercase transition {selectedSize ===
									s
										? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
										: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
								>
									{s}
								</button>
							{/each}
						</div>
					</div>
				</div>

				<div
					class="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950"
				>
					<button class="transition {variantClasses[selectedVariant]} {sizeClasses[selectedSize]}">
						Action Button ({selectedVariant}, {selectedSize})
					</button>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
