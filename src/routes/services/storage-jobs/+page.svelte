<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Presigned Upload Simulator State
	let uploadFileName = $state('dataset-2026-v1.tar.gz');
	let uploadProgress = $state(0);
	let isUploading = $state(false);

	// Inngest Multi-Step Workflow State
	type WorkflowStep = { name: string; status: 'idle' | 'running' | 'done' };
	let workflowSteps = $state<WorkflowStep[]>([
		{ name: '1. Validate R2 Checksum', status: 'idle' },
		{ name: '2. Generate Derivatives', status: 'idle' },
		{ name: '3. Sync Vector Index', status: 'idle' }
	]);

	function startDirectUpload() {
		isUploading = true;
		uploadProgress = 0;
		workflowSteps = workflowSteps.map((s) => ({ ...s, status: 'idle' }));

		const interval = setInterval(() => {
			uploadProgress += 25;
			if (uploadProgress >= 100) {
				clearInterval(interval);
				isUploading = false;
				triggerInngestWorkflow();
			}
		}, 200);
	}

	function triggerInngestWorkflow() {
		workflowSteps[0].status = 'running';
		setTimeout(() => {
			workflowSteps[0].status = 'done';
			workflowSteps[1].status = 'running';
			setTimeout(() => {
				workflowSteps[1].status = 'done';
				workflowSteps[2].status = 'running';
				setTimeout(() => {
					workflowSteps[2].status = 'done';
				}, 500);
			}, 500);
		}, 500);
	}
</script>

<LabShell
	moduleId="services-storage-jobs"
	title={data.meta.title}
	description={data.meta.description}
>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock
				codeHtml={data.codeHtml}
				rawCode={data.rawCode}
				filename="storage-and-inngest.ts"
			/>
		</div>

		<h3>Core Architectural Concepts</h3>
		<ul>
			<li>
				<strong>Presigned URL Pattern:</strong> The server issues a cryptographically signed
				temporary URL. The browser executes a direct <code>PUT</code> request to Cloudflare R2 / S3, keeping
				serverless functions lightweight.
			</li>
			<li>
				<strong>Durable Step Functions (Inngest):</strong> Each <code>step.run()</code> boundary serializes
				state and automatically retries upon failure without rerunning previously completed steps.
			</li>
		</ul>
	{/snippet}

	{#snippet sandbox()}
		<div
			class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
		>
			<div
				class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
			>
				<span
					class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
				>
					Direct Presigned S3/R2 Upload Lab
				</span>
				<span class="font-mono text-[10px] text-slate-500">Zero Serverless Proxy</span>
			</div>

			<div class="space-y-3 font-mono text-xs">
				<label for="filename" class="block text-slate-600 dark:text-slate-400"
					>Object Key Name:</label
				>
				<div class="flex gap-2">
					<input
						id="filename"
						type="text"
						bind:value={uploadFileName}
						class="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					/>
					<button
						onclick={startDirectUpload}
						disabled={isUploading}
						class="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-40"
					>
						{isUploading ? 'Uploading to R2...' : 'Execute Direct PUT'}
					</button>
				</div>
			</div>

			<!-- Upload Progress Bar -->
			<div class="space-y-1.5 font-mono text-xs">
				<div class="flex justify-between text-slate-500">
					<span>Client-to-R2 Progress:</span>
					<span class="font-bold text-slate-900 dark:text-white">{uploadProgress}%</span>
				</div>
				<div class="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
					<div
						class="h-full bg-emerald-500 transition-all duration-200"
						style="width: {uploadProgress}%"
					></div>
				</div>
			</div>

			<!-- Inngest Workflow Execution Steps -->
			<div
				class="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-[11px] tracking-wider text-slate-400 uppercase"
					>Inngest Durable Workflow Steps:</span
				>
				<div class="space-y-2">
					{#each workflowSteps as step, i (i)}
						<div
							class="flex items-center justify-between rounded-lg border p-2.5 transition {step.status ===
							'done'
								? 'border-emerald-500/40 bg-emerald-50/50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300'
								: step.status === 'running'
									? 'animate-pulse border-amber-500/40 bg-amber-50/50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-300'
									: 'border-slate-200 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-900'}"
						>
							<span>{step.name}</span>
							<span class="text-[10px] font-bold uppercase">{step.status}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/snippet}
</LabShell>
