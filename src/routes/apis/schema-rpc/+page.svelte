<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Simulated Runtime Form State
	let username = $state('ada');
	let email = $state('ada@lovelace.dev');
	let role = $state<'admin' | 'member' | 'viewer'>('admin');
	let consent = $state(true);

	// Runtime validation engine simulation (Standard Schema / Zod behavior)
	let validationErrors = $derived.by(() => {
		const errors: Record<string, string> = {};
		if (username.length < 3) errors.username = 'Username must be at least 3 characters.';
		if (username.length > 20) errors.username = 'Username cannot exceed 20 characters.';
		if (!email.includes('@') || !email.includes('.'))
			errors.email = 'Must be a valid email address.';
		return errors;
	});

	let isValid = $derived(Object.keys(validationErrors).length === 0);

	// Simulated RPC Dispatch
	let rpcResponse = $state<string | null>(null);
	let isSubmitting = $state(false);

	function dispatchRPC() {
		if (!isValid) return;
		isSubmitting = true;
		rpcResponse = null;

		setTimeout(() => {
			isSubmitting = false;
			rpcResponse = JSON.stringify(
				{
					status: 201,
					endpoint: 'POST /api/users',
					payload: {
						id: `usr_${Math.random().toString(36).substring(2, 9)}`,
						username,
						email,
						role,
						telemetryConsent: consent,
						createdAt: new Date().toISOString()
					},
					inferredSchemaType: 'CreateUserInput'
				},
				null,
				2
			);
		}, 400);
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Architectural Advantages</h3>
		<ul>
			<li>
				<strong>Runtime Boundary Safety:</strong> TypeScript types evaporate at build time. Standard Schema
				/ Zod validates untrusted JSON at the network boundary.
			</li>
			<li>
				<strong>End-to-End RPCs (Hono RPC):</strong> Exporting route definitions directly to the client
				enables auto-completion and compile-time contract enforcement without code-generation steps.
			</li>
			<li>
				<strong>OpenAPI 3.1 & Scalar:</strong> Generates standardized JSON specs automatically for third-party
				consumers.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard
			title="Runtime Schema & RPC Validator"
			badge={isValid ? 'Schema: VALID' : 'Schema: INVALID'}
		>
			<form
				onsubmit={(e) => {
					e.preventDefault();
					dispatchRPC();
				}}
				class="space-y-4 font-mono text-xs"
			>
				<div>
					<label for="username" class="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
						username: z.string().min(3).max(20)
					</label>
					<input
						id="username"
						type="text"
						bind:value={username}
						class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 {validationErrors.username
							? 'border-rose-500 bg-rose-50/20'
							: ''}"
					/>
					{#if validationErrors.username}
						<span class="mt-1 block text-[10px] text-rose-500">{validationErrors.username}</span>
					{/if}
				</div>

				<div>
					<label for="email" class="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
						email: z.string().email()
					</label>
					<input
						id="email"
						type="text"
						bind:value={email}
						class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 {validationErrors.email
							? 'border-rose-500 bg-rose-50/20'
							: ''}"
					/>
					{#if validationErrors.email}
						<span class="mt-1 block text-[10px] text-rose-500">{validationErrors.email}</span>
					{/if}
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="role" class="mb-1 block font-semibold text-slate-700 dark:text-slate-300">
							role: z.enum()
						</label>
						<select
							id="role"
							bind:value={role}
							class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
						>
							<option value="admin">admin</option>
							<option value="member">member</option>
							<option value="viewer">viewer</option>
						</select>
					</div>
					<div class="flex items-center gap-2 pt-6">
						<input
							id="consent"
							type="checkbox"
							bind:checked={consent}
							class="rounded border-slate-300 text-indigo-600 dark:border-slate-700"
						/>
						<label
							for="consent"
							class="cursor-pointer text-[11px] text-slate-700 dark:text-slate-300"
						>
							telemetryConsent
						</label>
					</div>
				</div>

				<button
					type="submit"
					disabled={!isValid || isSubmitting}
					class="w-full rounded-xl bg-indigo-600 py-2.5 font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-40"
				>
					{isSubmitting ? 'Validating & Invoking RPC...' : 'Dispatch Type-Safe RPC Call'}
				</button>
			</form>

			<!-- Response Telemetry -->
			<div
				class="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-[11px] tracking-wider text-slate-400 uppercase"
					>Typed RPC Server Response:</span
				>
				<pre
					class="mt-2 overflow-x-auto whitespace-pre-wrap text-indigo-600 dark:text-indigo-300">{rpcResponse ||
						'// Inferred payload will appear here after RPC dispatch...'}</pre>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
