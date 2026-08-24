<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// 1. SSE Real-Time Stream Simulator
	let isSSEConnected = $state(false);
	let sseMessages = $state<{ id: number; timestamp: string; ticker: string; price: number }[]>([]);
	let sseTimer: ReturnType<typeof setInterval> | null = null;

	function toggleSSE() {
		if (isSSEConnected) {
			if (sseTimer) clearInterval(sseTimer);
			isSSEConnected = false;
		} else {
			isSSEConnected = true;
			sseTimer = setInterval(() => {
				const newMsg = {
					id: Date.now(),
					timestamp: new Date().toLocaleTimeString(),
					ticker: 'AAPL',
					price: Number((220 + (Math.random() * 8 - 4)).toFixed(2))
				};
				sseMessages = [newMsg, ...sseMessages.slice(0, 4)];
			}, 800);
		}
	}

	// 2. Webhook HMAC-SHA256 Signer
	let webhookPayload = $state('{"event":"invoice.paid","amount":4900,"currency":"usd"}');
	let webhookSecret = $state('whsec_test_secret_key_89234');
	let computedSignature = $state('Calculating...');

	async function generateHMAC() {
		const encoder = new TextEncoder();
		const keyData = encoder.encode(webhookSecret);
		const msgData = encoder.encode(webhookPayload);

		try {
			const cryptoKey = await crypto.subtle.importKey(
				'raw',
				keyData,
				{ name: 'HMAC', hash: 'SHA-256' },
				false,
				['sign']
			);
			const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
			const hashArray = Array.from(new Uint8Array(signatureBuffer));
			computedSignature = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
		} catch {
			computedSignature = 'CryptoSubtle Unavailable';
		}
	}

	$effect(() => {
		if (webhookPayload && webhookSecret) {
			generateHMAC();
		}
	});
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Architectural Comparison: SSE vs. WebSockets</h3>
		<div class="not-prose my-4 overflow-x-auto">
			<table
				class="w-full overflow-hidden rounded-xl border border-slate-200 text-left font-mono text-xs dark:border-slate-800"
			>
				<thead
					class="border-b border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
				>
					<tr>
						<th class="p-3">Protocol</th>
						<th class="p-3">Direction</th>
						<th class="p-3">Transport</th>
						<th class="p-3">Ideal Use Case</th>
					</tr>
				</thead>
				<tbody
					class="divide-y divide-slate-200 bg-white text-slate-600 dark:divide-slate-800/60 dark:bg-slate-950/40 dark:text-slate-400"
				>
					<tr>
						<td class="p-3 font-semibold text-slate-900 dark:text-slate-200">Server-Sent Events</td>
						<td class="p-3 text-indigo-600 dark:text-indigo-400">Server → Client</td>
						<td class="p-3">Standard HTTP/2+</td>
						<td class="p-3">AI completions, price tickers, dashboard telemetry</td>
					</tr>
					<tr>
						<td class="p-3 font-semibold text-slate-900 dark:text-slate-200">WebSockets</td>
						<td class="p-3 text-emerald-600 dark:text-emerald-400">Bidirectional</td>
						<td class="p-3">WS / WSS upgrade</td>
						<td class="p-3">Multiplayer gaming, collaborative whiteboards, chat</td>
					</tr>
				</tbody>
			</table>
		</div>
	{/snippet}

	{#snippet lab()}
		<!-- Card 1: SSE Stream Visualizer -->
		<LabCard
			title="Server-Sent Events (SSE) Stream"
			badge={isSSEConnected ? 'Active Connection' : 'Disconnected'}
		>
			<div
				class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
			>
				<span class="font-mono text-xs text-slate-500">HTTP/2 Unidirectional Stream</span>
				<button
					onclick={toggleSSE}
					class="rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold text-white transition {isSSEConnected
						? 'bg-rose-600 hover:bg-rose-500'
						: 'bg-emerald-600 hover:bg-emerald-500'}"
				>
					{isSSEConnected ? 'Disconnect Stream' : 'Connect SSE Stream'}
				</button>
			</div>

			<div class="space-y-2">
				{#each sseMessages as msg (msg.id)}
					<div
						class="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2.5 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
					>
						<span class="text-slate-500">[{msg.timestamp}]</span>
						<span class="font-bold text-slate-900 dark:text-white">{msg.ticker}</span>
						<span class="font-bold text-indigo-600 dark:text-indigo-400">${msg.price}</span>
					</div>
				{:else}
					<div class="p-4 text-center font-mono text-xs text-slate-400">
						{isSSEConnected
							? 'Streaming ticker frames...'
							: 'Click "Connect SSE Stream" to receive data frames.'}
					</div>
				{/each}
			</div>
		</LabCard>

		<!-- Card 2: Webhook HMAC-SHA256 Signer -->
		<LabCard title="Webhook HMAC-SHA256 Signer" badge="Timing-Safe Guard">
			<div class="space-y-3 font-mono text-xs">
				<div>
					<label
						for="wh-payload"
						class="mb-1 block font-semibold text-slate-700 dark:text-slate-300"
					>
						Incoming Webhook JSON Payload:
					</label>
					<textarea
						id="wh-payload"
						rows="2"
						bind:value={webhookPayload}
						class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					></textarea>
				</div>

				<div>
					<label
						for="wh-secret"
						class="mb-1 block font-semibold text-slate-700 dark:text-slate-300"
					>
						Signing Secret (whsec_...):
					</label>
					<input
						id="wh-secret"
						type="text"
						bind:value={webhookSecret}
						class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					/>
				</div>

				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="text-[10px] text-slate-400 uppercase">Calculated X-Signature-256:</span>
					<p class="mt-1 text-xs font-bold break-all text-emerald-600 dark:text-emerald-400">
						{computedSignature}
					</p>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
