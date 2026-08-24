<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	interface SessionItem {
		id: string;
		createdAt: string;
		status: 'active' | 'disposed';
	}

	let activeSessions = $state<SessionItem[]>([]);
	let lockEngaged = $state(false);

	type PromiseState = 'idle' | 'pending' | 'resolved' | 'rejected';
	let promiseStatus = $state<PromiseState>('idle');
	let promisePayload = $state<string>('');
	let currentResolvers = $state<{
		resolve: (val: string) => void;
		reject: (reason: string) => void;
	} | null>(null);

	function spawnResource() {
		const sessionId = Math.random().toString(36).substring(2, 8).toUpperCase();
		const newSession: SessionItem = {
			id: sessionId,
			createdAt: new Date().toLocaleTimeString(),
			status: 'active'
		};

		activeSessions = [newSession, ...activeSessions];
		lockEngaged = true;

		setTimeout(() => {
			activeSessions = activeSessions.map((s) =>
				s.id === sessionId ? { ...s, status: 'disposed' } : s
			);
			lockEngaged = activeSessions.some((s) => s.status === 'active');
		}, 2500);
	}

	function purgeSessions() {
		activeSessions = [];
		lockEngaged = false;
	}

	function startAsyncStream() {
		promiseStatus = 'pending';
		promisePayload = '';

		if (typeof Promise.withResolvers === 'function') {
			const { promise, resolve, reject } = Promise.withResolvers<string>();
			currentResolvers = { resolve, reject };

			promise
				.then((res) => {
					promiseStatus = 'resolved';
					promisePayload = res;
				})
				.catch((err) => {
					promiseStatus = 'rejected';
					promisePayload = String(err);
				});
		}
	}

	function resolveManually(value: string) {
		if (currentResolvers && promiseStatus === 'pending') {
			currentResolvers.resolve(value);
			currentResolvers = null;
		}
	}

	function rejectManually(reason: string) {
		if (currentResolvers && promiseStatus === 'pending') {
			currentResolvers.reject(reason);
			currentResolvers = null;
		}
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Key Mechanics</h3>
		<ul>
			<li>
				<strong><code>using (Symbol.dispose)</code>:</strong> Scoped deterministic teardown for sockets,
				DB handles, and locks.
			</li>
			<li>
				<strong><code>Promise.withResolvers()</code>:</strong> Direct access to <code>resolve</code>
				and <code>reject</code> callbacks without promise constructor closures.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: Resource Scopes -->
		<LabCard title="Scoped Resource Allocator" badge={lockEngaged ? 'Mutex Locked' : 'Idle'}>
			<div class="flex gap-2">
				<button
					onclick={spawnResource}
					class="flex-1 rounded-xl bg-indigo-600 py-2 font-mono text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500"
				>
					Spawn Scope (Auto-Dispose 2.5s)
				</button>
				<button
					onclick={purgeSessions}
					class="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
				>
					Clear
				</button>
			</div>

			<div class="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
				{#each activeSessions as session (session.id)}
					<div
						class="flex items-center justify-between rounded-lg border p-2.5 font-mono text-xs transition-all {session.status ===
						'active'
							? 'border-emerald-500/40 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300'
							: 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-950/40'}"
					>
						<div>
							<span class="font-bold">ID: {session.id}</span>
							<span class="block text-[10px] text-slate-500">{session.createdAt}</span>
						</div>
						<span
							class="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase {session.status ===
							'active'
								? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-300'
								: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-500'}"
						>
							{session.status}
						</span>
					</div>
				{:else}
					<div
						class="col-span-full rounded-lg border border-dashed border-slate-300 p-4 text-center font-mono text-xs text-slate-500 dark:border-slate-800"
					>
						No active resource scopes initialized.
					</div>
				{/each}
			</div>
		</LabCard>

		<!-- Simulator 2: Promise.withResolvers -->
		<LabCard title="Promise.withResolvers Controller" badge={`Status: ${promiseStatus}`}>
			<div class="flex gap-2 font-mono text-xs">
				<button
					onclick={startAsyncStream}
					disabled={promiseStatus === 'pending'}
					class="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-slate-800 transition hover:bg-slate-200 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
				>
					Init Promise
				</button>
				<button
					onclick={() => resolveManually('Payload received via resolve()')}
					disabled={promiseStatus !== 'pending'}
					class="rounded-lg bg-emerald-600 px-3 py-2 text-white transition hover:bg-emerald-500 disabled:opacity-40"
				>
					Resolve
				</button>
				<button
					onclick={() => rejectManually('Stream terminated via reject()')}
					disabled={promiseStatus !== 'pending'}
					class="rounded-lg bg-rose-600 px-3 py-2 text-white transition hover:bg-rose-500 disabled:opacity-40"
				>
					Reject
				</button>
			</div>

			<div
				class="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-[10px] text-slate-500 uppercase">Buffer:</span>
				<p
					class="mt-1 font-semibold {promiseStatus === 'rejected'
						? 'text-rose-600 dark:text-rose-400'
						: 'text-indigo-600 dark:text-indigo-400'}"
				>
					{promisePayload ||
						(promiseStatus === 'pending' ? 'Awaiting resolution signal...' : 'Idle')}
				</p>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
