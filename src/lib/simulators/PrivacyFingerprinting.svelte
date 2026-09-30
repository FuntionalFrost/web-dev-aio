<script lang="ts">
	import LabCard from '$lib/components/LabCard.svelte';

	let enableGpc = $state(true);
	let enableCanvasJitter = $state(true);
	let enableAudioJitter = $state(true);
	let enableChips = $state(true);
	let enableLinkStrip = $state(true);

	let simulatedCanvasHash = $derived(
		enableCanvasJitter
			? `0x${Math.floor(Math.random() * 16777215)
					.toString(16)
					.toUpperCase()}-EPHEMERAL`
			: '0x3F8A7D9E-STATIC-FINGERPRINT'
	);

	let simulatedEntropyBits = $derived.by(() => {
		let bits = 24.5; // Highly unique baseline
		if (enableGpc) bits -= 3.0;
		if (enableCanvasJitter) bits -= 8.5;
		if (enableAudioJitter) bits -= 5.0;
		if (enableChips) bits -= 4.0;
		if (enableLinkStrip) bits -= 2.0;
		return Math.max(2.0, bits).toFixed(1);
	});

	let privacyRating = $derived.by(() => {
		const num = parseFloat(simulatedEntropyBits);
		if (num <= 5.0)
			return {
				label: 'Maximum Anonymity Pool',
				color: 'text-emerald-600 dark:text-emerald-400',
				bg: 'bg-emerald-500'
			};
		if (num <= 12.0)
			return {
				label: 'Moderate Privacy Shield',
				color: 'text-amber-600 dark:text-amber-400',
				bg: 'bg-amber-500'
			};
		return {
			label: 'High Fingerprinting Risk',
			color: 'text-rose-600 dark:text-rose-400',
			bg: 'bg-rose-500'
		};
	});
</script>

<LabCard title="Web Privacy & Anti-Fingerprinting Engine" badge="Privacy 2026">
	<div class="space-y-4 font-mono text-sm">
		<!-- Privacy Controls Toggle Grid -->
		<div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
			<button
				onclick={() => (enableGpc = !enableGpc)}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {enableGpc
					? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
					: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
			>
				{enableGpc ? '✓ Sec-GPC: 1 (Active)' : '✗ GPC Inactive'}
			</button>
			<button
				onclick={() => (enableCanvasJitter = !enableCanvasJitter)}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {enableCanvasJitter
					? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
					: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
			>
				{enableCanvasJitter ? '✓ Canvas Noise Jitter' : '✗ Static Canvas Hash'}
			</button>
			<button
				onclick={() => (enableAudioJitter = !enableAudioJitter)}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {enableAudioJitter
					? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
					: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
			>
				{enableAudioJitter ? '✓ AudioContext Jitter' : '✗ Audio Jitter Off'}
			</button>
			<button
				onclick={() => (enableChips = !enableChips)}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {enableChips
					? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
					: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
			>
				{enableChips ? '✓ CHIPS Partitioned' : '✗ Unpartitioned Cookies'}
			</button>
			<button
				onclick={() => (enableLinkStrip = !enableLinkStrip)}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {enableLinkStrip
					? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
					: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
			>
				{enableLinkStrip ? '✓ Strip utm_/fbclid' : '✗ Raw Tracking Params'}
			</button>
		</div>

		<!-- Entropy Meter Card -->
		<div
			class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
		>
			<div class="flex items-center justify-between">
				<span class="text-xs font-bold text-slate-600 dark:text-slate-400">
					Browser Entropy (Identifiability):
				</span>
				<span class="text-base font-bold {privacyRating.color}">
					{simulatedEntropyBits} bits ({privacyRating.label})
				</span>
			</div>

			<!-- Visual Meter Bar -->
			<div class="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
				<div
					class="h-full transition-all duration-300 {privacyRating.bg}"
					style="width: {Math.min(100, (parseFloat(simulatedEntropyBits) / 25) * 100)}%"
				></div>
			</div>

			<!-- Diagnostics Matrix -->
			<div class="space-y-1.5 border-t border-slate-200 pt-3 text-xs dark:border-slate-800">
				<div class="flex items-center justify-between">
					<span class="text-slate-500">2D Canvas Hash:</span>
					<span class="font-bold text-slate-800 dark:text-slate-200">{simulatedCanvasHash}</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-slate-500">Cookie Jar Isolation:</span>
					<span class="font-bold text-slate-800 dark:text-slate-200">
						{enableChips
							? 'Partitioned (Top-Level Site Context)'
							: 'Shared Third-Party (Cross-Site Leaked)'}
					</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-slate-500">Telemetry Compliance:</span>
					<span class="font-bold text-slate-800 dark:text-slate-200">
						{enableGpc
							? 'Opted-Out (No Sale / No Third-Party Analytics)'
							: 'Standard Analytics Allowed'}
					</span>
				</div>
			</div>
		</div>
	</div>
</LabCard>
