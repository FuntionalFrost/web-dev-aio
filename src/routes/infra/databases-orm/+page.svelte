<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Query Builder Sandbox State
	let selectedRole = $state<'all' | 'admin' | 'member'>('all');
	let minReputation = $state(50);
	let queryLimit = $state(5);

	// Connection Pool Simulation State
	let activePoolConnections = $state(12);
	const maxPoolCapacity = 20;
	let poolExhausted = $derived(activePoolConnections >= maxPoolCapacity);

	let compiledSQL = $derived.by(() => {
		let sql = `SELECT "id", "email", "role", "reputation"\nFROM "users"\nWHERE "reputation" >= ${minReputation}`;
		if (selectedRole !== 'all') {
			sql += `\n  AND "role" = '${selectedRole}'`;
		}
		sql += `\nORDER BY "reputation" DESC\nLIMIT ${queryLimit};`;
		return sql;
	});

	function simulateSpike() {
		activePoolConnections = Math.min(maxPoolCapacity, activePoolConnections + 4);
	}

	function drainPool() {
		activePoolConnections = 4;
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Serverless Databases & Drizzle ORM</h3>
		<p class="text-base sm:text-lg">
			Drizzle ORM operates as a zero-overhead TypeScript SQL query builder, combining compile-time type safety with serverless connection pooling via Neon or LibSQL.
		</p>
		<ul>
			<li>
				<strong>Drizzle Zero-Runtime Philosophy:</strong> Zero binary engines or query translation overhead; emits clean parameterized SQL executed directly over serverless HTTP/WebSocket pools.
			</li>
			<li>
				<strong>Serverless Connection Exhaustion:</strong> Avoid TCP connection starvation in lambda environments by routing queries through Neon HTTP proxies or PgBouncer pools.
			</li>
			<li>
				<strong>Schema-First Migrations:</strong> Strongly typed schema definitions in TypeScript with automated migration generation (<code>drizzle-kit generate</code>).
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: Type-Safe Query Builder -->
		<LabCard title="Type-Safe Query Builder Simulator" badge="Drizzle AST → SQL">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-3 gap-3 text-slate-600 dark:text-slate-400">
					<div>
						<label for="role-filter" class="mb-1 block font-bold text-slate-700 dark:text-slate-300">Filter Role</label>
						<select
							id="role-filter"
							bind:value={selectedRole}
							class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
						>
							<option value="all">All Roles</option>
							<option value="admin">admin</option>
							<option value="member">member</option>
						</select>
					</div>
					<div>
						<label for="min-rep" class="mb-1 block font-bold text-slate-700 dark:text-slate-300">Min Rep: {minReputation}</label>
						<input
							id="min-rep"
							type="range"
							min="0"
							max="500"
							step="25"
							bind:value={minReputation}
							class="mt-2 w-full accent-indigo-600"
						/>
					</div>
					<div>
						<label for="limit-val" class="mb-1 block font-bold text-slate-700 dark:text-slate-300">Limit: {queryLimit}</label>
						<input
							id="limit-val"
							type="range"
							min="1"
							max="20"
							bind:value={queryLimit}
							class="mt-2 w-full accent-indigo-600"
						/>
					</div>
				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm dark:border-slate-800 dark:bg-slate-950"
				>
					<span class="text-xs font-bold tracking-wider text-slate-400 uppercase">Compiled SQL Output:</span>
					<pre class="mt-2 font-bold whitespace-pre-wrap text-sm text-indigo-600 dark:text-indigo-300">{compiledSQL}</pre>
				</div>
			</div>
		</LabCard>

		<!-- Simulator 2: Serverless Connection Pool Guard -->
		<LabCard title="Serverless Connection Pool Guard" badge="Pooling Protocol">
			<div class="space-y-4 font-mono text-sm">
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
				>
					<span class="text-sm font-bold text-slate-600 dark:text-slate-400">Connection Pool Gauge</span>
					<div class="flex gap-2">
						<button
							onclick={simulateSpike}
							class="rounded-xl bg-indigo-600 px-4 py-2 font-bold text-sm text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500"
						>
							+ Traffic Spike
						</button>
						<button
							onclick={drainPool}
							class="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 font-bold text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
						>
							Drain Pool
						</button>
					</div>
				</div>

				<div class="space-y-2.5">
					<div class="flex justify-between text-base">
						<span class="text-slate-600 dark:text-slate-400">Pool Utilization:</span>
						<span
							class="font-bold {poolExhausted
								? 'text-rose-600 dark:text-rose-400'
								: 'text-slate-900 dark:text-white'}"
						>
							{activePoolConnections} / {maxPoolCapacity} Connections ({Math.round(
								(activePoolConnections / maxPoolCapacity) * 100
							)}%)
						</span>
					</div>
					<div class="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
						<div
							class="h-full transition-all duration-300 {poolExhausted
								? 'bg-rose-500'
								: activePoolConnections > 14
									? 'bg-amber-500'
									: 'bg-emerald-500'}"
							style="width: {(activePoolConnections / maxPoolCapacity) * 100}%"
						></div>
					</div>
					{#if poolExhausted}
						<div
							class="mt-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
						>
							⚠️ Connection limit reached: Serverless requests will be rejected without HTTP connection pooling proxies.
						</div>
					{/if}
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
