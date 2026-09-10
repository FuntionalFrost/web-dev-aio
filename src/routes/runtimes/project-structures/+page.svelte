<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type StructureType = 'sveltekit' | 'nuxt4' | 'monorepo';
	let selectedType = $state<StructureType>('sveltekit');

	const topologies: Record<StructureType, { title: string; desc: string; tree: string[] }> = {
		sveltekit: {
			title: 'SvelteKit 2 Production Architecture',
			desc: 'Strict client/server separation with Universal Runes, +page server data pipelines, and hooks.',
			tree: [
				'src/',
				' ├── lib/',
				' │    ├── components/       <- UI Runes components',
				' │    ├── server/           <- Server-only ($lib/server, secret DB handles)',
				' │    └── state/            <- Shared .svelte.ts Runes reactive stores',
				' ├── routes/               <- File-based directory routing',
				' │    ├── +layout.svelte    <- Root layout shell',
				' │    ├── +layout.ts        <- Universal layout load',
				' │    ├── +page.svelte      <- Page view',
				' │    ├── +page.server.ts   <- Server load & form actions',
				' │    └── +error.svelte     <- Expected & unexpected error UI',
				' ├── app.html              <- Base HTML template',
				' └── hooks.server.ts       <- Global auth, headers & request interception'
			]
		},
		nuxt4: {
			title: 'Nuxt 4 Forward-Compatible app/ Architecture',
			desc: 'Clean separation with dedicated app/ directory, auto-imported composables, and Nitro server backend.',
			tree: [
				'app/',
				' ├── components/           <- Auto-imported Vue components',
				' ├── composables/          <- Auto-imported useX() reactive composables',
				' ├── layouts/              <- Dynamic page layouts',
				' ├── pages/                <- File-based router views',
				' └── app.vue               <- Main application entry component',
				'server/',
				' ├── api/                  <- Nitro API endpoints (server/api/v1/...)',
				' ├── middleware/           <- Server request middleware',
				' └── plugins/              <- Nitro lifecycle hooks & storage drivers',
				'nuxt.config.ts             <- Nuxt 4 configuration'
			]
		},
		monorepo: {
			title: 'PNPM Enterprise Monorepo Workspace',
			desc: 'Shared multi-package workspace with catalog dependency versioning and reusable UI packages.',
			tree: [
				'apps/',
				' ├── web/                  <- SvelteKit / Nuxt user-facing frontend',
				' └── api/                  <- Hono / Nitro microservice backend',
				'packages/',
				' ├── ui/                   <- Shared Tailwind v4 design system components',
				' ├── config/               <- Shared TypeScript & ESLint configs',
				' └── database/             <- Drizzle ORM schema and migrations',
				'pnpm-workspace.yaml        <- Workspace package declarations & catalog:',
				'.github/workflows/ci.yml   <- Matrix CI testing pipeline'
			]
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Modern Project Types & Directory Structures</h3>
		<p class="text-base sm:text-lg">
			Choosing the right project topology is fundamental to long-term maintainability, code reuse,
			and team velocity.
		</p>
		<ul>
			<li>
				<strong>SvelteKit 2 Layout:</strong> Enforces strong server-side isolation with
				<code>$lib/server</code>
				and deterministic page routing with <code>+page.server.ts</code> and
				<code>hooks.server.ts</code>.
			</li>
			<li>
				<strong>Nuxt 4 Structure:</strong> Centralises frontend components and composables in
				<code>app/</code>
				while isolating backend endpoints in <code>server/api/</code>.
			</li>
			<li>
				<strong>Monorepo Topologies:</strong> Organises large teams into decoupled
				<code>apps/</code>
				and reusable internal <code>packages/</code> linked via PNPM workspace catalogs.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Project Directory Explorer" badge="Topologies">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-3 gap-2">
					<button
						onclick={() => (selectedType = 'sveltekit')}
						class="rounded-xl border p-2.5 text-center text-sm font-bold transition {selectedType ===
						'sveltekit'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						SvelteKit 2
					</button>
					<button
						onclick={() => (selectedType = 'nuxt4')}
						class="rounded-xl border p-2.5 text-center text-sm font-bold transition {selectedType ===
						'nuxt4'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						Nuxt 4 app/
					</button>
					<button
						onclick={() => (selectedType = 'monorepo')}
						class="rounded-xl border p-2.5 text-center text-sm font-bold transition {selectedType ===
						'monorepo'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						PNPM Monorepo
					</button>
				</div>

				<div
					class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
				>
					<div>
						<h4 class="text-base font-bold text-slate-900 dark:text-white">
							{topologies[selectedType].title}
						</h4>
						<p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
							{topologies[selectedType].desc}
						</p>
					</div>

					<div class="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100">
						{#each topologies[selectedType].tree as line (line)}
							<div class="font-mono text-sm leading-relaxed text-indigo-300">{line}</div>
						{/each}
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
