<script lang="ts">
	import LabCard from '#lib/components/LabCard.svelte';

	type ProtocolMode = 'direct' | 'ohttp' | 'tor_onion';
	let protocolMode = $state<ProtocolMode>('ohttp');

	let tokenCount = $state(5);
	let isRedeemingToken = $state(false);

	function redeemBlindToken() {
		if (tokenCount > 0 && !isRedeemingToken) {
			isRedeemingToken = true;
			setTimeout(() => {
				tokenCount -= 1;
				isRedeemingToken = false;
			}, 600);
		}
	}
</script>

<LabCard title="Oblivious HTTP & Privacy Pass (PST) Simulator" badge="Anonymity 2026">
	<div class="space-y-4 font-mono text-sm">
		<!-- Protocol Selection -->
		<div class="grid grid-cols-3 gap-2">
			<button
				onclick={() => (protocolMode = 'direct')}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {protocolMode ===
				'direct'
					? 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
					: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
			>
				Standard HTTP
			</button>
			<button
				onclick={() => (protocolMode = 'ohttp')}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {protocolMode ===
				'ohttp'
					? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
					: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
			>
				Oblivious HTTP (OHTTP)
			</button>
			<button
				onclick={() => (protocolMode = 'tor_onion')}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {protocolMode ===
				'tor_onion'
					? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
					: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
			>
				Tor Onion-Location
			</button>
		</div>

		<!-- Protocol Flow Diagram / Card -->
		<div
			class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
		>
			{#if protocolMode === 'direct'}
				<div class="space-y-2">
					<div class="flex items-center justify-between text-xs text-rose-600 dark:text-rose-400">
						<span class="font-bold">Direct Connection (Zero Anonymity)</span>
						<span>RFC 9110 Direct</span>
					</div>
					<div class="grid grid-cols-2 gap-2 text-xs">
						<div
							class="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="text-slate-500">Client IP:</span>
							<p class="font-bold text-slate-900 dark:text-white">198.51.100.42</p>
						</div>
						<div
							class="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="text-slate-500">Target Server Visibility:</span>
							<p class="font-bold text-rose-600 dark:text-rose-400">
								IP + Full Request Body Linked
							</p>
						</div>
					</div>
				</div>
			{:else if protocolMode === 'ohttp'}
				<div class="space-y-2">
					<div
						class="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400"
					>
						<span class="font-bold">Oblivious HTTP (RFC 9458 / HPKE Encrypted)</span>
						<span>Relay ⮂ Gateway Topology</span>
					</div>
					<div class="grid grid-cols-3 gap-2 text-xs">
						<div
							class="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="text-slate-500">1. Client:</span>
							<p class="font-bold text-slate-900 dark:text-white">Encrypts HPKE</p>
						</div>
						<div
							class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-2.5 dark:border-indigo-900/60 dark:bg-indigo-950/40"
						>
							<span class="text-indigo-600 dark:text-indigo-400">2. OHTTP Relay:</span>
							<p class="font-bold text-slate-900 dark:text-white">Sees IP Only</p>
						</div>
						<div
							class="rounded-xl border border-emerald-200 bg-emerald-50/50 p-2.5 dark:border-emerald-900/60 dark:bg-emerald-950/40"
						>
							<span class="text-emerald-600 dark:text-emerald-400">3. Target Gateway:</span>
							<p class="font-bold text-slate-900 dark:text-white">Sees Payload Only</p>
						</div>
					</div>
					<p class="text-xs text-slate-600 dark:text-slate-400">
						Neither party possesses both the client IP address and the plain application request
						payload.
					</p>
				</div>
			{:else}
				<div class="space-y-2">
					<div
						class="flex items-center justify-between text-xs text-purple-600 dark:text-purple-400"
					>
						<span class="font-bold">Tor Hidden Service Routing Header</span>
						<span>RFC Onion-Location</span>
					</div>
					<div class="rounded-xl bg-slate-900 p-3 text-xs text-purple-300">
						<code
							>Onion-Location: http://engine2026labsq4m6b5...onion/security/anonymity-oblivious</code
						>
					</div>
					<p class="text-xs text-slate-600 dark:text-slate-400">
						Tor Browser automatically offers seamless 6-hop end-to-end encrypted onion routing
						without exit node sniffing.
					</p>
				</div>
			{/if}
		</div>

		<!-- Private State Token (PST / Privacy Pass RFC 9578) Card -->
		<div
			class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
		>
			<div class="flex items-center justify-between pb-2">
				<span class="text-xs font-bold text-slate-700 dark:text-slate-300">
					Private State Tokens (RFC 9578 Blind Auth)
				</span>
				<span class="rounded-md bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">
					{tokenCount} Tokens Remaining
				</span>
			</div>
			<p class="mb-3 text-xs text-slate-600 dark:text-slate-400">
				Cryptographically proves human verification or subscription status across origins without
				cross-site tracking.
			</p>
			<button
				onclick={redeemBlindToken}
				disabled={tokenCount === 0 || isRedeemingToken}
				class="w-full rounded-xl bg-indigo-600 py-2 text-xs font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50"
			>
				{isRedeemingToken ? 'Redeeming Blind Signature...' : 'Redeem 1 Private Token (Anonymous)'}
			</button>
		</div>
	</div>
</LabCard>
