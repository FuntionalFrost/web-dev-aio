<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let pageTitle = $state('Web Engine 2026: Reference Architecture');
	let pageDesc = $state(
		'Explore 35 production-grade engineering modules covering modern full-stack web standards.'
	);
	let pagePath = $state('https://web-engine26.pages.dev');

	let simulatedPageViews = $state(1420);
	let simulatedBounceRate = $state('22.4%');
	let simulatedAvgDuration = $state('3m 48s');
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>SEO, Metadata & Privacy-First Web Analytics</h3>
		<p class="text-base sm:text-lg">
			Optimizing discovery across search engine crawlers and social share cards while collecting
			privacy-respecting, cookieless telemetry.
		</p>
		<ul>
			<li>
				<strong>Structured SEO Meta:</strong> Configure Open Graph (OG), Twitter Card, and JSON-LD schema
				tags to maximize social preview click-through rates.
			</li>
			<li>
				<strong>Privacy-Friendly Analytics (Plausible, Umami, Cloudflare Web Analytics):</strong> Track
				core traffic metrics without intrusive cookie consent banners or GDPR tracking violations.
			</li>
			<li>
				<strong>Core Web Vitals Telemetry:</strong> Monitor Largest Contentful Paint (LCP), Interaction
				to Next Paint (INP), and Cumulative Layout Shift (CLS) directly via navigator.sendBeacon.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Open Graph Social Preview Visualizer" badge="SEO Card Preview">
			<div class="space-y-4 font-mono text-sm">
				<div class="space-y-2">
					<label class="block">
						<span class="text-sm font-bold text-slate-500 uppercase">Page Title:</span>
						<input
							type="text"
							bind:value={pageTitle}
							class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
						/>
					</label>
					<label class="block">
						<span class="text-sm font-bold text-slate-500 uppercase">Meta Description:</span>
						<textarea
							rows="2"
							bind:value={pageDesc}
							class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
						></textarea>
					</label>
				</div>

				<!-- Social Card Mockup -->
				<div
					class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900"
				>
					<div
						class="flex h-32 items-center justify-center bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 font-mono text-lg font-bold text-white"
					>
						1200 x 630 Open Graph Banner
					</div>
					<div class="space-y-1 p-4">
						<span class="font-mono text-sm text-slate-500 uppercase dark:text-slate-400"
							>{pagePath}</span
						>
						<h4 class="font-sans text-base font-bold text-slate-900 dark:text-white">
							{pageTitle}
						</h4>
						<p class="line-clamp-2 font-sans text-sm text-slate-600 dark:text-slate-400">
							{pageDesc}
						</p>
					</div>
				</div>
			</div>
		</LabCard>

		<LabCard title="Privacy-First Telemetry Dashboard" badge="Cookieless Analytics">
			<div class="grid grid-cols-3 gap-3 font-mono text-sm">
				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="text-sm font-bold text-slate-400 uppercase">Pageviews</span>
					<p class="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
						{simulatedPageViews}
					</p>
				</div>
				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="text-sm font-bold text-slate-400 uppercase">Bounce Rate</span>
					<p class="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
						{simulatedBounceRate}
					</p>
				</div>
				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="text-sm font-bold text-slate-400 uppercase">Avg Visit Time</span>
					<p class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
						{simulatedAvgDuration}
					</p>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
