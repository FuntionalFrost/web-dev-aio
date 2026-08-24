<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// 1. Better Auth Session State
	type UserSession = {
		userId: string;
		email: string;
		role: 'owner' | 'admin' | 'member';
		activeOrg: string;
		authMethod: 'passkey' | 'oauth_github' | 'magic_link';
		expiresAt: string;
	};

	let currentSession = $state<UserSession | null>(null);
	let isAuthenticating = $state(false);

	function loginWith(method: UserSession['authMethod']) {
		isAuthenticating = true;
		setTimeout(() => {
			isAuthenticating = false;
			currentSession = {
				userId: 'usr_' + Math.random().toString(36).substring(2, 8),
				email: 'developer@modern-web.org',
				role: method === 'passkey' ? 'owner' : 'member',
				activeOrg: 'Venture Architecture Labs',
				authMethod: method,
				expiresAt: new Date(Date.now() + 7 * 86400000).toLocaleDateString()
			};
		}, 400);
	}

	function logout() {
		currentSession = null;
	}

	// 2. WebAuthn Hardware Handshake State
	let passkeyStep = $state<'idle' | 'challenge' | 'credential' | 'verified'>('idle');
	let simulatedCredential = $state<{ id: string; rawId: string; type: string } | null>(null);

	function startPasskeyFlow() {
		passkeyStep = 'challenge';
		setTimeout(() => {
			passkeyStep = 'credential';
			simulatedCredential = {
				id: 'pk_credential_' + Math.random().toString(36).substring(2, 10),
				rawId: 'kP8v...w9Qx',
				type: 'public-key'
			};
			setTimeout(() => {
				passkeyStep = 'verified';
			}, 600);
		}, 500);
	}

	function resetPasskey() {
		passkeyStep = 'idle';
		simulatedCredential = null;
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Security Architecture & Standards</h3>
		<ul>
			<li>
				<strong>Passkeys (WebAuthn):</strong> Asymmetric public-private keypairs anchored in hardware
				secure enclaves (TouchID, FaceID, Windows Hello). Phishing-proof by design.
			</li>
			<li>
				<strong>HttpOnly Session Cookies:</strong> Cannot be inspected via JavaScript (<code
					>document.cookie</code
				>), protecting session tokens against XSS exfiltration.
			</li>
			<li>
				<strong>Complete Schema Ownership:</strong> Generates standard Drizzle tables directly in Postgres
				without vendor lock-in or third-party user data hosting.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: Better Auth Session Visualizer -->
		<LabCard
			title="Better Auth Session Visualizer"
			badge={currentSession ? 'Authenticated' : 'Unauthenticated'}
		>
			{#if !currentSession}
				<div class="space-y-3 font-mono text-xs">
					<span class="block text-slate-600 dark:text-slate-400"
						>Select Authentication Strategy:</span
					>
					<div class="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
						<button
							onclick={() => loginWith('passkey')}
							disabled={isAuthenticating}
							class="rounded-xl border border-indigo-500/40 bg-indigo-50/50 p-3 text-left font-bold text-indigo-900 transition hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-200 dark:hover:bg-indigo-900/40"
						>
							<span>🔑 Passkey</span>
							<span class="mt-1 block text-[10px] font-normal text-slate-500"
								>TouchID / Biometrics</span
							>
						</button>
						<button
							onclick={() => loginWith('oauth_github')}
							disabled={isAuthenticating}
							class="rounded-xl border border-slate-300 bg-slate-50 p-3 text-left font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
						>
							<span>🐙 OAuth 2.0</span>
							<span class="mt-1 block text-[10px] font-normal text-slate-500">PKCE Exchange</span>
						</button>
						<button
							onclick={() => loginWith('magic_link')}
							disabled={isAuthenticating}
							class="rounded-xl border border-slate-300 bg-slate-50 p-3 text-left font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
						>
							<span>✉️ Magic Link</span>
							<span class="mt-1 block text-[10px] font-normal text-slate-500"
								>Crypto Single-Use</span
							>
						</button>
					</div>
				</div>
			{:else}
				<div class="space-y-4 font-mono text-xs">
					<div class="flex items-center justify-between">
						<span class="text-[11px] tracking-wider text-slate-400 uppercase"
							>Decoded HttpOnly Session:</span
						>
						<button
							onclick={logout}
							class="rounded-lg bg-rose-600 px-3 py-1 font-semibold text-white transition hover:bg-rose-500"
						>
							Sign Out
						</button>
					</div>

					<div class="grid grid-cols-2 gap-3">
						<div
							class="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
						>
							<span class="text-[10px] text-slate-400 uppercase">Identity</span>
							<p class="mt-1 font-bold text-slate-900 dark:text-white">{currentSession.email}</p>
							<span class="text-[10px] text-slate-500">ID: {currentSession.userId}</span>
						</div>
						<div
							class="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
						>
							<span class="text-[10px] text-slate-400 uppercase">RBAC Organization</span>
							<p class="mt-1 font-bold text-indigo-600 dark:text-indigo-400">
								{currentSession.activeOrg}
							</p>
							<span class="text-[10px] font-semibold text-emerald-600 uppercase"
								>Role: {currentSession.role}</span
							>
						</div>
					</div>

					<div
						class="flex justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
					>
						<span
							>Verified Via: <strong class="text-slate-900 dark:text-white"
								>{currentSession.authMethod}</strong
							></span
						>
						<span
							>Expires: <strong class="text-slate-900 dark:text-white"
								>{currentSession.expiresAt}</strong
							></span
						>
					</div>
				</div>
			{/if}
		</LabCard>

		<!-- Simulator 2: Hardware WebAuthn Step Handshake -->
		<LabCard title="WebAuthn Hardware Handshake" badge="Public-Key Cryptography">
			<div class="flex items-center justify-between">
				<button
					onclick={startPasskeyFlow}
					disabled={passkeyStep !== 'idle'}
					class="rounded-xl bg-indigo-600 px-4 py-2 font-mono text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-40"
				>
					{passkeyStep === 'idle' ? 'Run Hardware Handshake' : 'Authenticating Secure Enclave...'}
				</button>
				{#if passkeyStep !== 'idle'}
					<button
						onclick={resetPasskey}
						class="font-mono text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
					>
						Reset
					</button>
				{/if}
			</div>

			<div class="grid grid-cols-3 gap-2 font-mono text-[11px]">
				<div
					class="rounded-lg border p-2.5 {passkeyStep === 'challenge' ||
					passkeyStep === 'credential' ||
					passkeyStep === 'verified'
						? 'border-indigo-500 bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200'
						: 'border-slate-200 text-slate-400 dark:border-slate-800'}"
				>
					1. Server Challenge
				</div>
				<div
					class="rounded-lg border p-2.5 {passkeyStep === 'credential' || passkeyStep === 'verified'
						? 'border-indigo-500 bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200'
						: 'border-slate-200 text-slate-400 dark:border-slate-800'}"
				>
					2. Biometric Sign
				</div>
				<div
					class="rounded-lg border p-2.5 {passkeyStep === 'verified'
						? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
						: 'border-slate-200 text-slate-400 dark:border-slate-800'}"
				>
					3. Verified ✓
				</div>
			</div>

			{#if passkeyStep === 'verified' && simulatedCredential}
				<div
					class="space-y-1 rounded-xl border border-emerald-500/40 bg-emerald-50/50 p-3.5 font-mono text-xs text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300"
				>
					<div class="font-bold">Credential Registered in Secure Enclave:</div>
					<div>
						ID: <span class="text-slate-900 dark:text-white">{simulatedCredential.id}</span>
					</div>
					<div>
						Attestation: <span class="text-slate-900 dark:text-white"
							>Public Key Stored in Database</span
						>
					</div>
				</div>
			{/if}
		</LabCard>

		<!-- Simulator 3: Storage Threat Model Matrix -->
		<LabCard title="Client Storage Threat Evaluation" badge="XSS Mitigation">
			<div class="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-3">
				<div
					class="rounded-xl border border-emerald-500/30 bg-emerald-50/30 p-3 dark:bg-emerald-950/10"
				>
					<span class="block font-bold text-emerald-700 dark:text-emerald-400">HttpOnly Cookie</span
					>
					<span class="mt-1 block text-[10px] text-slate-500">XSS Safe: YES</span>
					<p class="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
						Session IDs, Auth Tokens
					</p>
				</div>
				<div class="rounded-xl border border-rose-500/30 bg-rose-50/30 p-3 dark:bg-rose-950/10">
					<span class="block font-bold text-rose-700 dark:text-rose-400">localStorage</span>
					<span class="mt-1 block text-[10px] text-slate-500">XSS Safe: NO</span>
					<p class="mt-2 text-[11px] text-slate-600 dark:text-slate-400">Themes, UI preferences</p>
				</div>
				<div class="rounded-xl border border-amber-500/30 bg-amber-50/30 p-3 dark:bg-amber-950/10">
					<span class="block font-bold text-amber-700 dark:text-amber-400">IndexedDB</span>
					<span class="mt-1 block text-[10px] text-slate-500">XSS Safe: NO</span>
					<p class="mt-2 text-[11px] text-slate-600 dark:text-slate-400">Offline cached bundles</p>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
