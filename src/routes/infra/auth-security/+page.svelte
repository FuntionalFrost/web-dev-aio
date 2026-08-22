<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Simulated Passkey Flow State
	let passkeyStep = $state<'idle' | 'challenge' | 'credential' | 'verified'>('idle');
	let simulatedCredential = $state<{ id: string; rawId: string; type: string } | null>(null);

	function startPasskeyFlow() {
		passkeyStep = 'challenge';
		setTimeout(() => {
			passkeyStep = 'credential';
			simulatedCredential = {
				id: 'pk_credential_9f8a2b3c',
				rawId: 'kP8v...w9Qx',
				type: 'public-key'
			};
			setTimeout(() => {
				passkeyStep = 'verified';
			}, 700);
		}, 600);
	}

	function resetPasskey() {
		passkeyStep = 'idle';
		simulatedCredential = null;
	}
</script>

<LabShell
	moduleId="infra-auth-security"
	title={data.meta.title}
	description={data.meta.description}
>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock codeHtml={data.codeHtml} rawCode={data.rawCode} filename="auth-and-cookies.ts" />
		</div>

		<h3>Security Principles</h3>
		<ul>
			<li>
				<strong>Passkeys (WebAuthn):</strong> Cryptographic public-private keypairs anchored in hardware
				secure enclaves (TouchID, FaceID, Windows Hello). Immune to phishing and credential stuffing.
			</li>
			<li>
				<strong>HttpOnly Session Cookies:</strong> Cannot be read via JavaScript (<code
					>document.cookie</code
				>), protecting session IDs from XSS exfiltration.
			</li>
			<li>
				<strong>CSRF Mitigation:</strong> Pairing <code>SameSite: 'lax'</code> cookies with custom authorization
				headers or anti-forgery tokens prevents cross-site request forgery.
			</li>
		</ul>
	{/snippet}

	{#snippet sandbox()}
		<div class="space-y-6">
			<!-- Interactive Passkey Simulator -->
			<div
				class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
			>
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
				>
					<span
						class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
					>
						WebAuthn / Passkey Registration
					</span>
					<span class="font-mono text-[10px] text-slate-500">Public-Key Cryptography</span>
				</div>

				<div class="flex items-center justify-between">
					<button
						onclick={startPasskeyFlow}
						disabled={passkeyStep !== 'idle'}
						class="rounded-xl bg-indigo-600 px-4 py-2 font-mono text-xs font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-40"
					>
						{passkeyStep === 'idle' ? 'Register New Passkey' : 'Processing Biometric Handshake...'}
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

				<!-- Step Indicator -->
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
						class="rounded-lg border p-2.5 {passkeyStep === 'credential' ||
						passkeyStep === 'verified'
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
						3. Key Verified ✓
					</div>
				</div>

				{#if passkeyStep === 'verified' && simulatedCredential}
					<div
						class="space-y-1 rounded-xl border border-emerald-500/40 bg-emerald-50/50 p-3.5 font-mono text-xs text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300"
					>
						<div class="font-bold">Credential Registered in Secure Enclave:</div>
						<div>
							Credential ID: <span class="text-slate-900 dark:text-white"
								>{simulatedCredential.id}</span
							>
						</div>
						<div>
							Attestation: <span class="text-slate-900 dark:text-white"
								>Public Key Stored on Server</span
							>
						</div>
					</div>
				{/if}
			</div>

			<!-- Storage Security Trade-offs -->
			<div
				class="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 font-mono text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
			>
				<span
					class="block border-b border-slate-200 pb-2 text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:border-slate-800 dark:text-indigo-400"
				>
					Client Storage Security Evaluation
				</span>

				<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
					<div
						class="rounded-xl border border-emerald-500/30 bg-emerald-50/30 p-3 dark:bg-emerald-950/10"
					>
						<span class="block font-bold text-emerald-700 dark:text-emerald-400"
							>HttpOnly Cookie</span
						>
						<span class="mt-1 block text-[10px] text-slate-500">XSS Safe: YES</span>
						<p class="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
							Best for: Session IDs, Refresh Tokens
						</p>
					</div>
					<div class="rounded-xl border border-rose-500/30 bg-rose-50/30 p-3 dark:bg-rose-950/10">
						<span class="block font-bold text-rose-700 dark:text-rose-400">localStorage</span>
						<span class="mt-1 block text-[10px] text-slate-500">XSS Safe: NO</span>
						<p class="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
							Best for: Themes, non-sensitive UI state
						</p>
					</div>
					<div
						class="rounded-xl border border-amber-500/30 bg-amber-50/30 p-3 dark:bg-amber-950/10"
					>
						<span class="block font-bold text-amber-700 dark:text-amber-400">IndexedDB</span>
						<span class="mt-1 block text-[10px] text-slate-500">XSS Safe: NO</span>
						<p class="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
							Best for: Large offline datasets
						</p>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</LabShell>
