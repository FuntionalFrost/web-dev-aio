<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Simulated Checkout & Webhook State
	let customerEmail = $state('ada@lovelace.org');
	let selectedPlan = $state<'pro' | 'enterprise'>('pro');
	let isCheckingOut = $state(false);
	let dispatchedEvents = $state<{ id: number; event: string; status: string; detail: string }[]>(
		[]
	);

	function simulateCheckout() {
		isCheckingOut = true;
		dispatchedEvents = [];

		setTimeout(() => {
			dispatchedEvents = [
				{
					id: 1,
					event: 'polar.checkout.completed',
					status: '200 OK',
					detail: `Plan: ${selectedPlan.toUpperCase()} ($${selectedPlan === 'pro' ? 29 : 199}/mo)`
				}
			];
			setTimeout(() => {
				dispatchedEvents = [
					...dispatchedEvents,
					{
						id: 2,
						event: 'polar.subscription.created',
						status: '200 OK',
						detail: `Assigned customer: ${customerEmail}`
					},
					{
						id: 3,
						event: 'resend.email.sent',
						status: '200 OK',
						detail: `Receipt & Onboarding dispatched to ${customerEmail}`
					}
				];
				isCheckingOut = false;
			}, 500);
		}, 400);
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Merchant of Record (Polar.sh) vs. Raw Gateways</h3>
		<ul>
			<li>
				<strong>Merchant of Record:</strong> Polar.sh calculates, collects, and remits global sales tax
				and VAT automatically, removing compliance liability from developers.
			</li>
			<li>
				<strong>Modern Email Infrastructure (Resend):</strong> Operates over HTTP REST APIs with native
				React/HTML templates, custom domain DKIM authentication, and webhook delivery tracking.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Polar.sh Checkout & Resend Pipeline" badge="MoR + Email Lifecycle">
			<!-- Checkout Simulator Form -->
			<div
				class="grid grid-cols-1 gap-4 font-mono text-xs text-slate-700 sm:grid-cols-2 dark:text-slate-300"
			>
				<div>
					<label for="c-email" class="mb-1 block font-semibold">Customer Email</label>
					<input
						id="c-email"
						type="email"
						bind:value={customerEmail}
						class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					/>
				</div>
				<div>
					<label for="c-plan" class="mb-1 block font-semibold">Subscription Tier</label>
					<select
						id="c-plan"
						bind:value={selectedPlan}
						class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					>
						<option value="pro">Pro Developer ($29/mo)</option>
						<option value="enterprise">Enterprise Tier ($199/mo)</option>
					</select>
				</div>
			</div>

			<button
				onclick={simulateCheckout}
				disabled={isCheckingOut}
				class="w-full rounded-xl bg-indigo-600 py-2.5 font-mono text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-40"
			>
				{isCheckingOut ? 'Processing Polar.sh Webhook...' : 'Simulate Polar Checkout Flow'}
			</button>

			<!-- Event Stream Log -->
			<div
				class="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-[11px] tracking-wider text-slate-400 uppercase"
					>Dispatched Webhook & Email Events:</span
				>
				<div class="mt-2 space-y-2">
					{#each dispatchedEvents as evt (evt.id)}
						<div
							class="rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900"
						>
							<div class="flex items-center justify-between">
								<span class="font-bold text-indigo-600 dark:text-indigo-400">{evt.event}</span>
								<span class="font-bold text-emerald-600 dark:text-emerald-400">{evt.status}</span>
							</div>
							<p class="mt-1 text-[11px] text-slate-500">{evt.detail}</p>
						</div>
					{:else}
						<div class="text-slate-400">Click "Simulate" to execute the subscription pipeline.</div>
					{/each}
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
