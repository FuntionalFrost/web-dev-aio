<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Sliding Window Rate Limiter Simulator State
	const maxLimit = 5;
	const windowSeconds = 10;
	let timestamps = $state<number[]>([]);
	let requestLogs = $state<{ id: number; time: string; allowed: boolean; remaining: number }[]>([]);

	// Calculate sliding window state reactively
	let currentTime = $state(Date.now());
	$effect(() => {
		const timer = setInterval(() => {
			currentTime = Date.now();
			// Purge timestamps older than 10 seconds
			timestamps = timestamps.filter((t) => currentTime - t < windowSeconds * 1000);
		}, 200);
		return () => clearInterval(timer);
	});

	let remainingRequests = $derived(Math.max(0, maxLimit - timestamps.length));
	let isRateLimited = $derived(timestamps.length >= maxLimit);

	function dispatchAPIRequest() {
		const now = Date.now();
		const activeInWindow = timestamps.filter((t) => now - t < windowSeconds * 1000);

		if (activeInWindow.length < maxLimit) {
			timestamps = [...activeInWindow, now];
			requestLogs = [
				{
					id: now,
					time: new Date(now).toLocaleTimeString(),
					allowed: true,
					remaining: maxLimit - (activeInWindow.length + 1)
				},
				...requestLogs.slice(0, 5)
			];
		} else {
			requestLogs = [
				{ id: now, time: new Date(now).toLocaleTimeString(), allowed: false, remaining: 0 },
				...requestLogs.slice(0, 5)
			];
		}
	}

	function resetLimiter() {
		timestamps = [];
		requestLogs = [];
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Sliding Window vs. Fixed Window</h3>
		<ul>
			<li>
				<strong>The Fixed Window Burst Flaw:</strong> In fixed window rate limiting, a user can fire all
				5 requests at second 9 and another 5 requests at second 10, causing a 2x burst across the boundary.
			</li>
			<li>
				<strong>The Sliding Window Solution:</strong> Tracks rolling weighted sub-windows in Redis
				memory, ensuring the client never exceeds the limit across <em>any</em> arbitrary 10-second slice.
			</li>
			<li>
				<strong>Stateless HTTP Protocol:</strong> Upstash uses standard HTTPS requests instead of persistent
				TCP sockets, making it compatible with Cloudflare Workers and serverless functions without connection
				leaks.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard
			title="Sliding Window Rate Limiter"
			badge={isRateLimited ? 'HTTP 429: BLOCKED' : 'HTTP 200: OK'}
		>
			<!-- Live Interactive Dispatcher -->
			<div class="flex flex-wrap items-center justify-between gap-3">
				<div class="flex gap-2">
					<button
						onclick={dispatchAPIRequest}
						class="rounded-xl bg-indigo-600 px-4 py-2 font-mono text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 active:scale-95"
					>
						Invoke /api/v1/resource
					</button>
					<button
						onclick={resetLimiter}
						class="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
					>
						Clear Window
					</button>
				</div>

				<span class="font-mono text-xs text-slate-500">
					Rolling Window: <strong class="text-slate-900 dark:text-white">10s</strong>
				</span>
			</div>

			<!-- Telemetry Gauges -->
			<div class="grid grid-cols-2 gap-4 font-mono">
				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="text-[11px] tracking-wider text-slate-400 uppercase">Remaining Quota:</span>
					<p
						class="mt-1 text-2xl font-bold {remainingRequests === 0
							? 'text-rose-600 dark:text-rose-400'
							: 'text-emerald-600 dark:text-emerald-400'}"
					>
						{remainingRequests} / {maxLimit}
					</p>
				</div>
				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="text-[11px] tracking-wider text-slate-400 uppercase"
						>Active Window Slots:</span
					>
					<div class="mt-2.5 flex gap-1.5">
						{#each Array(maxLimit) as _, i (`slot-${i}`)}
							<span
								class="h-3.5 flex-1 rounded-sm transition-all duration-200 {i < timestamps.length
									? 'bg-indigo-600 dark:bg-indigo-500'
									: 'bg-slate-200 dark:bg-slate-800'}"
							></span>
						{/each}
					</div>
				</div>
			</div>

			<!-- Live Activity Log -->
			<div
				class="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-[11px] tracking-wider text-slate-400 uppercase"
					>Edge Gateway Response Log:</span
				>
				<div class="mt-2 space-y-1.5">
					{#each requestLogs as log (log.id)}
						<div
							class="flex items-center justify-between border-b border-slate-200/60 pb-1.5 last:border-none dark:border-slate-800/60"
						>
							<span class="text-slate-400">[{log.time}]</span>
							<span
								class="font-bold {log.allowed
									? 'text-emerald-600 dark:text-emerald-400'
									: 'text-rose-600 dark:text-rose-400'}"
							>
								{log.allowed ? '200 OK' : '429 TOO MANY REQUESTS'}
							</span>
							<span class="text-slate-500">Remaining: {log.remaining}</span>
						</div>
					{:else}
						<div class="text-slate-400">Click "Invoke" to simulate edge requests.</div>
					{/each}
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
