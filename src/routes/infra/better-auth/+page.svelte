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
				email: 'engineer@modern-web.org',
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
		<h3>Modern Authentication, Passkeys & Better Auth</h3>
		<p class="text-base sm:text-lg">
			Better Auth provides a comprehensive TypeScript authentication runtime with passwordless WebAuthn passkeys, HttpOnly cookie rotation, and organization multi-tenancy.
		</p>
		<ul>
			<li>
				<strong>Passkeys (WebAuthn):</strong> Asymmetric public-private keypairs anchored in hardware secure enclaves (TouchID, FaceID, Windows Hello) that are immune to phishing.
			</li>
			<li>
				<strong>HttpOnly Session Cookies:</strong> Completely isolated from client JavaScript (<code>document.cookie</code>), protecting session tokens against XSS exfiltration.
			</li>
			<li>
				<strong>Schema Ownership:</strong> Better Auth creates native Drizzle tables in your own database without third-party auth vendor lock-in.
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
				<div class="space-y-4 font-mono text-sm">
					<span class="block text-sm font-bold text-slate-700 dark:text-slate-300">
						Select Authentication Strategy:
					</span>
					<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
						<button
							onclick={() => loginWith('passkey')}
							disabled={isAuthenticating}
							class="rounded-2xl border border-indigo-500/40 bg-indigo-50/50 p-4 text-left font-bold text-indigo-900 transition hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-200 dark:hover:bg-indigo-900/40"
						>
							<span class="text-base">🔑 Passkey</span>
							<span class="mt-1 block text-xs font-normal text-slate-500">TouchID / Biometrics</span>
						</button>
						<button
							onclick={() => loginWith('oauth_github')}
							disabled={isAuthenticating}
							class="rounded-2xl border border-slate-300 bg-slate-50 p-4 text-left font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
						>
							<span class="text-base">🐙 OAuth 2.0</span>
							<span class="mt-1 block text-xs font-normal text-slate-500">PKCE Exchange</span>
						</button>
						<button
							onclick={() => loginWith('magic_link')}
							disabled={isAuthenticating}
							class="rounded-2xl border border-slate-300 bg-slate-50 p-4 text-left font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
						>
							<span class="text-base">✉️ Magic Link</span>
							<span class="mt-1 block text-xs font-normal text-slate-500">Single-Use Token</span>
						</button>
					</div>
				</div>
			{:else}
				<div class="space-y-4 font-mono text-sm">
					<div class="flex items-center justify-between">
						<span class="text-xs font-bold tracking-wider text-slate-400 uppercase">
							Decoded HttpOnly Session:
						</span>
						<button
							onclick={logout}
							class="rounded-xl bg-rose-600 px-4 py-1.5 font-bold text-sm text-white transition hover:bg-rose-500"
						>
							Sign Out
						</button>
					</div>

					<div class="grid grid-cols-2 gap-3">
						<div
							class="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950"
						>
							<span class="text-xs font-bold text-slate-400 uppercase">Identity</span>
							<p class="mt-1 text-base font-bold text-slate-900 dark:text-white">{currentSession.email}</p>
							<span class="text-xs text-slate-500">ID: {currentSession.userId}</span>
						</div>
						<div
							class="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950"
						>
							<span class="text-xs font-bold text-slate-400 uppercase">Organization</span>
							<p class="mt-1 text-base font-bold text-indigo-600 dark:text-indigo-400">
								{currentSession.activeOrg}
							</p>
							<span class="text-xs font-bold text-emerald-600 uppercase">Role: {currentSession.role}</span>
						</div>
					</div>
				</div>
			{/if}
		</LabCard>

		<!-- Simulator 2: Hardware WebAuthn Step Handshake -->
		<LabCard title="WebAuthn Hardware Handshake" badge="Public-Key Cryptography">
			<div class="space-y-4 font-mono text-sm">
				<div class="flex items-center justify-between">
					<button
						onclick={startPasskeyFlow}
						disabled={passkeyStep !== 'idle'}
						class="rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-base text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-40"
					>
						{passkeyStep === 'idle' ? 'Run Hardware Handshake' : 'Authenticating Secure Enclave...'}
					</button>
					{#if passkeyStep !== 'idle'}
						<button
							onclick={resetPasskey}
							class="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
						>
							Reset
						</button>
					{/if}
				</div>

				<div class="grid grid-cols-3 gap-2 text-xs sm:text-sm font-bold">
					<div
						class="rounded-xl border p-3 text-center {passkeyStep === 'challenge' ||
						passkeyStep === 'credential' ||
						passkeyStep === 'verified'
							? 'border-indigo-500 bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200'
							: 'border-slate-200 text-slate-400 dark:border-slate-800'}"
					>
						1. Challenge
					</div>
					<div
						class="rounded-xl border p-3 text-center {passkeyStep === 'credential' || passkeyStep === 'verified'
							? 'border-indigo-500 bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200'
							: 'border-slate-200 text-slate-400 dark:border-slate-800'}"
					>
						2. Biometric Sign
					</div>
					<div
						class="rounded-xl border p-3 text-center {passkeyStep === 'verified'
							? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
							: 'border-slate-200 text-slate-400 dark:border-slate-800'}"
					>
						3. Verified ✓
					</div>
				</div>

				{#if passkeyStep === 'verified' && simulatedCredential}
					<div
						class="space-y-1.5 rounded-2xl border border-emerald-500/40 bg-emerald-50/50 p-4 text-sm text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
					>
						<div class="font-bold text-base">Credential Enrolled in Hardware Enclave:</div>
						<div>ID: <span class="text-slate-900 dark:text-white font-bold">{simulatedCredential.id}</span></div>
						<div>Attestation: <span class="text-slate-900 dark:text-white font-bold">Public Key Stored in Database</span></div>
					</div>
				{/if}
			</div>
		</LabCard>
	{/snippet}
</LabShell>
