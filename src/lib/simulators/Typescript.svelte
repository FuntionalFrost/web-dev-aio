<script lang="ts">
	import LabCard from '#lib/components/LabCard.svelte';
	import { CodeDiff } from 'yaxa-svelte';

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

	const looseCode = `// ❌ Loose interface: optional fields allow dangerous runtime bugs
interface LooseAuthEvent {
  type: string;
  userId?: string;
  timestamp?: number;
  email?: string;
}

function handleEvent(event: LooseAuthEvent) {
  if (event.type === 'LOGIN') {
    // Risky: userId might be undefined at runtime!
    console.log(event.userId.toUpperCase());
  }
}`;

	const strictCode = `// ✅ Strict TS6 Discriminated Union with exhaustive narrowing
type AuthEvent =
  | { type: 'LOGIN'; userId: string; timestamp: number }
  | { type: 'LOGOUT'; userId: string }
  | { type: 'PASSWORD_RESET_REQUEST'; email: string };

function handleEvent(event: AuthEvent): string {
  switch (event.type) {
    case 'LOGIN': return \`User \${event.userId} at \${event.timestamp}\`;
    case 'LOGOUT': return \`User \${event.userId} logged out\`;
    case 'PASSWORD_RESET_REQUEST': return \`Reset sent to \${event.email}\`;
    default: {
      const _exhaustive: never = event;
      throw new Error(\`Unhandled event variant: \${_exhaustive}\`);
    }
  }
}`;
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
			<span class="text-sm font-bold text-indigo-700 dark:text-indigo-300">
				Exhaustive Narrowing Output:
			</span>
			<p class="mt-1 text-base font-bold text-slate-900 dark:text-white">
				{getNarrowedSummary(samplePayload as AuthEvent)}
			</p>
		</div>

		<!-- Side-by-Side Type Evolution via CodeDiff -->
		<div class="pt-2">
			<span class="mb-2 block text-sm font-bold text-slate-500 uppercase">
				Type Evolution: Loose vs Strict Exhaustive Union:
			</span>
			<CodeDiff
				original={looseCode}
				modified={strictCode}
				filename="auth-events.ts"
				language="typescript"
				viewMode="unified"
				themeMode="adaptive"
				class="overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-800"
			/>
		</div>
	</div>
</LabCard>
