<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Better Auth Interactive Session Simulator
	type UserSession = {
		userId: string;
		email: string;
		role: 'owner' | 'admin' | 'member';
		activeOrg: string;
		authMethod: 'passkey' | 'oauth_github' | 'password';
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
				activeOrg: 'Venture Capital Labs LLC',
				authMethod: method,
				expiresAt: new Date(Date.now() + 7 * 86400000).toLocaleDateString()
			};
		}, 450);
	}

	function logout() {
		currentSession = null;
	}
</script>

<LabShell moduleId="infra-better-auth" title={data.meta.title} description={data.meta.description}>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock codeHtml={data.codeHtml} rawCode={data.rawCode} filename="better-auth.config.ts" />
		</div>

		<h3>Why Better Auth in 2026?</h3>
		<ul>
			<li>
				<strong>Complete Schema Ownership:</strong> Generates standard Drizzle/Prisma tables directly
				in your database without vendor lock-in.
			</li>
			<li>
				<strong>Modular Plugin Architecture:</strong> Enables Passkeys, 2FA, Multi-tenant Organizations,
				and Magic Links with single-line plugin additions.
			</li>
			<li>
				<strong>Framework-Agnostic:</strong> One unified auth engine runs seamlessly across SvelteKit,
				Nuxt, Astro, and Hono backends.
			</li>
		</ul>
	{/snippet}

	{#snippet sandbox()}
		<div
			class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
		>
			<div
				class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
			>
				<span
					class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
				>
					Better Auth Session Visualizer
				</span>
				<span
					class="rounded px-2 py-0.5 font-mono text-[10px] {currentSession
						? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
						: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}"
				>
					{currentSession ? 'Authenticated' : 'Unauthenticated'}
				</span>
			</div>

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
							<span>🔑 WebAuthn Passkey</span>
							<span class="mt-1 block text-[10px] font-normal text-slate-500"
								>Biometric TouchID / FaceID</span
							>
						</button>
						<button
							onclick={() => loginWith('oauth_github')}
							disabled={isAuthenticating}
							class="rounded-xl border border-slate-300 bg-slate-50 p-3 text-left font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
						>
							<span>🐙 OAuth 2.0 (GitHub)</span>
							<span class="mt-1 block text-[10px] font-normal text-slate-500"
								>PKCE State Token Exchange</span
							>
						</button>
						<button
							onclick={() => loginWith('password')}
							disabled={isAuthenticating}
							class="rounded-xl border border-slate-300 bg-slate-50 p-3 text-left font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
						>
							<span>✉️ Magic Link</span>
							<span class="mt-1 block text-[10px] font-normal text-slate-500"
								>Single-use Cryptographic Token</span
							>
						</button>
					</div>
				</div>
			{:else}
				<!-- Active Authenticated State -->
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
							<span class="text-[10px] text-slate-400 uppercase">User Identity</span>
							<p class="mt-1 font-bold text-slate-900 dark:text-white">{currentSession.email}</p>
							<span class="text-[10px] text-slate-500">ID: {currentSession.userId}</span>
						</div>
						<div
							class="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
						>
							<span class="text-[10px] text-slate-400 uppercase">Organization (RBAC)</span>
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
		</div>
	{/snippet}
</LabShell>
