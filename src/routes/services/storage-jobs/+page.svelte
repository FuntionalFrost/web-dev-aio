<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// 1. Presigned Upload Flow Simulator
	type UploadStep = 'idle' | 'requesting_url' | 'uploading' | 'verifying' | 'complete' | 'error';
	let uploadStep = $state<UploadStep>('idle');
	let uploadProgress = $state(0);
	let presignedUrl = $state('');
	let selectedFile = $state('profile-photo.jpg');

	const fileOptions = [
		{ name: 'profile-photo.jpg', type: 'image/jpeg', size: '2.4 MB' },
		{ name: 'report-2026.pdf', type: 'application/pdf', size: '840 KB' },
		{ name: 'backup-data.csv', type: 'text/csv', size: '18.2 MB' }
	];

	let selectedFileInfo = $derived(
		fileOptions.find((f) => f.name === selectedFile) ?? fileOptions[0]
	);

	function startUpload() {
		if (uploadStep !== 'idle' && uploadStep !== 'complete' && uploadStep !== 'error') return;
		uploadStep = 'requesting_url';
		uploadProgress = 0;
		presignedUrl = '';

		// Step 1: Request presigned URL from server
		setTimeout(() => {
			const key = `uploads/${Date.now()}-${selectedFile}`;
			presignedUrl = `https://user-assets.r2.cloudflarestorage.com/${key}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Expires=300&...`;
			uploadStep = 'uploading';

			// Step 2: Simulate direct PUT to R2/S3 with progress
			const interval = setInterval(() => {
				uploadProgress = Math.min(100, uploadProgress + Math.floor(8 + Math.random() * 12));
				if (uploadProgress >= 100) {
					clearInterval(interval);
					uploadProgress = 100;
					uploadStep = 'verifying';

					// Step 3: Trigger post-upload verification
					setTimeout(() => {
						uploadStep = 'complete';
					}, 600);
				}
			}, 120);
		}, 600);
	}

	function resetUpload() {
		uploadStep = 'idle';
		uploadProgress = 0;
		presignedUrl = '';
	}

	const uploadStepLabels: Record<UploadStep, string> = {
		idle: 'Ready',
		requesting_url: 'Requesting presigned URL…',
		uploading: 'PUT directly to R2…',
		verifying: 'Verifying upload integrity…',
		complete: 'Upload complete ✓',
		error: 'Upload failed ✗'
	};

	// 2. Inngest Durable Job Tracker
	type JobStatus = 'pending' | 'running' | 'done' | 'failed';
	interface InngestStep {
		id: string;
		label: string;
		detail: string;
		status: JobStatus;
	}

	let jobRunning = $state(false);
	let jobComplete = $state(false);
	let inngestSteps = $state<InngestStep[]>([
		{
			id: 'checksum',
			label: 'step.run: checksum',
			detail: 'Verify SHA-256 digest of uploaded asset',
			status: 'pending'
		},
		{
			id: 'virus-scan',
			label: 'step.run: virus-scan',
			detail: 'Stream asset through ClamAV scanner',
			status: 'pending'
		},
		{
			id: 'resize',
			label: 'step.run: resize',
			detail: 'Generate 3 responsive derivatives (sm/md/lg)',
			status: 'pending'
		},
		{
			id: 'cdn-push',
			label: 'step.run: cdn-push',
			detail: 'Purge CDN cache & push new asset URLs',
			status: 'pending'
		}
	]);

	function triggerInngestJob() {
		if (jobRunning) return;
		jobRunning = true;
		jobComplete = false;
		inngestSteps = inngestSteps.map((s) => ({ ...s, status: 'pending' }));

		let delay = 0;
		inngestSteps.forEach((step, idx) => {
			const startDelay = delay + 200;
			const endDelay = delay + 200 + 600 + Math.random() * 400;
			delay = endDelay;

			setTimeout(() => {
				inngestSteps = inngestSteps.map((s) =>
					s.id === step.id ? { ...s, status: 'running' } : s
				);
			}, startDelay);

			setTimeout(() => {
				inngestSteps = inngestSteps.map((s) => (s.id === step.id ? { ...s, status: 'done' } : s));
				if (idx === inngestSteps.length - 1) {
					jobRunning = false;
					jobComplete = true;
				}
			}, endDelay);
		});
	}

	function resetJob() {
		jobRunning = false;
		jobComplete = false;
		inngestSteps = inngestSteps.map((s) => ({ ...s, status: 'pending' }));
	}

	const stepStatusStyle: Record<JobStatus, string> = {
		pending: 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950',
		running:
			'border-indigo-400 bg-indigo-50/60 dark:border-indigo-500/60 dark:bg-indigo-950/30 animate-pulse',
		done: 'border-emerald-400/60 bg-emerald-50/40 dark:border-emerald-500/40 dark:bg-emerald-950/20',
		failed: 'border-rose-400 bg-rose-50 dark:border-rose-500 dark:bg-rose-950/20'
	};

	const stepStatusIcon: Record<JobStatus, string> = {
		pending: '○',
		running: '⟳',
		done: '✓',
		failed: '✗'
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Why Presigned URLs + Durable Workflows</h3>
		<ul>
			<li>
				<strong>Direct Client-to-Storage Uploads:</strong> Presigned PUT URLs bypass your serverless
				function entirely. The browser uploads directly to R2/S3, avoiding the
				<code>6 MB</code> Lambda payload limit and serverless memory exhaustion on large files.
			</li>
			<li>
				<strong>Security Model:</strong> The server generates a time-limited, scoped credential (<code
					>expiresIn: 300s</code
				>) that grants write access to one specific key. Your storage credentials never touch the
				browser.
			</li>
			<li>
				<strong>Inngest Durable Step Functions:</strong> Each <code>step.run()</code> call is individually
				checkpointed. If a step fails or the worker crashes, Inngest retries only the failed step — not
				the entire job — without duplicating side effects.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Card 1: Presigned Upload Flow -->
		<LabCard title="Presigned R2/S3 Upload Flow" badge="Direct PUT — No Server Proxy">
			<!-- File Selector -->
			<div class="mb-4">
				<span
					class="mb-1.5 block font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase"
					>Select Asset</span
				>
				<div class="flex flex-wrap gap-2">
					{#each fileOptions as f (f.name)}
						<button
							onclick={() => {
								selectedFile = f.name;
								resetUpload();
							}}
							class="rounded-lg border px-3 py-1.5 font-mono text-xs transition {selectedFile ===
							f.name
								? 'border-indigo-500 bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
								: 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
						>
							{f.name} <span class="text-slate-400">({f.size})</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Upload Pipeline Steps -->
			<div class="mb-4 space-y-1.5 font-mono text-xs">
				{#each [{ step: '1. Server', action: 'POST /api/upload/sign', desc: `Signs key: uploads/…/${selectedFile}` }, { step: '2. Browser', action: `PUT ${selectedFileInfo.type}`, desc: `Direct to R2 endpoint via presigned URL` }, { step: '3. Server', action: 'POST /api/upload/verify', desc: 'Confirms ETag & triggers Inngest job' }] as row (row.step)}
					<div
						class="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2 dark:border-slate-800/60 dark:bg-slate-950/60"
					>
						<span class="shrink-0 font-bold text-indigo-600 dark:text-indigo-400">{row.step}</span>
						<div>
							<span class="block font-semibold text-slate-800 dark:text-slate-200"
								>{row.action}</span
							>
							<span class="text-slate-500">{row.desc}</span>
						</div>
					</div>
				{/each}
			</div>

			<!-- Progress Bar -->
			{#if uploadStep === 'uploading' || uploadStep === 'verifying' || uploadStep === 'complete'}
				<div
					class="mb-3 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
				>
					<div
						class="h-2.5 rounded-full bg-indigo-600 transition-all duration-100 {uploadStep ===
						'complete'
							? 'bg-emerald-500'
							: ''}"
						style="width: {uploadProgress}%"
					></div>
				</div>
			{/if}

			<!-- Status + Actions -->
			<div class="flex items-center justify-between">
				<span
					class="font-mono text-xs {uploadStep === 'complete'
						? 'font-bold text-emerald-600 dark:text-emerald-400'
						: 'text-slate-500'}"
				>
					{uploadStepLabels[uploadStep]}
				</span>
				<div class="flex gap-2">
					{#if uploadStep === 'complete'}
						<button
							onclick={resetUpload}
							class="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-xs font-semibold text-slate-700 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
						>
							Reset
						</button>
					{:else}
						<button
							onclick={startUpload}
							disabled={uploadStep !== 'idle'}
							class="rounded-xl bg-indigo-600 px-4 py-1.5 font-mono text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-40"
						>
							{uploadStep === 'idle' ? 'Start Upload Flow' : 'Uploading…'}
						</button>
					{/if}
				</div>
			</div>

			{#if presignedUrl && uploadStep !== 'idle'}
				<div
					class="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 p-3 dark:border-slate-800"
				>
					<span class="mb-1 block font-mono text-[10px] text-slate-400"
						>Presigned URL (300s TTL)</span
					>
					<p class="truncate font-mono text-[10px] text-emerald-400">{presignedUrl}</p>
				</div>
			{/if}
		</LabCard>

		<!-- Card 2: Inngest Step Function Tracker -->
		<LabCard title="Inngest Durable Workflow Tracker" badge="step.run() Checkpointing">
			<div class="mb-4 space-y-2">
				{#each inngestSteps as step (step.id)}
					<div
						class="flex items-start gap-3 rounded-xl border p-3 transition-all duration-300 {stepStatusStyle[
							step.status
						]}"
					>
						<span
							class="mt-0.5 shrink-0 font-mono text-sm font-bold {step.status === 'done'
								? 'text-emerald-600 dark:text-emerald-400'
								: step.status === 'running'
									? 'text-indigo-600 dark:text-indigo-400'
									: 'text-slate-400'}"
						>
							{stepStatusIcon[step.status]}
						</span>
						<div class="min-w-0 font-mono text-xs">
							<span class="block font-semibold text-slate-800 dark:text-slate-200"
								>{step.label}</span
							>
							<span class="text-slate-500">{step.detail}</span>
						</div>
						{#if step.status === 'running'}
							<span class="ml-auto shrink-0 animate-pulse font-mono text-[10px] text-indigo-500"
								>executing…</span
							>
						{:else if step.status === 'done'}
							<span
								class="ml-auto shrink-0 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400"
								>done</span
							>
						{/if}
					</div>
				{/each}
			</div>

			<div class="flex items-center justify-between">
				{#if jobComplete}
					<span class="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400"
						>All steps checkpointed ✓</span
					>
					<button
						onclick={resetJob}
						class="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-xs font-semibold text-slate-700 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
					>
						Reset
					</button>
				{:else}
					<span class="font-mono text-xs text-slate-400"
						>{jobRunning ? 'Pipeline executing…' : 'Trigger to run all steps'}</span
					>
					<button
						onclick={triggerInngestJob}
						disabled={jobRunning}
						class="rounded-xl bg-indigo-600 px-4 py-1.5 font-mono text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-40"
					>
						{jobRunning ? 'Running…' : 'Trigger Inngest Job'}
					</button>
				{/if}
			</div>
		</LabCard>
	{/snippet}
</LabShell>
