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
		<h3>Database Architecture Fundamentals</h3>
		<ul>
			<li>
				<strong>Drizzle vs. Traditional ORMs:</strong> Drizzle operates as a thin TypeScript SQL dialect
				compiler with zero runtime binary engines, reducing bundle overhead and cold start times.
			</li>
			<li>
				<strong>The Serverless Connection Exhaustion Problem:</strong> Each serverless function instance
				opens its own TCP connection. Without proxy poolers (PgBouncer, Neon WebSockets, AWS RDS Proxy),
				database connection limits are rapidly overwhelmed.
			</li>
			<li>
				<strong>Zero-Downtime Migrations:</strong> Apply additive schema changes (e.g., adding nullable
				columns) before updating application code, followed by cleanup phases to avoid runtime lockouts.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: Type-Safe Query Builder -->
		<LabCard title="Type-Safe Query Builder Simulator" badge="Drizzle AST → SQL">
			<div class="grid grid-cols-3 gap-3 font-mono text-xs text-slate-600 dark:text-slate-400">
				<div>
					<label for="role-filter" class="mb-1 block">Filter Role</label>
					<select
						id="role-filter"
						bind:value={selectedRole}
						class="w-full rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					>
						<option value="all">All Roles</option>
						<option value="admin">admin</option>
						<option value="member">member</option>
					</select>
				</div>
				<div>
					<label for="min-rep" class="mb-1 block">Min Rep: {minReputation}</label>
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
					<label for="limit-val" class="mb-1 block">Limit: {queryLimit}</label>
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
				class="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
			>
				<span class="text-[11px] tracking-wider text-slate-400 uppercase">Compiled SQL Output:</span
				>
				<pre
					class="mt-2 font-bold whitespace-pre-wrap text-indigo-600 dark:text-indigo-300">{compiledSQL}</pre>
			</div>
		</LabCard>

		<!-- Simulator 2: Serverless Connection Pool Guard -->
		<LabCard title="Serverless Connection Pool Guard" badge="Pooling Protocol">
			<div
				class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
			>
				<span class="font-mono text-xs text-slate-500">Connection Gauge</span>
				<div class="flex gap-2">
					<button
						onclick={simulateSpike}
						class="rounded-lg bg-indigo-600 px-3 py-1 font-mono text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500"
					>
						+ Traffic Spike
					</button>
					<button
						onclick={drainPool}
						class="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
					>
						Drain Pool
					</button>
				</div>
			</div>

			<div class="space-y-2 font-mono text-xs">
				<div class="flex justify-between">
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
				<div class="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
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
						class="mt-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-[11px] text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
					>
						⚠️ Connection limit reached: Additional serverless requests will be queued or rejected
						without a connection pool proxy.
					</div>
				{/if}
			</div>
		</LabCard>
	{/snippet}
</LabShell>
