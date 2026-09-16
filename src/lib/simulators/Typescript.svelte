<script lang="ts">
	import LabCard from '$lib/components/LabCard.svelte';

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

<LabCard title="Discriminated Union Exhaustiveness Visualiser" badge="Strict Narrowing">
	<div class="space-y-4 font-mono text-sm">
		<div>
			<div class="mb-1.5 block font-bold text-slate-700 dark:text-slate-300">
				Select Event Variant:
			</div>
			<div class="grid grid-cols-3 gap-2">
				{#each ['LOGIN', 'LOGOUT', 'PASSWORD_RESET_REQUEST'] as const as evt (evt)}
					<button
						onclick={() => (selectedEventType = evt)}
						class="rounded-xl border p-2.5 text-center text-sm font-bold transition {selectedEventType ===
						evt
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
							: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
					>
						{evt}
					</button>
				{/each}
			</div>
		</div>

		<div
			class="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
		>
			<span class="text-sm font-bold text-slate-500 uppercase">Evaluated Payload:</span>
			<pre class="overflow-x-auto text-sm text-slate-800 dark:text-slate-200">{JSON.stringify(
					samplePayload,
					null,
					2
				)}</pre>
		</div>

		<div
			class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3.5 dark:border-indigo-900 dark:bg-indigo-950/30"
		>
			<span class="text-sm font-bold text-indigo-700 dark:text-indigo-300"
				>Exhaustive Narrowing Output:</span
			>
			<p class="mt-1 text-base font-bold text-slate-900 dark:text-white">
				{getNarrowedSummary(samplePayload as AuthEvent)}
			</p>
		</div>
	</div>
</LabCard>
