<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type MonetisationModel = 'mor' | 'stripe' | 'paywall' | 'tokens';
	let selectedModel = $state<MonetisationModel>('mor');

	const models: Record<
		MonetisationModel,
		{ title: string; provider: string; taxHandling: string; payout: string; bestFor: string }
	> = {
		mor: {
			title: 'Merchant of Record (Polar.sh / LemonSqueezy)',
			provider: 'Polar.sh / LemonSqueezy',
			taxHandling: '100% Automated (Global VAT, GST, Sales Tax handled by MoR)',
			payout: 'Direct bank transfer / Stripe Connect',
			bestFor:
				'Solo developers, open-source creators selling Pro tiers or licences globally without corporate tax entities'
		},
		stripe: {
			title: 'Direct Stripe Billing & Checkout',
			provider: 'Stripe Billing & Subscriptions',
			taxHandling: 'Requires Stripe Tax setup & local business registration',
			payout: 'Instant two-day rolling payouts',
			bestFor:
				'Established companies and registered entities requiring custom invoicing & contract billing'
		},
		paywall: {
			title: 'Tiered Feature Gates & Paywalls',
			provider: 'JWT / Session Cookie Gate',
			taxHandling: 'Integrated with checkout provider',
			payout: 'Subscription recurring revenue (MRR)',
			bestFor: 'SaaS applications with free tiers, Pro feature unlocking, and team seat licensing'
		},
		tokens: {
			title: 'API Usage Metering & Token Consumption',
			provider: 'Upstash Redis / Stripe Usage Meters',
			taxHandling: 'Post-consumption metered invoices',
			payout: 'Usage-based recurring charges',
			bestFor: 'Developer platforms, LLM proxies, image processing APIs, and compute services'
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Site & Project Monetisation Models</h3>
		<p class="text-base sm:text-lg">
			Monetising developer software tools, SaaS products, and open-source packages requires choosing
			between Merchant of Record platforms, direct payment gateways, and usage-based billing.
		</p>
		<ul>
			<li>
				<strong>Merchant of Record (MoR) vs Direct Gateway:</strong> An MoR (such as Polar.sh) acts as
				the legal reseller, assuming all worldwide tax liabilities (EU VAT, US sales tax) so developers
				don't have to register across dozens of jurisdictions.
			</li>
			<li>
				<strong>Tiered Pro Paywalls:</strong> Protect premium server endpoints and client features with
				cryptographic session entitlements.
			</li>
			<li>
				<strong>Usage Metering:</strong> Bill consumers precisely for compute or API calls using Redis
				atomic counters synced to billing webhooks.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Monetisation Strategy Explorer" badge="Business Models">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
					{#each ['mor', 'stripe', 'paywall', 'tokens'] as const as m (m)}
						<button
							onclick={() => (selectedModel = m)}
							class="rounded-xl border p-2.5 text-center text-sm font-bold uppercase transition sm:text-sm {selectedModel ===
							m
								? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
								: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
						>
							{m}
						</button>
					{/each}
				</div>

				<div
					class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
				>
					<div>
						<h4 class="text-base font-bold text-slate-900 dark:text-white">
							{models[selectedModel].title}
						</h4>
						<p class="mt-0.5 text-sm font-bold text-indigo-600 dark:text-indigo-400">
							Provider: {models[selectedModel].provider}
						</p>
					</div>

					<div class="space-y-2 pt-1">
						<div>
							<span class="text-sm font-bold text-slate-500 uppercase"
								>Global Tax & VAT Handling:</span
							>
							<p class="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
								{models[selectedModel].taxHandling}
							</p>
						</div>
						<div>
							<span class="text-sm font-bold text-slate-500 uppercase">Payout & Revenue Flow:</span>
							<p class="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
								{models[selectedModel].payout}
							</p>
						</div>
					</div>

					<div class="border-t border-slate-200 pt-2 dark:border-slate-800">
						<span class="text-sm font-bold text-emerald-600 uppercase dark:text-emerald-400"
							>Best For:</span
						>
						<p class="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
							{models[selectedModel].bestFor}
						</p>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
