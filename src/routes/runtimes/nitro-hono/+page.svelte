<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type EngineType = 'nitro' | 'hono';
	let selectedEngine = $state<EngineType>('hono');

	let mockRouteParam = $state('usr_772');
	let mockHeader = $state('Bearer secret-token-xyz');

	let simulatedResponse = $derived(
		selectedEngine === 'hono'
			? {
					framework: 'Hono v4 (Ultrafast Edge)',
					path: `/api/v1/users/${mockRouteParam}`,
					status: 200,
					middleware: ['secureHeaders()', 'cors()', 'bearerAuth()'],
					body: {
						user: { id: mockRouteParam, role: 'developer' },
						region: 'iad1-edge-isolate',
						latency: '0.4ms'
					}
				}
			: {
					framework: 'UnJS Nitro (Universal Engine)',
					path: `/api/v1/users/${mockRouteParam}`,
					status: 200,
					preset: 'cloudflare-pages',
					storage: 'unstorage (redis driver)',
					body: {
						cached: true,
						user: { id: mockRouteParam, role: 'developer' },
						handler: 'server/api/users/[id].ts'
					}
				}
	);
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Universal Server Engines: Nitro & Hono</h3>
		<p class="text-base sm:text-lg">
			Modern full-stack architectures decouple web servers from rigid hosting environments using
			universal server runtimes like UnJS Nitro and lightweight frameworks like Hono.
		</p>
		<ul>
			<li>
				<strong>UnJS Nitro:</strong> The universal server engine powering Nuxt and standalone microservices
				with cross-runtime presets (Node, Cloudflare, Vercel, Netlify, Bun, Deno) and built-in storage
				drivers (unstorage).
			</li>
			<li>
				<strong>Hono:</strong> A lightweight (&lt;15KB), ultra-fast web framework engineered for Web Standards,
				edge compute isolates, typed RPC contracts, and zero-overhead routing.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Server Engine Architecture Simulator" badge="Universal Server APIs">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-3">
					<button
						onclick={() => (selectedEngine = 'hono')}
						class="rounded-xl border p-3 text-center text-base font-bold transition {selectedEngine ===
						'hono'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						Hono (Edge API & RPC)
					</button>
					<button
						onclick={() => (selectedEngine = 'nitro')}
						class="rounded-xl border p-3 text-center text-base font-bold transition {selectedEngine ===
						'nitro'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						UnJS Nitro (Universal Engine)
					</button>
				</div>

				<div class="grid grid-cols-2 gap-3">
					<label class="block space-y-1">
						<span class="text-sm font-bold text-slate-500 uppercase">Route Param (:id):</span>
						<input
							type="text"
							bind:value={mockRouteParam}
							class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
						/>
					</label>
					<label class="block space-y-1">
						<span class="text-sm font-bold text-slate-500 uppercase">Auth Header:</span>
						<input
							type="text"
							bind:value={mockHeader}
							class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
						/>
					</label>
				</div>

				<div
					class="space-y-2 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-slate-100 dark:border-slate-800"
				>
					<div
						class="flex items-center justify-between border-b border-slate-800 pb-2 text-sm text-slate-500 dark:text-slate-400"
					>
						<span>Response Status: {simulatedResponse.status} OK</span>
						<span class="text-indigo-400">{simulatedResponse.framework}</span>
					</div>
					<pre class="overflow-x-auto text-sm text-emerald-400">{JSON.stringify(
							simulatedResponse,
							null,
							2
						)}</pre>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
