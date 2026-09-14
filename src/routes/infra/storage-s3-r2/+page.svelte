<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Simulator 1: Presigned URL Generator State
	type StorageBucket = 'cloudflare-r2-media' | 'aws-s3-prod-assets' | 'tigris-global';
	let selectedBucket = $state<StorageBucket>('cloudflare-r2-media');
	let fileName = $state('user_avatar_1048.avif');
	let fileType = $state('image/avif');
	let presignedExpiry = $state(3600);
	let isGenerating = $state(false);
	let generatedUrl = $state<string | null>(null);
	let uploadSimulated = $state(false);

	function generatePresignedUrl() {
		isGenerating = true;
		uploadSimulated = false;
		setTimeout(() => {
			isGenerating = false;
			const sig = Math.random().toString(36).substring(2, 12);
			const endpoint =
				selectedBucket === 'cloudflare-r2-media'
					? 'https://pub-r2.cloudflarestorage.com'
					: 'https://s3.eu-west-2.amazonaws.com';
			generatedUrl = `${endpoint}/${selectedBucket}/${fileName}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Expires=${presignedExpiry}&X-Amz-Signature=${sig}`;
		}, 300);
	}

	function simulateUpload() {
		uploadSimulated = true;
	}

	// Simulator 2: Egress & Storage Cost Calculator
	let monthlyStorageGb = $state(500);
	let monthlyEgressGb = $state(2000);

	let awsCost = $derived((monthlyStorageGb * 0.023 + monthlyEgressGb * 0.09).toFixed(2));
	let r2Cost = $derived((monthlyStorageGb * 0.015 + monthlyEgressGb * 0.0).toFixed(2));
	let monthlySavings = $derived((Number(awsCost) - Number(r2Cost)).toFixed(2));
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Object Storage: S3 Client, Cloudflare R2 & Presigned Uploads</h3>
		<p class="text-base sm:text-lg">
			Modern file architectures decouple binary storage from application compute. Instead of routing
			gigabytes of user file uploads through web servers, clients stream data directly to object
			storage buckets using short-lived presigned URLs.
		</p>
		<ul>
			<li>
				<strong>AWS SDK v3 (<code>@aws-sdk/client-s3</code>):</strong> Tree-shakable, modular client architecture
				tailored for edge runtimes and serverless functions.
			</li>
			<li>
				<strong>Presigned Upload URLs:</strong> The application server cryptographically signs a PUT command;
				the browser uploads directly to S3/R2 with zero server CPU or bandwidth overhead.
			</li>
			<li>
				<strong>Cloudflare R2 (Zero Egress):</strong> 100% S3-compatible API with zero data transfer egress
				fees, drastically cutting bandwidth expenses for media-heavy web applications.
			</li>
			<li>
				<strong>Multipart Streaming:</strong> Efficient chunking for multi-gigabyte video or archive files
				with parallel chunk verification and resumption.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: Presigned URL Generator -->
		<LabCard title="Presigned S3 / R2 Upload Generator" badge="AWS SDK v3">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					<div>
						<label
							for="bucket-select"
							class="block text-sm font-bold text-slate-700 dark:text-slate-300"
						>
							Storage Bucket:
						</label>
						<select
							id="bucket-select"
							bind:value={selectedBucket}
							class="mt-1 w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
						>
							<option value="cloudflare-r2-media">Cloudflare R2 (Zero Egress)</option>
							<option value="aws-s3-prod-assets">AWS S3 (eu-west-2)</option>
							<option value="tigris-global">Tigris Global Fly Object Store</option>
						</select>
					</div>

					<div>
						<label
							for="file-name"
							class="block text-sm font-bold text-slate-700 dark:text-slate-300"
						>
							File Name & Content Type:
						</label>
						<div class="mt-1 flex gap-2">
							<input
								id="file-name"
								type="text"
								bind:value={fileName}
								class="w-2/3 rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
							/>
							<input
								type="text"
								bind:value={fileType}
								class="w-1/3 rounded-xl border border-slate-300 bg-white p-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
							/>
						</div>
					</div>
				</div>

				<button
					onclick={generatePresignedUrl}
					disabled={isGenerating}
					class="w-full rounded-xl bg-indigo-600 px-4 py-3 text-base font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50"
				>
					{isGenerating ? 'Signing HMAC Token...' : 'Generate Presigned PUT URL'}
				</button>

				{#if generatedUrl}
					<div
						class="space-y-3 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/30"
					>
						<div class="flex items-center justify-between">
							<span class="text-sm font-bold text-indigo-700 uppercase dark:text-indigo-300">
								Presigned PUT Target:
							</span>
							<span class="text-sm text-slate-500">TTL: {presignedExpiry}s</span>
						</div>
						<div class="rounded-xl bg-slate-900 p-3 text-sm break-all text-emerald-400 select-all">
							{generatedUrl}
						</div>
						<div class="flex items-center justify-between pt-1">
							<button
								onclick={simulateUpload}
								class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-700"
							>
								Simulate Client Direct Upload
							</button>
							{#if uploadSimulated}
								<span class="text-sm font-bold text-emerald-600 dark:text-emerald-400">
									✓ Direct HTTP 200 OK (0 B Server Ingress)
								</span>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</LabCard>

		<!-- Simulator 2: Bandwidth & Egress Cost Comparison -->
		<LabCard title="Storage & Egress Cost Comparison" badge="Cost Optimisation">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label
							for="storage-range"
							class="block text-sm font-bold text-slate-700 dark:text-slate-300"
						>
							Storage Capacity: {monthlyStorageGb} GB
						</label>
						<input
							id="storage-range"
							type="range"
							min="50"
							max="5000"
							step="50"
							bind:value={monthlyStorageGb}
							class="mt-2 w-full accent-indigo-600"
						/>
					</div>

					<div>
						<label
							for="egress-range"
							class="block text-sm font-bold text-slate-700 dark:text-slate-300"
						>
							Monthly Public Egress: {monthlyEgressGb} GB
						</label>
						<input
							id="egress-range"
							type="range"
							min="100"
							max="20000"
							step="100"
							bind:value={monthlyEgressGb}
							class="mt-2 w-full accent-indigo-600"
						/>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
					<div
						class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-900"
					>
						<span class="text-sm font-bold text-slate-500 uppercase">AWS S3 Standard</span>
						<p class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
							£{awsCost}
						</p>
						<span class="mt-1 block text-sm text-slate-400">Includes £0.09/GB egress</span>
					</div>

					<div
						class="rounded-2xl border border-indigo-500/40 bg-indigo-50/50 p-4 text-center dark:bg-indigo-950/40"
					>
						<span class="text-sm font-bold text-indigo-600 uppercase dark:text-indigo-400">
							Cloudflare R2
						</span>
						<p class="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-300">
							£{r2Cost}
						</p>
						<span class="mt-1 block text-sm font-bold text-emerald-600 dark:text-emerald-400">
							£0 Egress Fees
						</span>
					</div>

					<div
						class="rounded-2xl border border-emerald-500/40 bg-emerald-50/50 p-4 text-center dark:bg-emerald-950/40"
					>
						<span class="text-sm font-bold text-emerald-600 uppercase dark:text-emerald-400">
							Monthly Savings
						</span>
						<p class="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
							+£{monthlySavings}
						</p>
						<span class="mt-1 block text-sm text-emerald-700 dark:text-emerald-300">
							{((Number(monthlySavings) / (Number(awsCost) || 1)) * 100).toFixed(0)}% cost reduction
						</span>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
