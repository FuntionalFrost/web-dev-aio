<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	interface StreamResult {
		status: string;
		edgeLocation: string;
		roundTripMs: number;
		timestamp: string;
	}

	let isSimulatingError = $state(false);
	let requestPromise = $state<Promise<StreamResult> | null>(null);

	function triggerAsyncStream() {
		requestPromise = new Promise<StreamResult>((resolve, reject) => {
			setTimeout(() => {
				if (isSimulatingError) {
					reject(new Error('Edge isolate timeout (504 Gateway Timeout)'));
				} else {
					resolve({
						status: '200 Stream Connected',
						edgeLocation: 'us-east-4 (Ashburn Isolate)',
						roundTripMs: 14.8,
						timestamp: new Date().toLocaleTimeString()
					});
				}
			}, 1200);
		});
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Async Svelte, Streaming & Await Snippets</h3>
		<p class="text-base sm:text-lg">
			Svelte 5 enables non-blocking async component boundaries and streaming promises that decouple
			initial HTML shell hydration from slow backend responses.
		</p>
		<ul>
			<li>
				<strong>Streaming SSR with <code>&#123;#await&#125;</code>:</strong> Allows the server to flush
				the page layout immediately while streaming deferred promise data down to the client as chunks
				complete.
			</li>
			<li>
				<strong>Async Snippets:</strong> Pass asynchronous render snippets with parameters, avoiding layout
				shifts and manual loading state boilerplate.
			</li>
			<li>
				<strong>Resilient Catch Blocks:</strong> Isolate API errors locally to the component subtree without
				crashing or blanking the entire page view.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Async Component & Streaming Simulator" badge="Streaming SSR">
			<div class="space-y-4 font-mono text-sm">
				<div class="flex items-center justify-between">
					<label
						class="flex cursor-pointer items-center gap-2 font-bold text-slate-700 dark:text-slate-300"
					>
						<input
							type="checkbox"
							bind:checked={isSimulatingError}
							class="h-4 w-4 rounded text-rose-600"
						/>
						Simulate Network/Edge Fault
					</label>
					<button
						onclick={triggerAsyncStream}
						class="rounded-xl bg-indigo-600 px-5 py-2.5 text-base font-bold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500"
					>
						Fetch Async Stream
					</button>
				</div>

				<div
					class="flex min-h-36 flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
				>
					{#if requestPromise === null}
						<div class="text-center text-slate-500">
							Press "Fetch Async Stream" to test non-blocking promise resolution.
						</div>
					{:else}
						{#await requestPromise}
							<div class="animate-pulse space-y-3">
								<div class="flex items-center gap-3">
									<div class="h-4 w-4 animate-ping rounded-full bg-indigo-500"></div>
									<span class="text-sm font-bold text-indigo-600 dark:text-indigo-400"
										>Streaming edge chunks down to client...</span
									>
								</div>
								<div class="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800"></div>
								<div class="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
							</div>
						{:then result}
							<div class="space-y-2 border-l-4 border-emerald-500 pl-4">
								<div class="flex items-center justify-between">
									<span class="text-lg font-bold text-emerald-600 dark:text-emerald-400"
										>{result.status}</span
									>
									<span class="text-sm text-slate-500 dark:text-slate-400">{result.timestamp}</span>
								</div>
								<p class="text-base font-bold text-slate-800 dark:text-slate-200">
									Node: {result.edgeLocation}
								</p>
								<p class="text-sm text-slate-500">Round-trip Latency: {result.roundTripMs} ms</p>
							</div>
						{:catch error}
							<div
								class="space-y-1 border-l-4 border-rose-500 pl-4 text-rose-600 dark:text-rose-400"
							>
								<p class="text-base font-bold">Stream Interrupted</p>
								<p class="text-sm">{error.message}</p>
							</div>
						{/await}
					{/if}
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
