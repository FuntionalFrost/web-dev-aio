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

	interface PromiseWithResolversResult<T> {
		promise: Promise<T>;
		resolve: (value: T) => void;
		reject: (reason?: unknown) => void;
	}

	interface ModernPromise {
		withResolvers?: <T>() => PromiseWithResolversResult<T>;
	}

	function startAsyncStream() {
		promiseStatus = 'pending';
		promisePayload = '';

		const modernPromise = Promise as unknown as ModernPromise;
		if (typeof modernPromise.withResolvers === 'function') {
			const { promise, resolve, reject } = modernPromise.withResolvers<string>();
			currentResolvers = {
				resolve: (v: string) => resolve(v),
				reject: (r: string) => reject(r)
			};

			promise
				.then((res: string) => {
					promiseStatus = 'resolved';
					promisePayload = res;
				})
				.catch((err: unknown) => {
					promiseStatus = 'rejected';
					promisePayload = String(err);
				});
		} else {
			let resCallback!: (v: string) => void;
			let rejCallback!: (r: string) => void;
			const promise = new Promise<string>((res, rej) => {
				resCallback = res;
				rejCallback = rej;
			});
			currentResolvers = { resolve: resCallback, reject: rejCallback };
			promise
				.then((res: string) => {
					promiseStatus = 'resolved';
					promisePayload = res;
				})
				.catch((err: unknown) => {
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
		<h3>Resource Scopes & Explicit Management</h3>
		<p class="text-base sm:text-lg">
			Explicit Resource Management (ERM) with <code>using</code> statements and decoupled promise resolvers
			streamline asynchronous lifecycle management.
		</p>
		<ul>
			<li>
				<strong><code>using (Symbol.dispose)</code>:</strong> Guarantees deterministic teardown for database
				connections, mutex locks, and file handles upon block scope exit.
			</li>
			<li>
				<strong><code>Promise.withResolvers()</code>:</strong> Exposes direct <code>resolve</code>
				and <code>reject</code> handles without nesting logic inside closure callbacks.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: Resource Scopes -->
		<LabCard title="Scoped Resource Allocator (ERM)" badge={lockEngaged ? 'Mutex Locked' : 'Idle'}>
			<div class="space-y-4 font-mono text-sm">
				<div class="flex gap-2">
					<button
						onclick={spawnResource}
						class="flex-1 rounded-xl bg-indigo-600 py-2.5 text-base font-bold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500"
					>
						Spawn Scope (Auto-Dispose 2.5s)
					</button>
					<button
						onclick={purgeSessions}
						class="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-base font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
					>
						Clear
					</button>
				</div>

				<div class="grid max-h-52 grid-cols-1 gap-2.5 overflow-y-auto sm:grid-cols-2">
					{#each activeSessions as session (session.id)}
						<div
							class="flex items-center justify-between rounded-xl border p-3 font-mono text-sm transition-all {session.status ===
							'active'
								? 'border-emerald-500/40 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300'
								: 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-950/40'}"
						>
							<div>
								<span class="text-base font-bold">ID: {session.id}</span>
								<span class="block text-sm text-slate-500">{session.createdAt}</span>
							</div>
							<span
								class="rounded-md px-2 py-1 text-sm font-bold uppercase {session.status === 'active'
									? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-500/30 dark:text-emerald-300'
									: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}"
							>
								{session.status}
							</span>
						</div>
					{:else}
						<div
							class="col-span-full rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-800"
						>
							No active resource scopes initialized.
						</div>
					{/each}
				</div>
			</div>
		</LabCard>

		<!-- Simulator 2: Promise.withResolvers -->
		<LabCard
			title="Promise.withResolvers Controller"
			badge={`Status: ${promiseStatus.toUpperCase()}`}
		>
			<div class="space-y-4 font-mono text-sm">
				<div class="flex gap-2">
					<button
						onclick={startAsyncStream}
						disabled={promiseStatus === 'pending'}
						class="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:bg-slate-200 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
					>
						Init Promise
					</button>
					<button
						onclick={() => resolveManually('Payload received via resolve()')}
						disabled={promiseStatus !== 'pending'}
						class="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:opacity-40"
					>
						Resolve
					</button>
					<button
						onclick={() => rejectManually('Stream terminated via reject()')}
						disabled={promiseStatus !== 'pending'}
						class="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-500 disabled:opacity-40"
					>
						Reject
					</button>
				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="text-sm font-bold text-slate-500 uppercase">Buffer Content:</span>
					<p
						class="mt-1 text-base font-bold {promiseStatus === 'rejected'
							? 'text-rose-600 dark:text-rose-400'
							: 'text-indigo-600 dark:text-indigo-400'}"
					>
						{promisePayload ||
							(promiseStatus === 'pending' ? 'Awaiting external resolution signal...' : 'Idle')}
					</p>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
