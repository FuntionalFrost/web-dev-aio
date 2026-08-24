<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type PayloadData = { records: number; checksum: string };
	type NetworkState =
		| { status: 'idle' }
		| { status: 'loading'; progress: number }
		| { status: 'success'; data: PayloadData; timestamp: number }
		| { status: 'error'; code: number; message: string };

	let currentState = $state<NetworkState>({ status: 'idle' });
	let uploadTimer: ReturnType<typeof setInterval> | null = null;

	function setIdle() {
		if (uploadTimer) clearInterval(uploadTimer);
		currentState = { status: 'idle' };
	}

	function simulateLoad() {
		if (uploadTimer) clearInterval(uploadTimer);
		currentState = { status: 'loading', progress: 0 };

		uploadTimer = setInterval(() => {
			if (currentState.status === 'loading') {
				if (currentState.progress < 100) {
					currentState = { status: 'loading', progress: currentState.progress + 25 };
				} else {
					clearInterval(uploadTimer!);
					currentState = {
						status: 'success',
						data: { records: 1420, checksum: '0x8F9A' },
						timestamp: Date.now()
					};
				}
			}
		}, 350);
	}

	function simulateError() {
		if (uploadTimer) clearInterval(uploadTimer);
		currentState = {
			status: 'error',
			code: 429,
			message: 'Rate limit exceeded. Exponential backoff required.'
		};
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Core Advantages</h3>
		<ul>
			<li>
				<strong>Discriminated Unions:</strong> Narrow object properties safely with standard control flow.
			</li>
			<li>
				<strong>Exhaustiveness Checking:</strong> Enforce total union coverage using the
				<code>never</code> type.
			</li>
			<li>
				<strong>The <code>satisfies</code> Operator:</strong> Validates interfaces while retaining specific
				literal types.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Union State Machine Visualizer" badge={`status: "${currentState.status}"`}>
			<div class="flex flex-wrap gap-2 font-mono text-xs">
				<button
					onclick={setIdle}
					class="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-slate-800 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
				>
					Dispatch 'idle'
				</button>
				<button
					onclick={simulateLoad}
					class="rounded-lg bg-indigo-600 px-3 py-2 text-white transition hover:bg-indigo-500"
				>
					Dispatch 'loading' → 'success'
				</button>
				<button
					onclick={simulateError}
					class="rounded-lg bg-rose-600 px-3 py-2 text-white transition hover:bg-rose-500"
				>
					Dispatch 'error'
				</button>
			</div>

			<div
				class="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
			>
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-900"
				>
					<span class="font-mono text-[11px] text-slate-500 uppercase">Narrowed Type State</span>
					<span
						class="rounded px-2 py-0.5 font-mono text-xs font-bold uppercase {currentState.status ===
						'idle'
							? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
							: currentState.status === 'loading'
								? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'
								: currentState.status === 'success'
									? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300'
									: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300'}"
					>
						{currentState.status}
					</span>
				</div>

				{#if currentState.status === 'idle'}
					<div class="py-6 text-center font-mono text-xs text-slate-500">
						State is idle. No payload or errors active.
					</div>
				{:else if currentState.status === 'loading'}
					<div class="space-y-2 font-mono text-xs">
						<div class="flex justify-between text-slate-600 dark:text-slate-400">
							<span>Streaming stream buffer...</span>
							<span class="font-bold text-amber-600 dark:text-amber-300"
								>{currentState.progress}%</span
							>
						</div>
						<div class="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-900">
							<div
								class="h-full bg-amber-500 transition-all duration-300"
								style="width: {currentState.progress}%"
							></div>
						</div>
					</div>
				{:else if currentState.status === 'success'}
					<div class="grid grid-cols-2 gap-3 font-mono text-xs">
						<div
							class="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="text-[10px] text-slate-500 uppercase">Records Received</span>
							<p class="mt-0.5 text-lg font-bold text-emerald-600 dark:text-emerald-400">
								{currentState.data.records}
							</p>
						</div>
						<div
							class="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="text-[10px] text-slate-500 uppercase">Checksum Hash</span>
							<p class="mt-0.5 text-lg font-bold text-slate-800 dark:text-slate-200">
								{currentState.data.checksum}
							</p>
						</div>
					</div>
				{:else if currentState.status === 'error'}
					<div
						class="space-y-1 rounded-lg border border-rose-200 bg-rose-50 p-4 font-mono text-xs text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300"
					>
						<div class="font-bold">HTTP Error Code: {currentState.code}</div>
						<div class="text-[11px] text-rose-700 dark:text-rose-400">{currentState.message}</div>
					</div>
				{/if}
			</div>
		</LabCard>
	{/snippet}
</LabShell>
