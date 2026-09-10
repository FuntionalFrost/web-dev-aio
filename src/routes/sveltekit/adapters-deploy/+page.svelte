<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type AdapterType = 'static' | 'cloudflare' | 'node' | 'vercel' | 'auto';
	let selectedAdapter = $state<AdapterType>('static');

	const adapterSpecs: Record<
		AdapterType,
		{ package: string; output: string; idealFor: string; configSample: string }
	> = {
		static: {
			package: '@sveltejs/adapter-static',
			output: '100% Pre-compressed HTML, CSS, JS and static asset files',
			idealFor: 'Cloudflare Pages, GitHub Pages, AWS S3 / CloudFront, Documentation portals',
			configSample: "import adapter from '@sveltejs/adapter-static';\nexport default { kit: { adapter: adapter({ fallback: '404.html' }) } };"
		},
		cloudflare: {
			package: '@sveltejs/adapter-cloudflare',
			output: 'Cloudflare Workers V8 Edge Isolates + Pages static asset assets',
			idealFor: 'Low-latency global edge APIs, streaming SSR, zero cold-start deployments',
			configSample: "import adapter from '@sveltejs/adapter-cloudflare';\nexport default { kit: { adapter: adapter({ routes: { include: ['/*'] } }) } };"
		},
		node: {
			package: '@sveltejs/adapter-node',
			output: 'Standalone Node.js HTTP server (build/index.js)',
			idealFor: 'Docker containers, AWS ECS / Fargate, Fly.io, Railway, Kubernetes',
			configSample: "import adapter from '@sveltejs/adapter-node';\nexport default { kit: { adapter: adapter({ out: 'build' }) } };"
		},
		vercel: {
			package: '@sveltejs/adapter-vercel',
			output: 'Vercel Serverless Functions + Edge Functions + Static CDN',
			idealFor: 'Vercel platform features (Incremental Static Regeneration ISR, analytics, previews)',
			configSample: "import adapter from '@sveltejs/adapter-vercel';\nexport default { kit: { adapter: adapter({ isr: { expiration: 60 } }) } };"
		},
		auto: {
			package: '@sveltejs/adapter-auto',
			output: 'Automatically detects CI/CD deployment environment (Vercel, Cloudflare, Netlify)',
			idealFor: 'Rapid prototyping and starter templates across multiple cloud hosts',
			configSample: "import adapter from '@sveltejs/adapter-auto';\nexport default { kit: { adapter: adapter() } };"
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>SvelteKit Adapters & Production Deployment</h3>
		<p class="text-base sm:text-lg">
			SvelteKit's adapter architecture compiles your universal codebase for any deployment target without changing application source code.
		</p>
		<ul>
			<li>
				<strong><code>@sveltejs/adapter-static</code>:</strong> Pre-renders entire static sites for zero-server CDN hosting with zero compute runtime costs.
			</li>
			<li>
				<strong><code>@sveltejs/adapter-cloudflare</code>:</strong> Compiles dynamic server routes into high-performance Cloudflare V8 Edge Isolates.
			</li>
			<li>
				<strong><code>@sveltejs/adapter-node</code>:</strong> Produces a standalone Node.js server containerized easily with Docker.
			</li>
			<li>
				<strong><code>@sveltejs/adapter-vercel</code>:</strong> Automatically maps server routes to Vercel Serverless/Edge functions with ISR support.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="SvelteKit Adapter Selector & Config Generator" badge="Adapter Topologies">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
					{#each (['static', 'cloudflare', 'node', 'vercel', 'auto'] as const) as ad}
						<button
							onclick={() => (selectedAdapter = ad)}
							class="rounded-xl border p-2.5 text-center font-bold text-sm transition {selectedAdapter === ad
								? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
								: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
						>
							{ad.toUpperCase()}
						</button>
					{/each}
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 space-y-3">
					<div>
						<span class="text-xs text-slate-500 uppercase font-bold">NPM Package:</span>
						<p class="text-base font-bold text-indigo-600 dark:text-indigo-400">{adapterSpecs[selectedAdapter].package}</p>
					</div>
					<div>
						<span class="text-xs text-slate-500 uppercase font-bold">Build Output:</span>
						<p class="text-sm font-semibold text-slate-900 dark:text-white">{adapterSpecs[selectedAdapter].output}</p>
					</div>
					<div>
						<span class="text-xs text-slate-500 uppercase font-bold">Ideal Deployment Target:</span>
						<p class="text-sm text-slate-700 dark:text-slate-300">{adapterSpecs[selectedAdapter].idealFor}</p>
					</div>

					<div class="rounded-xl bg-slate-900 p-3.5 text-xs text-slate-300 overflow-x-auto">
						<span class="text-slate-500 block mb-1 font-bold">svelte.config.js snippet:</span>
						<pre class="text-emerald-400 font-mono text-xs sm:text-sm">{adapterSpecs[selectedAdapter].configSample}</pre>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
