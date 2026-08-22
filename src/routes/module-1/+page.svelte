<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	interface PageDataPayload {
		meta: {
			title: string;
			description: string;
		};
		codeHtml: string;
		rawCode: string;
	}
	let { data }: { data: PageDataPayload } = $props();

	let numbers = $state<number[]>([0.1, 0.2, 0.3]);
	let standardSum = $derived(numbers.reduce((acc, curr) => acc + curr, 0));
	let preciseSum = $derived.by(() => {
		const sumPreciseFn = (Math as unknown as { sumPrecise?: (arr: number[]) => number }).sumPrecise;
		if (typeof sumPreciseFn === 'function') {
			return sumPreciseFn(numbers);
		}
		return Number(numbers.reduce((acc, curr) => acc + curr, 0).toFixed(1));
	});
</script>

<LabShell moduleId="module-1" title={data.meta.title} description={data.meta.description}>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock codeHtml={data.codeHtml} rawCode={data.rawCode} filename="precision-math.ts" />
		</div>

		<h3>Key Mechanics</h3>
		<ul>
			<li>
				<strong>Math.sumPrecise():</strong> Native IEEE-754 accurate floating-point summation.
			</li>
			<li>
				<strong>Map.prototype.getOrInsert():</strong> Atomic retrieval or lazy initialization for map
				values.
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
					Summation Runtime
				</span>
				<div class="flex gap-2">
					<button
						onclick={() => (numbers = [...numbers, 0.1])}
						class="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
					>
						+ Append 0.1
					</button>
					<button
						onclick={() => (numbers = [0.1, 0.2, 0.3])}
						class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
					>
						Reset
					</button>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4 font-mono">
				<div class="rounded-xl border border-amber-500/30 bg-amber-50/50 p-4 dark:bg-amber-950/20">
					<span class="text-[10px] text-amber-700 uppercase dark:text-amber-400">Standard Sum</span>
					<p class="mt-1 text-base font-bold text-amber-900 dark:text-amber-200">{standardSum}</p>
				</div>
				<div
					class="rounded-xl border border-emerald-500/30 bg-emerald-50/50 p-4 dark:bg-emerald-950/20"
				>
					<span class="text-[10px] text-emerald-700 uppercase dark:text-emerald-400"
						>Math.sumPrecise()</span
					>
					<p class="mt-1 text-base font-bold text-emerald-900 dark:text-emerald-200">
						{preciseSum}
					</p>
				</div>
			</div>
		</div>
	{/snippet}
</LabShell>
