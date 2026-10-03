<script lang="ts">
	import LabCard from '#lib/components/LabCard.svelte';

	type BotKey = 'gptbot' | 'claudebot' | 'bytespider' | 'googlebot';
	let selectedBot = $state<BotKey>('gptbot');

	let selectedPath = $state('/labs/security-defensive-headers');
	let enableTdmReservation = $state(true);
	let enableNoaiHeader = $state(true);

	const botProfiles: Record<BotKey, { name: string; type: string; userAgent: string }> = {
		gptbot: {
			name: 'OpenAI GPTBot',
			type: 'AI LLM Training Scraper',
			userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2)'
		},
		claudebot: {
			name: 'Anthropic ClaudeBot',
			type: 'AI Knowledge Retrieval Crawler',
			userAgent: 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +https://www.anthropic.com/claudebot)'
		},
		bytespider: {
			name: 'ByteDance ByteSpider',
			type: 'Aggressive High-Frequency Scraper',
			userAgent:
				'Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Bytespider'
		},
		googlebot: {
			name: 'Googlebot Standard',
			type: 'General Search Engine Indexer',
			userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
		}
	};

	let evaluation = $derived.by(() => {
		const isAiBot = selectedBot !== 'googlebot';
		if (selectedPath === '/llms.txt') {
			return {
				allowed: true,
				status: 'ALLOWED (AI Context Discovery)',
				reason: 'Standard /llms.txt endpoint is explicitly structured for AI ingestion.'
			};
		}
		if (isAiBot && (enableNoaiHeader || enableTdmReservation)) {
			return {
				allowed: false,
				status: 'BLOCKED (TDM / noai Directive)',
				reason: 'Machine-readable EU Copyright Art 4 TDM opt-out & X-Robots-Tag: noai enforced.'
			};
		}
		return {
			allowed: true,
			status: 'ALLOWED (Standard Crawl)',
			reason: 'Crawler permitted under RFC 9309 robots.txt and HTTP headers.'
		};
	});

	// Client-Side Proof-of-Work (PoW) Anti-Bot Challenge Simulator
	let powDifficulty = $state(10);
	let powSolving = $state(false);
	let powResult = $state<{ nonce: number; durationMs: number; hash: string } | null>(null);

	async function runPowTest() {
		powSolving = true;
		powResult = null;
		const start = performance.now();
		const challenge = `challenge-${Date.now()}`;
		let nonce = 0;
		const encoder = new TextEncoder();

		while (true) {
			const data = encoder.encode(`${challenge}:${nonce}`);
			const hashBuffer = await crypto.subtle.digest('SHA-256', data);
			const hashArray = new Uint8Array(hashBuffer);

			let leadingZeros = 0;
			for (const byte of hashArray) {
				if (byte === 0) leadingZeros += 8;
				else {
					leadingZeros += Math.clz32(byte) - 24;
					break;
				}
			}

			if (leadingZeros >= powDifficulty || nonce > 100000) {
				const durationMs = Math.round(performance.now() - start);
				const hashHex = Array.from(hashArray)
					.map((b) => b.toString(16).padStart(2, '0'))
					.join('')
					.slice(0, 16);
				powResult = { nonce, durationMs, hash: `${hashHex}...` };
				powSolving = false;
				break;
			}
			nonce++;
		}
	}
</script>

<LabCard title="AI Crawlers, Robots & Anti-Scraping Simulator" badge="Robots 2026">
	<div class="space-y-4 font-mono text-sm">
		<!-- Bot Selection -->
		<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
			{#each Object.keys(botProfiles) as BotKey[] as bk (bk)}
				<button
					onclick={() => (selectedBot = bk)}
					class="rounded-xl border p-2.5 text-center text-xs font-bold transition {selectedBot ===
					bk
						? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
						: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
				>
					{botProfiles[bk].name.split(' ')[1] || botProfiles[bk].name}
				</button>
			{/each}
		</div>

		<!-- Path & Header Options -->
		<div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
			<label class="block space-y-1">
				<span class="text-xs font-bold text-slate-500 uppercase">Target URI Path:</span>
				<select
					bind:value={selectedPath}
					class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
				>
					<option value="/labs/security-defensive-headers">/labs/security-defensive-headers</option>
					<option value="/llms.txt">/llms.txt (AI Index)</option>
					<option value="/api/v1/curriculum">/api/v1/curriculum</option>
				</select>
			</label>
			<div class="flex items-end">
				<button
					onclick={() => (enableNoaiHeader = !enableNoaiHeader)}
					class="w-full rounded-xl border p-2 text-center text-xs font-bold transition {enableNoaiHeader
						? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
						: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
				>
					{enableNoaiHeader ? '✓ X-Robots-Tag: noai' : '✗ No noai Header'}
				</button>
			</div>
			<div class="flex items-end">
				<button
					onclick={() => (enableTdmReservation = !enableTdmReservation)}
					class="w-full rounded-xl border p-2 text-center text-xs font-bold transition {enableTdmReservation
						? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
						: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
				>
					{enableTdmReservation ? '✓ EU Art 4 TDM Opt-Out' : '✗ No TDM Flag'}
				</button>
			</div>
		</div>

		<!-- Crawler Evaluation Decision Card -->
		<div
			class="rounded-2xl border p-4 transition-colors {evaluation.allowed
				? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/30'
				: 'border-rose-200 bg-rose-50/60 dark:border-rose-900/60 dark:bg-rose-950/30'}"
		>
			<div class="flex items-center justify-between pb-1">
				<span class="text-xs font-bold text-slate-900 dark:text-white">
					{botProfiles[selectedBot].name} ({botProfiles[selectedBot].type})
				</span>
				<span
					class="rounded-md px-2 py-0.5 text-xs font-bold {evaluation.allowed
						? 'bg-emerald-600 text-white'
						: 'bg-rose-600 text-white'}"
				>
					{evaluation.status}
				</span>
			</div>
			<p class="text-xs text-slate-700 dark:text-slate-300">{evaluation.reason}</p>
		</div>

		<!-- Client-Side Proof-of-Work Challenge (Altcha standard) -->
		<div
			class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
		>
			<div class="flex items-center justify-between">
				<span class="text-xs font-bold text-slate-700 dark:text-slate-300">
					Zero-Tracking Proof-of-Work Bot Mitigation
				</span>
				<span class="font-mono text-xs text-indigo-600 dark:text-indigo-400">
					Difficulty: {powDifficulty} bits
				</span>
			</div>
			<p class="text-xs text-slate-600 dark:text-slate-400">
				Clients compute lightweight SHA-256 nonces directly in the browser to defeat scraper
				brute-forcing without third-party tracking pixels.
			</p>
			<div class="flex gap-2">
				<button
					onclick={runPowTest}
					disabled={powSolving}
					class="flex-1 rounded-xl bg-indigo-600 py-2 text-xs font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50"
				>
					{powSolving ? 'Hashing SHA-256 Nonces...' : 'Solve Proof-of-Work Challenge'}
				</button>
			</div>
			{#if powResult}
				<div class="rounded-xl bg-slate-900 p-2.5 text-xs text-emerald-400">
					Solved in {powResult.durationMs}ms — Nonce: {powResult.nonce} (Hash: {powResult.hash})
				</div>
			{/if}
		</div>
	</div>
</LabCard>
