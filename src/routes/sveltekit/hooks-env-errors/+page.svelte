<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type EnvVariant = 'staticPrivate' | 'dynamicPrivate' | 'staticPublic' | 'dynamicPublic';
	let selectedEnv = $state<EnvVariant>('staticPrivate');

	const envSpecs: Record<
		EnvVariant,
		{ module: string; access: string; security: string; example: string }
	> = {
		staticPrivate: {
			module: '$env/static/private',
			access: 'Compile-time inlined (Server only)',
			security: 'Protected: Build fails if bundled into client code',
			example: 'DATABASE_URL=postgres://neon.tech/main'
		},
		dynamicPrivate: {
			module: '$env/dynamic/private',
			access: 'Runtime evaluation on server request (Server only)',
			security: 'Protected: Ideal for runtime secrets in Docker/Kubernetes',
			example: 'STRIPE_SECRET_KEY=sk_live_xyz...'
		},
		staticPublic: {
			module: '$env/static/public',
			access: 'Compile-time inlined across Client & Server (PUBLIC_*)',
			security: 'Safe: Public constants exposed to browser bundles',
			example: 'PUBLIC_ANALYTICS_ID=plausible_2026'
		},
		dynamicPublic: {
			module: '$env/dynamic/public',
			access: 'Runtime evaluation across Client & Server (PUBLIC_*)',
			security: 'Safe: Runtime configurable frontend endpoints',
			example: 'PUBLIC_API_URL=https://api.domain.com'
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Server Hooks, Error Handling & Environment Variables</h3>
		<p class="text-base sm:text-lg">
			SvelteKit provides strict boundaries for server middleware hooks, expected vs unexpected
			errors, and four isolated tiers of environment variable protection.
		</p>
		<ul>
			<li>
				<strong>Server Hooks (<code>hooks.server.ts</code>):</strong> Intercept incoming requests
				with <code>handle</code>, transform backend fetch requests with <code>handleFetch</code>,
				and log errors globally with <code>handleError</code>.
			</li>
			<li>
				<strong>Error Contract (<code>error()</code> vs <code>+error.svelte</code>):</strong> Throw
				typed errors using <code>error(404, &#123; message: 'Not Found' &#125;)</code> to render
				friendly user-facing <code>+error.svelte</code> layouts without leaking stack traces.
			</li>
			<li>
				<strong>Strict Environment Isolation:</strong> SvelteKit statically prevents private secrets
				(<code>$env/static/private</code>) from ever being imported into client-side code at compile
				time.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Environment Variable Security Matrix" badge="4-Tier Env Isolation">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
					<button
						onclick={() => (selectedEnv = 'staticPrivate')}
						class="rounded-xl border p-2.5 text-center text-sm font-bold transition sm:text-sm {selectedEnv ===
						'staticPrivate'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						Static Private
					</button>
					<button
						onclick={() => (selectedEnv = 'dynamicPrivate')}
						class="rounded-xl border p-2.5 text-center text-sm font-bold transition sm:text-sm {selectedEnv ===
						'dynamicPrivate'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						Dynamic Private
					</button>
					<button
						onclick={() => (selectedEnv = 'staticPublic')}
						class="rounded-xl border p-2.5 text-center text-sm font-bold transition sm:text-sm {selectedEnv ===
						'staticPublic'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						Static Public
					</button>
					<button
						onclick={() => (selectedEnv = 'dynamicPublic')}
						class="rounded-xl border p-2.5 text-center text-sm font-bold transition sm:text-sm {selectedEnv ===
						'dynamicPublic'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						Dynamic Public
					</button>
				</div>

				<div
					class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
				>
					<div
						class="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800"
					>
						<span class="text-sm font-bold text-slate-500 uppercase">Import Path:</span>
						<span class="text-base font-bold text-indigo-600 dark:text-indigo-400"
							>{envSpecs[selectedEnv].module}</span
						>
					</div>
					<div>
						<span class="text-sm font-bold text-slate-500 uppercase">Evaluation Strategy:</span>
						<p class="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
							{envSpecs[selectedEnv].access}
						</p>
					</div>
					<div>
						<span class="text-sm font-bold text-slate-500 uppercase">Security Boundary:</span>
						<p class="mt-0.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">
							{envSpecs[selectedEnv].security}
						</p>
					</div>
					<div class="rounded-xl bg-slate-900 p-3 font-mono text-sm text-slate-300">
						# Sample usage in .env:
						<div class="mt-1 text-sm font-bold text-emerald-400">
							{envSpecs[selectedEnv].example}
						</div>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
