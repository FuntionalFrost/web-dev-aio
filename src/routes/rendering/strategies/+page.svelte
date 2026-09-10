<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type StrategyKey = 'ssg' | 'ssr' | 'hybrid' | 'csr';
	let selectedStrategy = $state<StrategyKey>('ssg');

	const comparisonData: Record<
		StrategyKey,
		{
			title: string;
			ttfb: string;
			fcp: string;
			seoRating: string;
			hostingCost: string;
			bestFor: string;
			description: string;
		}
	> = {
		ssg: {
			title: 'Static Site Generation (SSG / Prerendering)',
			ttfb: '10 - 25ms (Edge CDN Cache)',
			fcp: '80 - 150ms',
			seoRating: 'Perfect (100% pre-rendered HTML)',
			hostingCost: '$0 (Zero compute, static object storage)',
			bestFor: 'Documentation, blogs, marketing portals, ecommerce catalog shells',
			description: 'HTML is rendered once during build time and distributed globally across edge CDN caches.'
		},
		ssr: {
			title: 'Server-Side Rendering (SSR)',
			ttfb: '120 - 350ms (Dynamic compute)',
			fcp: '280 - 450ms',
			seoRating: 'Excellent (Fresh dynamic server HTML)',
			hostingCost: 'Standard Serverless / Node compute charges',
			bestFor: 'Personalized user dashboards, authenticated views, dynamic live feeds',
			description: 'HTML is synthesized dynamically on every incoming request on the server runtime.'
		},
		hybrid: {
			title: 'Hybrid / Incremental Static Regeneration (ISR)',
			ttfb: '20 - 60ms (Stale-While-Revalidate)',
			fcp: '140 - 220ms',
			seoRating: 'Excellent',
			hostingCost: 'Minimal on-demand revalidation compute',
			bestFor: 'High-traffic content hubs with periodic cache invalidation',
			description: 'Static CDN caching with automated background revalidation on interval or webhook trigger.'
		},
		csr: {
			title: 'Client-Side Rendering (CSR / SPA)',
			ttfb: '15 - 30ms (Static empty HTML shell)',
			fcp: '600 - 1200ms (Waits for client JS bundle download)',
			seoRating: 'Requires search bot JavaScript execution',
			hostingCost: '$0 static hosting',
			bestFor: 'Internal enterprise backoffices, heavy offline SaaS tools',
			description: 'Browser downloads a blank shell and executes JavaScript to render the entire UI in-memory.'
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Rendering Strategies: SSG, SSR, Hybrid & CSR</h3>
		<p class="text-base sm:text-lg">
			Selecting the appropriate rendering model balances Time to First Byte (TTFB), First Contentful Paint (FCP), SEO indexability, and cloud infrastructure expenditure.
		</p>
		<ul>
			<li>
				<strong>SSG (Static Site Generation):</strong> Pre-renders HTML at build time for instant CDN delivery and zero server compute overhead.
			</li>
			<li>
				<strong>SSR (Server-Side Rendering):</strong> Renders fresh dynamic HTML on every request for personalized, real-time data.
			</li>
			<li>
				<strong>Hybrid / ISR:</strong> Combines static caching with background regeneration triggers.
			</li>
			<li>
				<strong>CSR (Client-Side Rendering):</strong> Offloads rendering entirely to the browser for thick, offline-capable applications.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Rendering Architecture Decision Matrix" badge="Rendering Tradeoffs">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
					{#each (['ssg', 'ssr', 'hybrid', 'csr'] as const) as key}
						<button
							onclick={() => (selectedStrategy = key)}
							class="rounded-xl border p-2.5 text-center font-bold text-xs sm:text-sm uppercase transition {selectedStrategy === key
								? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
								: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
						>
							{key}
						</button>
					{/each}
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 space-y-3">
					<div>
						<h4 class="text-base font-bold text-slate-900 dark:text-white">{comparisonData[selectedStrategy].title}</h4>
						<p class="text-sm text-slate-600 dark:text-slate-400 mt-1">{comparisonData[selectedStrategy].description}</p>
					</div>

					<div class="grid grid-cols-2 gap-3 pt-1">
						<div class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 dark:border-indigo-900 dark:bg-indigo-950/40">
							<span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">TTFB (Time to First Byte):</span>
							<p class="text-base font-bold text-slate-900 dark:text-white mt-0.5">{comparisonData[selectedStrategy].ttfb}</p>
						</div>
						<div class="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
							<span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">FCP (First Contentful Paint):</span>
							<p class="text-base font-bold text-slate-900 dark:text-white mt-0.5">{comparisonData[selectedStrategy].fcp}</p>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-3">
						<div>
							<span class="text-xs font-bold text-slate-500 uppercase">SEO Visibility:</span>
							<p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{comparisonData[selectedStrategy].seoRating}</p>
						</div>
						<div>
							<span class="text-xs font-bold text-slate-500 uppercase">Infrastructure Cost:</span>
							<p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{comparisonData[selectedStrategy].hostingCost}</p>
						</div>
					</div>

					<div class="pt-2 border-t border-slate-200 dark:border-slate-800">
						<span class="text-xs font-bold text-indigo-600 uppercase">Recommended Use Case:</span>
						<p class="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{comparisonData[selectedStrategy].bestFor}</p>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
