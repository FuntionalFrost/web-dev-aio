<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type RoutePattern = 'dynamic' | 'catchAll' | 'group' | 'reset';
	let selectedPattern = $state<RoutePattern>('dynamic');

	const routeExplorations: Record<
		RoutePattern,
		{ title: string; folder: string; resolvesTo: string; explanation: string }
	> = {
		dynamic: {
			title: 'Dynamic Parameter Route',
			folder: 'src/routes/users/[userId]/+page.svelte',
			resolvesTo: '/users/usr_2026',
			explanation: 'Extracts params.userId in load function with full TypeScript type safety.'
		},
		catchAll: {
			title: 'Catch-All Rest Parameter',
			folder: 'src/routes/docs/[...slug]/+page.svelte',
			resolvesTo: '/docs/architecture/state/runes',
			explanation: 'Captures arbitrary slash-separated hierarchy into params.slug as a string.'
		},
		group: {
			title: 'Route Group (No URL Segment)',
			folder: 'src/routes/(app)/dashboard/+page.svelte',
			resolvesTo: '/dashboard',
			explanation: 'Groups pages to share a distinct layout without affecting the public URL pathname.'
		},
		reset: {
			title: 'Layout Inheritance Reset',
			folder: 'src/routes/admin/+page@.svelte',
			resolvesTo: '/admin',
			explanation: 'The @ suffix resets layout inheritance back to root or a specified ancestor layout.'
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>SvelteKit Routing, Layouts & Page Options</h3>
		<p class="text-base sm:text-lg">
			SvelteKit's file-system router handles complex routing hierarchies with zero-configuration directory conventions and granular page options.
		</p>
		<ul>
			<li>
				<strong>Dynamic & Catch-all Parameters:</strong> <code>[param]</code> matches single path segments; <code>[...rest]</code> matches multiple deep segments.
			</li>
			<li>
				<strong>Route Groups <code>(group)</code>:</strong> Organize code and layout boundaries without adding segments to the browser URL.
			</li>
			<li>
				<strong>Layout Resets (<code>+layout@</code>):</strong> Escape nested layout hierarchies for standalone dashboards or login screens.
			</li>
			<li>
				<strong>Page Options:</strong> Configure <code>export const prerender = true</code>, <code>export const ssr = false</code>, or <code>export const csr = true</code> per individual route.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="SvelteKit Routing Pattern Visualizer" badge="File-Based Router">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
					{#each (['dynamic', 'catchAll', 'group', 'reset'] as const) as p}
						<button
							onclick={() => (selectedPattern = p)}
							class="rounded-xl border p-2.5 text-center font-bold text-sm transition {selectedPattern === p
								? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
								: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
						>
							{routeExplorations[p].title.split(' ')[0]}
						</button>
					{/each}
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 space-y-3">
					<div>
						<h4 class="text-base font-bold text-slate-900 dark:text-white">{routeExplorations[selectedPattern].title}</h4>
						<p class="text-sm text-slate-600 dark:text-slate-400 mt-1">{routeExplorations[selectedPattern].explanation}</p>
					</div>

					<div class="rounded-xl bg-slate-900 p-4 text-slate-100 space-y-2">
						<div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-1.5">
							<span>File Path:</span>
							<span class="text-indigo-400">{routeExplorations[selectedPattern].folder}</span>
						</div>
						<div class="flex items-center justify-between text-xs text-slate-400 pt-1">
							<span>Browser URL:</span>
							<span class="text-emerald-400 font-bold">{routeExplorations[selectedPattern].resolvesTo}</span>
						</div>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
