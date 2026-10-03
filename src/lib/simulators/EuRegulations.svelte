<script lang="ts">
	import LabCard from '#lib/components/LabCard.svelte';

	type DsarAction = 'export' | 'erase' | 'rectify';
	let selectedDsar = $state<DsarAction>('export');

	let simulatedUserId = $state('usr_eu_88392');
	let dsarProcessing = $state(false);
	let dsarAuditLog = $state<string[]>([]);

	type DataResidency = 'eu_sovereign' | 'us_standard_clauses';
	let dataResidency = $state<DataResidency>('eu_sovereign');

	let enableAiProvenance = $state(true);

	function executeDsar() {
		dsarProcessing = true;
		setTimeout(() => {
			const timestamp = new Date().toISOString();
			if (selectedDsar === 'export') {
				dsarAuditLog = [
					`[${timestamp}] GDPR Art. 20 Export generated: 14 relational records, 2 active sessions serialized to JSON.`,
					...dsarAuditLog
				];
			} else if (selectedDsar === 'erase') {
				dsarAuditLog = [
					`[${timestamp}] GDPR Art. 17 Erasure executed: PII wiped, Better Auth sessions revoked, tombstone hash committed.`,
					...dsarAuditLog
				];
			} else {
				dsarAuditLog = [
					`[${timestamp}] GDPR Art. 16 Rectification committed: Email and identity metadata updated in DB.`,
					...dsarAuditLog
				];
			}
			dsarProcessing = false;
		}, 500);
	}
</script>

<LabCard title="EU Data Regulations & Compliance Simulator" badge="Compliance 2026">
	<div class="space-y-4 font-mono text-sm">
		<!-- Regulations Section 1: GDPR DSAR Engine -->
		<div
			class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
		>
			<div class="flex items-center justify-between">
				<span class="text-xs font-bold text-slate-700 dark:text-slate-300">
					GDPR Data Subject Access Request (DSAR) Engine
				</span>
				<span class="text-xs font-bold text-indigo-600 dark:text-indigo-400"
					>Articles 15, 17 & 20</span
				>
			</div>

			<div class="grid grid-cols-3 gap-2">
				<button
					onclick={() => (selectedDsar = 'export')}
					class="rounded-xl border p-2 text-center text-xs font-bold transition {selectedDsar ===
					'export'
						? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
						: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
				>
					Export Data (Art 20)
				</button>
				<button
					onclick={() => (selectedDsar = 'erase')}
					class="rounded-xl border p-2 text-center text-xs font-bold transition {selectedDsar ===
					'erase'
						? 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
						: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
				>
					Right to Erasure (Art 17)
				</button>
				<button
					onclick={() => (selectedDsar = 'rectify')}
					class="rounded-xl border p-2 text-center text-xs font-bold transition {selectedDsar ===
					'rectify'
						? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
						: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
				>
					Rectify PII (Art 16)
				</button>
			</div>

			<div class="flex gap-2">
				<input
					type="text"
					bind:value={simulatedUserId}
					class="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
					placeholder="Target User ID"
				/>
				<button
					onclick={executeDsar}
					disabled={dsarProcessing}
					class="shrink-0 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50"
				>
					{dsarProcessing ? 'Executing...' : 'Run DSAR Pipeline'}
				</button>
			</div>

			{#if dsarAuditLog.length > 0}
				<div
					class="max-h-32 space-y-1 overflow-y-auto rounded-xl bg-slate-900 p-3 text-xs text-slate-200"
				>
					{#each dsarAuditLog as log, i (i)}
						<div class="leading-relaxed text-emerald-400">{log}</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Regulations Section 2: Sovereign Data Residency & EU AI Act -->
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
			<!-- EU Data Residency -->
			<div
				class="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-xs font-bold text-slate-700 dark:text-slate-300">
					Sovereign Cloud Data Residency
				</span>
				<div class="space-y-1 text-xs">
					<button
						onclick={() => (dataResidency = 'eu_sovereign')}
						class="w-full rounded-xl border p-2 text-left font-medium transition {dataResidency ===
						'eu_sovereign'
							? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
							: 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						🇪🇺 EU Sovereign (Frankfurt / Paris)
					</button>
					<button
						onclick={() => (dataResidency = 'us_standard_clauses')}
						class="w-full rounded-xl border p-2 text-left font-medium transition {dataResidency ===
						'us_standard_clauses'
							? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
							: 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						🌐 US Cloud (Standard Contractual Clauses)
					</button>
				</div>
			</div>

			<!-- EU AI Act Metadata -->
			<div
				class="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-xs font-bold text-slate-700 dark:text-slate-300">
					EU AI Act Article 50 Watermark
				</span>
				<p class="text-xs text-slate-600 dark:text-slate-400">
					Enforces machine-readable synthetic provenance headers for AI generated outputs.
				</p>
				<button
					onclick={() => (enableAiProvenance = !enableAiProvenance)}
					class="w-full rounded-xl border p-2 text-center text-xs font-bold transition {enableAiProvenance
						? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
						: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
				>
					{enableAiProvenance ? '✓ X-AI-Compliance Active' : '✗ AI Disclosure Off'}
				</button>
			</div>
		</div>
	</div>
</LabCard>
