<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let exportKey = $state<'root' | 'subpath' | 'theme'>('root');

	const exportMappings = {
		root: {
			entry: '.',
			types: './dist/index.d.ts',
			import: './dist/index.js',
			description: 'Main library bundle exporting runes components and utilities.'
		},
		subpath: {
			entry: './server',
			types: './dist/server/index.d.ts',
			import: './dist/server/index.js',
			description: 'Server-only subpath export preventing client leak.'
		},
		theme: {
			entry: './theme.css',
			import: './dist/theme.css',
			types: 'N/A (CSS)',
			description: 'Raw pre-compiled CSS styling tokens.'
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Vite 6 Architecture & Library Packaging</h3>
		<p class="text-base sm:text-lg">
			Modern frontend libraries use modern packaging standards including conditional <code
				>exports</code
			>, TypeScript declaration bundling, and Vite 6's optimised build pipeline.
		</p>
		<ul>
			<li>
				<strong>Vite 6 & Rolldown:</strong> Delivers lightning-fast Hot Module Replacement (HMR) and optimised
				multi-target build outputs.
			</li>
			<li>
				<strong><code>svelte-package</code> & <code>unbuild</code>:</strong> Compiles Svelte runes
				components, processes TypeScript definitions (<code>.d.ts</code>), and produces standard ESM
				artifacts.
			</li>
			<li>
				<strong>Conditional <code>package.json</code> <code>exports</code>:</strong> Enforces explicit
				public API boundaries, preventing consumers from importing internal unexported modules.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="package.json Conditional Exports Resolver" badge="Subpath Exports">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-3 gap-2">
					<button
						onclick={() => (exportKey = 'root')}
						class="rounded-xl border p-2.5 text-center text-sm font-bold transition {exportKey ===
						'root'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						"." (Root)
					</button>
					<button
						onclick={() => (exportKey = 'subpath')}
						class="rounded-xl border p-2.5 text-center text-sm font-bold transition {exportKey ===
						'subpath'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						"./server"
					</button>
					<button
						onclick={() => (exportKey = 'theme')}
						class="rounded-xl border p-2.5 text-center text-sm font-bold transition {exportKey ===
						'theme'
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						"./theme.css"
					</button>
				</div>

				<div
					class="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
				>
					<div class="flex items-center justify-between">
						<span class="text-slate-500">Target Export:</span>
						<span class="text-base font-bold text-indigo-600 dark:text-indigo-400"
							>{exportMappings[exportKey].entry}</span
						>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-slate-500">TypeScript Types:</span>
						<span class="text-sm font-semibold text-slate-800 dark:text-slate-200"
							>{exportMappings[exportKey].types}</span
						>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-slate-500">ESM Bundle:</span>
						<span class="text-sm font-semibold text-slate-800 dark:text-slate-200"
							>{exportMappings[exportKey].import}</span
						>
					</div>
					<p
						class="border-t border-slate-200 pt-2 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400"
					>
						{exportMappings[exportKey].description}
					</p>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
