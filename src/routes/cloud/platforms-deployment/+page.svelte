<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type PlatformKey = 'cloudflare' | 'vercel' | 'netlify';
	let selectedPlatform = $state<PlatformKey>('cloudflare');

	const platforms: Record<
		PlatformKey,
		{
			name: string;
			runtime: string;
			coldStart: string;
			egressCost: string;
			deploySvelteKit: string;
			deployNuxt: string;
			pros: string[];
		}
	> = {
		cloudflare: {
			name: 'Cloudflare Workers / Pages',
			runtime: 'V8 Edge Isolates (workerd)',
			coldStart: '0 - 5ms (Instant)',
			egressCost: 'Free ($0 / GB worldwide)',
			deploySvelteKit: '@sveltejs/adapter-cloudflare',
			deployNuxt: 'nitro.config.ts preset: "cloudflare-pages"',
			pros: [
				'Zero cold starts across 300+ global edge locations',
				'Included KV, D1 (SQLite), and R2 (S3-compatible storage)',
				'Extremely cost-effective for high-traffic APIs'
			]
		},
		vercel: {
			name: 'Vercel Serverless & Edge',
			runtime: 'AWS Lambda Node.js containers + Edge Functions',
			coldStart: '120 - 450ms (Serverless)',
			egressCost: 'Tiered bandwidth pricing',
			deploySvelteKit: '@sveltejs/adapter-vercel',
			deployNuxt: 'nitro.config.ts preset: "vercel"',
			pros: [
				'Seamless git integration with automatic preview branches',
				'First-class Incremental Static Regeneration (ISR)',
				'Integrated telemetry, speed insights, and analytics'
			]
		},
		netlify: {
			name: 'Netlify Edge & Core',
			runtime: 'Deno Edge + Node Serverless',
			coldStart: '20 - 100ms',
			egressCost: 'Standard CDN bandwidth tiers',
			deploySvelteKit: '@sveltejs/adapter-netlify',
			deployNuxt: 'nitro.config.ts preset: "netlify"',
			pros: [
				'Powerful edge middleware and dynamic rewrites',
				'Branch deploys and split testing out of the box',
				'Form capture and identity services'
			]
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Cloud Platforms: Cloudflare Workers, Vercel & Netlify</h3>
		<p class="text-base sm:text-lg">
			Comparing cloud deployment architectures for Nuxt and SvelteKit applications across V8 Edge Isolates and containerized Serverless Functions.
		</p>
		<ul>
			<li>
				<strong>V8 Isolates vs Containerized Node:</strong> Cloudflare Workers spin up in 0–5ms by sharing a single V8 runtime process, whereas standard Node lambdas incur container cold starts.
			</li>
			<li>
				<strong>Bandwidth & Egress Optimization:</strong> Evaluating egress fees and static asset caching policies across platforms.
			</li>
			<li>
				<strong>Framework Adapter Topologies:</strong> Deploying universal SvelteKit and Nuxt Nitro applications with zero application code changes.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Cloud Platform Deployment Matrix" badge="Platform Profiles">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-3 gap-2">
					{#each (['cloudflare', 'vercel', 'netlify'] as const) as pk}
						<button
							onclick={() => (selectedPlatform = pk)}
							class="rounded-xl border p-2.5 text-center font-bold text-sm transition {selectedPlatform === pk
								? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
								: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
						>
							{platforms[pk].name.split(' ')[0]}
						</button>
					{/each}
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 space-y-3">
					<div>
						<h4 class="text-base font-bold text-slate-900 dark:text-white">{platforms[selectedPlatform].name}</h4>
						<p class="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Runtime: {platforms[selectedPlatform].runtime}</p>
					</div>

					<div class="grid grid-cols-2 gap-3 pt-1">
						<div class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 dark:border-indigo-900 dark:bg-indigo-950/40">
							<span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Cold Start Latency:</span>
							<p class="text-base font-bold text-slate-900 dark:text-white mt-0.5">{platforms[selectedPlatform].coldStart}</p>
						</div>
						<div class="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
							<span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Bandwidth / Egress:</span>
							<p class="text-base font-bold text-slate-900 dark:text-white mt-0.5">{platforms[selectedPlatform].egressCost}</p>
						</div>
					</div>

					<div class="space-y-1.5 text-xs">
						<div class="flex items-center justify-between">
							<span class="text-slate-500 font-bold">SvelteKit Config:</span>
							<span class="font-bold text-indigo-600 dark:text-indigo-400">{platforms[selectedPlatform].deploySvelteKit}</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-slate-500 font-bold">Nuxt Nitro Preset:</span>
							<span class="font-bold text-emerald-600 dark:text-emerald-400">{platforms[selectedPlatform].deployNuxt}</span>
						</div>
					</div>

					<div class="pt-2 border-t border-slate-200 dark:border-slate-800">
						<span class="text-xs font-bold text-slate-500 uppercase">Key Strengths:</span>
						<ul class="mt-1 space-y-1 text-sm text-slate-700 dark:text-slate-300">
							{#each platforms[selectedPlatform].pros as pro}
								<li>• {pro}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
