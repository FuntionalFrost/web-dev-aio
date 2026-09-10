<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Universal class-based state module using Svelte 5 Runes
	class StoreModule {
		items = $state<{ id: string; name: string; price: number }[]>([
			{ id: '1', name: 'Web Engine 2026 Core License', price: 99 },
			{ id: '2', name: 'Edge Microservice Blueprint', price: 49 }
		]);

		discountPct = $state(10);
		subtotal = $derived(this.items.reduce((acc, curr) => acc + curr.price, 0));
		total = $derived(this.subtotal * (1 - this.discountPct / 100));

		addItem(name: string, price: number) {
			this.items.push({ id: Math.random().toString(36).substring(2, 6), name, price });
		}

		removeItem(id: string) {
			this.items = this.items.filter((item) => item.id !== id);
		}
	}

	const store = new StoreModule();
	let newItemName = $state('Enterprise Cloud Addon');
	let newItemPrice = $state(79);
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Svelte 5 Universal Runes & State Architecture</h3>
		<p class="text-base sm:text-lg">
			Svelte 5 replaces legacy stores and component-bound reactivity with fine-grained signal runes that execute uniformly across components, classes, and standalone TypeScript modules.
		</p>
		<ul>
			<li>
				<strong>Universal Runes:</strong> <code>$state</code>, <code>$derived</code>, and <code>$effect</code> work anywhere—including TypeScript classes inside <code>.svelte.ts</code> files.
			</li>
			<li>
				<strong>Snippets (<code>&#123;#snippet&#125;</code> & <code>@render</code>):</strong> Replaces fragile slot mechanisms with strongly typed, parameterizable markup blocks.
			</li>
			<li>
				<strong>Explicit Prop Bindings (<code>$props()</code> & <code>$bindable()</code>):</strong> Declares whether a component property allows two-way parent binding.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Class-Based Runes Store Simulator" badge="Universal Runes">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-3">
					<div>
						<label for="item-name-input" class="block mb-1 text-xs font-bold text-slate-500 uppercase">Item Name:</label>
						<input
							id="item-name-input"
							type="text"
							bind:value={newItemName}
							class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
						/>
					</div>
					<div>
						<label for="item-price-input" class="block mb-1 text-xs font-bold text-slate-500 uppercase">Price ($):</label>
						<div class="flex gap-2">
							<input
								id="item-price-input"
								type="number"
								bind:value={newItemPrice}
								class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
							/>
							<button
								onclick={() => store.addItem(newItemName, newItemPrice)}
								class="rounded-xl bg-indigo-600 px-4 py-2 font-bold text-base text-white hover:bg-indigo-500"
							>
								Add
							</button>
						</div>
					</div>
				</div>

				<div>
					<label for="discount-range-input" class="block mb-1 text-xs font-bold text-slate-500 uppercase">
						Active Discount ($state): {store.discountPct}%
					</label>
					<input
						id="discount-range-input"
						type="range"
						min="0"
						max="50"
						step="5"
						bind:value={store.discountPct}
						class="w-full accent-indigo-600"
					/>
				</div>

				<!-- Telemetry metrics -->
				<div class="grid grid-cols-3 gap-3">
					<div class="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center dark:border-slate-800 dark:bg-slate-950">
						<span class="text-xs font-bold text-slate-500 uppercase">Items Count</span>
						<p class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{store.items.length}</p>
					</div>
					<div class="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center dark:border-slate-800 dark:bg-slate-950">
						<span class="text-xs font-bold text-slate-500 uppercase">Subtotal</span>
						<p class="mt-1 text-2xl font-bold text-slate-700 dark:text-slate-300">${store.subtotal}</p>
					</div>
					<div class="rounded-xl border border-emerald-500/30 bg-emerald-50/40 p-3.5 text-center dark:bg-emerald-950/30">
						<span class="text-xs font-bold text-emerald-700 uppercase dark:text-emerald-400">Total ($derived)</span>
						<p class="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-300">${store.total.toFixed(2)}</p>
					</div>
				</div>

				<!-- Items List -->
				<div class="space-y-2">
					{#each store.items as item (item.id)}
						<div class="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
							<span class="font-bold text-slate-900 dark:text-white">{item.name}</span>
							<div class="flex items-center gap-3">
								<span class="font-semibold text-indigo-600 dark:text-indigo-400">${item.price}</span>
								<button
									onclick={() => store.removeItem(item.id)}
									class="rounded-lg bg-rose-50 px-2 py-1 text-xs font-bold text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-400"
								>
									Remove
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
