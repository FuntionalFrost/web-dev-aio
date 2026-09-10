<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let simulatedCiStatus = $state<'idle' | 'running' | 'success'>('idle');
	let completedSteps = $state<string[]>([]);

	async function triggerCiPipeline() {
		simulatedCiStatus = 'running';
		completedSteps = [];

		const steps = [
			'✓ Checkout Repository (actions/checkout@v4)',
			'✓ Setup PNPM with cache (pnpm/action-setup@v4)',
			'✓ Setup Node.js 24 LTS (actions/setup-node@v4)',
			'✓ Install Dependencies: pnpm install --frozen-lockfile (1.2s)',
			'✓ Type Check: pnpm check (0 errors)',
			'✓ Lint & Format: prettier & eslint (passed)',
			'✓ Build & Static Prerender: pnpm build (100% pre-compressed static assets)'
		];

		for (const step of steps) {
			await new Promise((r) => setTimeout(r, 250));
			completedSteps = [...completedSteps, step];
		}
		simulatedCiStatus = 'success';
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>PNPM Workspaces & CI/CD Pipelines</h3>
		<p class="text-base sm:text-lg">
			PNPM workspaces combined with GitHub Actions provide deterministic, lightning-fast dependency
			resolution and CI quality gates.
		</p>
		<ul>
			<li>
				<strong>The <code>catalog:</code> Protocol:</strong> Centralizes dependency versioning in
				<code>pnpm-workspace.yaml</code>, preventing version mismatches across multiple packages in
				a monorepo.
			</li>
			<li>
				<strong>Strict Frozen Lockfiles:</strong> Enforce
				<code>pnpm install --frozen-lockfile</code> in CI to guarantee that local build environments match
				automated deployment servers bit-for-bit.
			</li>
			<li>
				<strong>Matrix CI Testing:</strong> Execute automated type checking, linting, unit testing, and
				static builds concurrently across multiple Node versions and OS platforms.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Automated GitHub Actions CI Matrix Simulator" badge="ci.yml Runner">
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<p class="text-base text-slate-600 dark:text-slate-300">
						Simulate a commit trigger on main branch:
					</p>
					<button
						onclick={triggerCiPipeline}
						disabled={simulatedCiStatus === 'running'}
						class="rounded-xl bg-indigo-600 px-5 py-2.5 text-base font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-50"
					>
						{simulatedCiStatus === 'running' ? 'Executing CI Steps...' : 'Dispatch CI Workflow'}
					</button>
				</div>

				<div
					class="space-y-2 rounded-2xl border border-slate-200 bg-slate-950 p-5 font-mono text-sm text-slate-100 dark:border-slate-800"
				>
					<div
						class="flex items-center justify-between border-b border-slate-800 pb-2 text-sm text-slate-500 uppercase dark:text-slate-400"
					>
						<span>Workflow: CI & Quality Gate Matrix (Node 22, 24)</span>
						<span
							class={simulatedCiStatus === 'success'
								? 'font-bold text-emerald-400'
								: simulatedCiStatus === 'running'
									? 'animate-pulse text-amber-400'
									: 'text-slate-500'}
						>
							{simulatedCiStatus.toUpperCase()}
						</span>
					</div>

					<div class="mt-3 space-y-1.5">
						{#each completedSteps as step (step)}
							<div class="text-emerald-400">{step}</div>
						{:else}
							<div class="text-slate-500">
								Ready to dispatch. Press button above to run pipeline.
							</div>
						{/each}
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
