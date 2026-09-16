---
id: 'api-realtime-webhooks'
title: '18. Real-Time Streaming & Webhook Signatures'
track: 'APIs & Data Architecture'
category: 'Real-Time & Streaming'
segment: 'apis'
slug: 'realtime-webhooks'
tech:
  [
    'Server-Sent Events (SSE)',
    'WebSockets',
    'HMAC-SHA256',
    'Timing-Safe Verify',
    'Idempotency Keys'
  ]
description: 'Stream real-time telemetry over SSE and WebSockets, verify incoming webhook signatures with timing-safe HMAC, and prevent replay attacks.'
snippetLang: 'typescript'
lastmod: '2026-02-15'
---

<h3>Real-Time Streaming & Webhook Signatures</h3>
		<p class="text-base sm:text-lg">
			Choosing between unidirectional Server-Sent Events (SSE) and bidirectional WebSockets, and
			protecting webhook endpoints with timing-safe signature verification.
		</p>
		<div class="not-prose my-4 overflow-x-auto">
			<table
				class="w-full overflow-hidden rounded-2xl border border-slate-200 text-left font-mono text-sm dark:border-slate-800"
			>
				<thead
					class="border-b border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
				>
					<tr>
						<th class="p-3 font-bold">Protocol</th>
						<th class="p-3 font-bold">Direction</th>
						<th class="p-3 font-bold">Transport & Overhead</th>
						<th class="p-3 font-bold">Ideal Use Case</th>
					</tr>
				</thead>
				<tbody
					class="divide-y divide-slate-200 bg-white text-slate-600 dark:divide-slate-800/60 dark:bg-slate-950/40 dark:text-slate-400"
				>
					<tr>
						<td class="p-3 font-bold text-slate-900 dark:text-slate-200">Short Polling</td>
						<td class="p-3 font-bold text-amber-600 dark:text-amber-400">Client → Server</td>
						<td class="p-3">Frequent HTTP GETs; high header overhead</td>
						<td class="p-3">Low-frequency status checks, legacy fallback</td>
					</tr>
					<tr>
						<td class="p-3 font-bold text-slate-900 dark:text-slate-200">Long Polling</td>
						<td class="p-3 font-bold text-amber-600 dark:text-amber-400">Server → Client (Held)</td>
						<td class="p-3">Connection held open until event; high server churn</td>
						<td class="p-3">Environments where WebSockets/SSE are blocked by firewalls</td>
					</tr>
					<tr>
						<td class="p-3 font-bold text-slate-900 dark:text-slate-200"
							>Server-Sent Events (SSE)</td
						>
						<td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">Server → Client</td>
						<td class="p-3">HTTP/2 multiplexed, auto-reconnect, 0 socket overhead</td>
						<td class="p-3">AI LLM token streams, live market tickers, telemetry</td>
					</tr>
					<tr>
						<td class="p-3 font-bold text-slate-900 dark:text-slate-200">WebSockets</td>
						<td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">Full Bidirectional</td>
						<td class="p-3">Raw TCP frames (ws:// / wss://), 2–10 byte framing</td>
						<td class="p-3">Multiplayer gaming, collaborative whiteboards, live chat</td>
					</tr>
				</tbody>
			</table>
		</div>
