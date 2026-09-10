<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type AuthEvent =
		| { type: 'LOGIN'; userId: string; timestamp: number }
		| { type: 'LOGOUT'; userId: string }
		| { type: 'PASSWORD_RESET_REQUEST'; email: string };

	let selectedEventType = $state<AuthEvent['type']>('LOGIN');
	let samplePayload = $derived(
		selectedEventType === 'LOGIN'
			? { type: 'LOGIN', userId: 'usr_2026', timestamp: Date.now() }
			: selectedEventType === 'LOGOUT'
			? { type: 'LOGOUT', userId: 'usr_2026' }
			: { type: 'PASSWORD_RESET_REQUEST', email: 'dev@example.com' }
	);

	function getNarrowedSummary(event: AuthEvent): string {
		switch (event.type) {
			case 'LOGIN':
				return `[LOGIN] User ${event.userId} authenticated at ${new Date(event.timestamp).toLocaleTimeString()}`;
			case 'LOGOUT':
				return `[LOGOUT] User ${event.userId} terminated active session`;
			case 'PASSWORD_RESET_REQUEST':
				return `[RESET] Reset token dispatched to ${event.email}`;
		}
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>TypeScript 6 & Modern Strict Typing</h3>
		<p class="text-base sm:text-lg">
			TypeScript 6 provides sound type inference, const type parameters, the <code>satisfies</code> operator, and strict discriminated unions.
		</p>
		<ul>
			<li>
				<strong>The <code>satisfies</code> Operator:</strong> Enforces that an expression matches an interface without widening literal string or numeric types to general primitives.
			</li>
			<li>
				<strong>Const Type Parameters:</strong> Allows generic functions to infer literal tuple and object types automatically at the call site without requiring <code>as const</code>.
			</li>
			<li>
				<strong>Discriminated Unions & Exhaustiveness:</strong> Guarantees that all variants of an event or state machine are handled safely at compile time.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Discriminated Union Exhaustiveness Visualizer" badge="Strict Narrowing">
			<div class="space-y-4 font-mono text-sm">
				<div>
					<div class="block mb-1.5 font-bold text-slate-700 dark:text-slate-300">Select Event Variant:</div>
					<div class="grid grid-cols-3 gap-2">
						{#each (['LOGIN', 'LOGOUT', 'PASSWORD_RESET_REQUEST'] as const) as evt}
							<button
								onclick={() => (selectedEventType = evt)}
								class="rounded-xl border p-2.5 text-center font-bold text-sm transition {selectedEventType === evt
									? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
									: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
							>
								{evt}
							</button>
						{/each}
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 space-y-2">
					<span class="text-sm font-bold text-slate-500 uppercase">Evaluated Payload:</span>
					<pre class="overflow-x-auto text-sm text-slate-800 dark:text-slate-200">{JSON.stringify(samplePayload, null, 2)}</pre>
				</div>

				<div class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3.5 dark:border-indigo-900 dark:bg-indigo-950/30">
					<span class="text-sm font-bold text-indigo-700 dark:text-indigo-300">Exhaustive Narrowing Output:</span>
					<p class="mt-1 text-base font-bold text-slate-900 dark:text-white">{getNarrowedSummary(samplePayload as AuthEvent)}</p>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
