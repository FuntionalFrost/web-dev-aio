<script lang="ts">
	import LabCard from '$lib/components/LabCard.svelte';
	import { Alert } from 'yaxa-svelte';

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

<LabCard
	title="Sliding Window Rate Limiter"
	badge={isRateLimited ? 'HTTP 429: BLOCKED' : 'HTTP 200: OK'}
>
	<div class="space-y-4 font-mono text-sm">
		<!-- Live Interactive Dispatcher -->
		<div class="flex flex-wrap items-center justify-between gap-3">
			<div class="flex gap-2">
				<button
					onclick={dispatchAPIRequest}
					class="rounded-xl bg-indigo-600 px-4 py-2.5 text-base font-bold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 active:scale-95"
				>
					Invoke /api/v1/resource
				</button>
				<button
					onclick={resetLimiter}
					class="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-base font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
				>
					Clear Window
				</button>
			</div>

			<span class="text-sm font-bold text-slate-500">
				Rolling Window: <strong class="text-slate-900 dark:text-white">10s</strong>
			</span>
		</div>

		<!-- Telemetry Gauges -->
		<div class="grid grid-cols-2 gap-4">
			<div
				class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-sm font-bold tracking-wider text-slate-400 uppercase"
					>Remaining Quota:</span
				>
				<p
					class="mt-1 text-2xl font-bold {remainingRequests === 0
						? 'text-rose-600 dark:text-rose-400'
						: 'text-emerald-600 dark:text-emerald-400'}"
				>
					{remainingRequests} / {maxLimit}
				</p>
			</div>
			<div
				class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-sm font-bold tracking-wider text-slate-400 uppercase"
					>Active Window Slots:</span
				>
				<div class="mt-3 flex gap-1.5">
					{#each Array(maxLimit) as _, i (`slot-${i}`)}
						<span
							class="h-4 flex-1 rounded-md transition-all duration-200 {i < timestamps.length
								? 'bg-indigo-600 dark:bg-indigo-500'
								: 'bg-slate-200 dark:bg-slate-800'}"
						></span>
					{/each}
				</div>
			</div>
			{#if isRateLimited}
				<Alert
					color="error"
					title="HTTP 429: Rate Limit Exceeded"
					description="Active sliding window quota is exhausted (5 requests / 10s). Subsequent requests are dropped at the edge until older request timestamps expire."
				/>
			{/if}

			<!-- Live Activity Log -->
			<div
				class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-sm font-bold tracking-wider text-slate-400 uppercase"
					>Edge Gateway Response Log:</span
				>
				<div class="mt-2.5 space-y-2">
					{#each requestLogs as log (log.id)}
						<div
							class="flex items-center justify-between border-b border-slate-200/60 pb-2 last:border-none dark:border-slate-800/60"
						>
							<span class="text-slate-500 dark:text-slate-400">[{log.time}]</span>
							<span
								class="text-sm font-bold {log.allowed
									? 'text-emerald-600 dark:text-emerald-400'
									: 'text-rose-600 dark:text-rose-400'}"
							>
								{log.allowed ? '200 OK' : '429 TOO MANY REQUESTS'}
							</span>
							<span class="text-slate-500">Remaining: {log.remaining}</span>
						</div>
					{:else}
						<div class="py-2 text-slate-500 dark:text-slate-400">
							Click "Invoke" to simulate incoming edge requests.
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div></LabCard
>
