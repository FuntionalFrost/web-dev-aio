<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
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
		}, 3000);
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
				.then((result) => {
					promiseStatus = 'resolved';
					promisePayload = result;
				})
				.catch((err) => {
					promiseStatus = 'rejected';
					promisePayload = String(err);
				});
		} else {
			let resolve!: (val: string) => void;
			let reject!: (reason: string) => void;
			const promise = new Promise<string>((res, rej) => {
				resolve = res;
				reject = rej;
			});
			currentResolvers = { resolve, reject };

			promise
				.then((result) => {
					promiseStatus = 'resolved';
					promisePayload = result;
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

<LabShell moduleId="module-4" title={data.meta.title} description={data.meta.description}>
	{#snippet guide()}
		<div class="not-prose">
			<CodeBlock codeHtml={data.codeHtml} rawCode={data.rawCode} filename="resource-lifecycle.ts" />
		</div>

		<h3>Key Mechanics</h3>
		<ul>
			<li>
				<strong>using (Symbol.dispose):</strong> Scoped deterministic teardown for sockets, locks, and
				buffers.
			</li>
			<li>
				<strong>Promise.withResolvers():</strong> Direct access to resolve/reject capabilities without
				wrapper closures.
			</li>
		</ul>
	{/snippet}

	{#snippet sandbox()}
		<div class="flex flex-col gap-6">
			<div
				class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
			>
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
				>
					<span
						class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
					>
						Scoped Resource Allocator
					</span>
					<div class="flex items-center gap-2">
						<span
							class="inline-flex h-2 w-2 rounded-full {lockEngaged
								? 'animate-ping bg-emerald-500'
								: 'bg-slate-400'}"
						></span>
						<span class="font-mono text-xs text-slate-700 dark:text-slate-300"
							>{lockEngaged ? 'Mutex Locked' : 'Idle'}</span
						>
					</div>
				</div>

				<div class="flex gap-2">
					<button
						onclick={spawnResource}
						class="flex-1 rounded-xl bg-indigo-600 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
					>
						Spawn Scope (Auto-Dispose 3s)
					</button>
					<button
						onclick={purgeSessions}
						class="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
					>
						Clear
					</button>
				</div>

				<div class="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
					{#each activeSessions as session (session.id)}
						<div
							class="flex items-center justify-between rounded-lg border p-3 font-mono text-xs transition-all duration-300 {session.status ===
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
			</div>

			<!-- Promise.withResolvers Controller -->
			<div
				class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
			>
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
				>
					<span
						class="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
					>
						Promise.withResolvers Controller
					</span>
					<span
						class="rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold uppercase {promiseStatus ===
						'pending'
							? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'
							: promiseStatus === 'resolved'
								? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300'
								: promiseStatus === 'rejected'
									? 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300'
									: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}"
					>
						Status: {promiseStatus}
					</span>
				</div>

				<div class="flex gap-2">
					<button
						onclick={startAsyncStream}
						disabled={promiseStatus === 'pending'}
						class="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-medium text-slate-800 transition hover:bg-slate-200 disabled:opacity-40 dark:border-transparent dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
					>
						Init Promise
					</button>
					<button
						onclick={() => resolveManually('Payload received via resolve()')}
						disabled={promiseStatus !== 'pending'}
						class="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-emerald-500 disabled:opacity-40"
					>
						Resolve
					</button>
					<button
						onclick={() => rejectManually('Stream terminated via reject()')}
						disabled={promiseStatus !== 'pending'}
						class="rounded-lg bg-rose-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-rose-500 disabled:opacity-40"
					>
						Reject
					</button>
				</div>

				<div
					class="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="font-mono text-[11px] tracking-wider text-slate-500 uppercase">Buffer:</span>
					<p
						class="mt-2 font-mono text-xs {promiseStatus === 'rejected'
							? 'text-rose-600 dark:text-rose-400'
							: 'text-indigo-600 dark:text-indigo-300'}"
					>
						{promisePayload ||
							(promiseStatus === 'pending' ? 'Awaiting resolution signal...' : 'Idle')}
					</p>
				</div>
			</div>
		</div>
	{/snippet}
</LabShell>
