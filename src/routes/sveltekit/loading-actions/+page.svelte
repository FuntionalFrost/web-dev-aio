<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let subscriberEmail = $state('');
	let formStatus = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let statusMessage = $state('');

	async function simulateFormAction(e: SubmitEvent) {
		e.preventDefault();
		formStatus = 'submitting';

		await new Promise((r) => setTimeout(r, 600));

		if (!subscriberEmail || !subscriberEmail.includes('@')) {
			formStatus = 'error';
			statusMessage = 'fail(400, { email, error: "A valid corporate or personal email is required." })';
		} else {
			formStatus = 'success';
			statusMessage = `200 Success: Subscribed ${subscriberEmail} with zero JavaScript fallback support!`;
			subscriberEmail = '';
		}
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Data Loading, Form Actions & Remote Functions</h3>
		<p class="text-base sm:text-lg">
			SvelteKit provides end-to-end type safety between server data loaders (<code>+page.server.ts</code>), page components, and progressive enhancement form actions.
		</p>
		<ul>
			<li>
				<strong>Server <code>load</code> vs Universal <code>load</code>:</strong> <code>+page.server.ts</code> runs exclusively on the server (accessing databases and secrets); <code>+page.ts</code> runs universally for caching and static generation.
			</li>
			<li>
				<strong>Form Actions & <code>use:enhance</code>:</strong> Works without client JavaScript via standard HTML form POSTs, yet seamlessly progressively enhances into client-side AJAX with optimistic UI.
			</li>
			<li>
				<strong>Validation with <code>fail()</code>:</strong> Return validation errors with HTTP status codes without throwing exceptions or losing user input.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Progressive Enhancement Form Actions Simulator" badge="use:enhance">
			<form onsubmit={simulateFormAction} class="space-y-4 font-mono text-sm">
				<div>
					<label for="sub-email" class="block mb-1 font-bold text-slate-700 dark:text-slate-300">
						Newsletter Subscriber Email:
					</label>
					<div class="flex gap-2">
						<input
							id="sub-email"
							type="text"
							bind:value={subscriberEmail}
							placeholder="engineer@domain.com"
							class="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-base text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
						/>
						<button
							type="submit"
							disabled={formStatus === 'submitting'}
							class="rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-base text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:opacity-50"
						>
							{formStatus === 'submitting' ? 'Posting...' : 'Dispatch Action'}
						</button>
					</div>
				</div>

				{#if statusMessage}
					<div
						class="rounded-xl border p-4 {formStatus === 'success'
							? 'border-emerald-500/40 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300'
							: 'border-rose-500/40 bg-rose-50 text-rose-900 dark:bg-rose-950/30 dark:text-rose-300'}"
					>
						<span class="text-xs font-bold uppercase">{formStatus === 'success' ? 'Server Return:' : 'Validation Failure:'}</span>
						<p class="mt-1 text-base font-bold">{statusMessage}</p>
					</div>
				{/if}
			</form>
		</LabCard>
	{/snippet}
</LabShell>
