<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type DbEngine = 'neon' | 'turso' | 'postgresjs' | 'sqlite' | 'postgres';

	interface EngineProfile {
		id: DbEngine;
		name: string;
		badge: string;
		dialect: 'PostgreSQL' | 'LibSQL (SQLite)' | 'SQLite' | 'PostgreSQL';
		transport: string;
		coldStart: string;
		edgeCompatibility: string;
		replication: string;
		summary: string;
		codeSample: string;
	}

	const ENGINE_PROFILES: Record<DbEngine, EngineProfile> = {
		neon: {
			id: 'neon',
			name: 'Neon Serverless Postgres',
			badge: 'Serverless HTTP / WS',
			dialect: 'PostgreSQL',
			transport: 'Stateless HTTP Query Proxy / WebSockets',
			coldStart: '< 10ms (Scale to Zero Compute)',
			edgeCompatibility: 'Native (Cloudflare Workers, Vercel Edge, Deno, Bun)',
			replication: 'Instant Copy-on-Write Database Branching',
			summary:
				'Fully-managed PostgreSQL architecture with compute and storage separated. Executes queries via sub-millisecond HTTP proxies to eliminate TCP pool exhaustion in serverless edge lambdas.',
			codeSample: `import { neon } from '@neondatabase/serverless';\nimport { drizzle } from 'drizzle-orm/neon-http';\n\nconst sql = neon(process.env.DATABASE_URL!);\nexport const db = drizzle(sql);`
		},
		turso: {
			id: 'turso',
			name: 'Turso & libSQL',
			badge: 'Distributed Edge SQLite',
			dialect: 'LibSQL (SQLite)',
			transport: 'LibSQL HTTP / WebSocket Protocol & Local File Sync',
			coldStart: '< 5ms Worldwide',
			edgeCompatibility: 'Native Worldwide Edge Network + Embedded Replicas',
			replication: 'Automatic Global Sync & Local File Replicas (syncUrl)',
			summary:
				'Distributed database powered by libSQL (open-source fork of SQLite). Supports embedded local replicas where reads execute in sub-millisecond local memory while writes propagate to primary clusters.',
			codeSample: `import { createClient } from '@libsql/client';\nimport { drizzle } from 'drizzle-orm/libsql';\n\nconst client = createClient({\n  url: process.env.TURSO_DATABASE_URL ?? 'file:local.db',\n  authToken: process.env.TURSO_AUTH_TOKEN,\n  syncUrl: process.env.TURSO_SYNC_URL\n});\nexport const db = drizzle(client);`
		},
		postgresjs: {
			id: 'postgresjs',
			name: 'postgres.js',
			badge: 'Zero-Dependency High-Perf PG',
			dialect: 'PostgreSQL',
			transport: 'Fast Direct TCP Stream with Tagged Template Literals',
			coldStart: '< 25ms Fast Socket Handshake',
			edgeCompatibility: 'Node.js, Bun, Deno, Containers, VPS',
			replication: 'Logical & Physical Streaming Replication Support',
			summary:
				'The fastest full-featured PostgreSQL client for Node.js, Bun, and Deno. Built with zero dependencies and native tagged template literals for parameterized SQL execution without parse overhead.',
			codeSample: `import postgres from 'postgres';\nimport { drizzle } from 'drizzle-orm/postgres-js';\n\n// Direct tagged-template SQL client\nconst sql = postgres(process.env.DATABASE_URL!, {\n  max: 10,\n  idle_timeout: 20\n});\nexport const db = drizzle(sql);`
		},
		sqlite: {
			id: 'sqlite',
			name: 'SQLite & better-sqlite3',
			badge: 'Single-File In-Process',
			dialect: 'SQLite',
			transport: 'In-Process Direct Memory / POSIX File I/O',
			coldStart: '0ms (Instantaneous)',
			edgeCompatibility: 'Serverful Nodes / Localhost / Desktop (Tauri / Electron)',
			replication: 'WAL (Write-Ahead Logging) Single-Node / Litestream Backup',
			summary:
				'Zero-configuration, serverless, self-contained SQL database engine. Perfect for single-container microservices, local development environments, test fixtures, and embedded edge devices with WAL mode.',
			codeSample: `import Database from 'better-sqlite3';\nimport { drizzle } from 'drizzle-orm/better-sqlite3';\n\nconst sqlite = new Database('app.db');\nsqlite.pragma('journal_mode = WAL');\nexport const db = drizzle(sqlite);`
		},
		postgres: {
			id: 'postgres',
			name: 'PostgreSQL (pg Pool)',
			badge: 'Enterprise Relational DBMS',
			dialect: 'PostgreSQL',
			transport: 'Stateful TCP Sockets with Connection Pool',
			coldStart: '150 - 300ms (TCP + TLS Handshake)',
			edgeCompatibility: 'Long-running servers (Node.js, VPS, Docker, K8s)',
			replication: 'Physical Streaming Replication / Logical Decode / WAL-G',
			summary:
				'The world standard enterprise relational database with rich support for JSONB indexing, Row Level Security (RLS), full-text search vectors, pgvector embeddings, and high-concurrency transactions.',
			codeSample: `import { Pool } from 'pg';\nimport { drizzle } from 'drizzle-orm/node-postgres';\n\nconst pool = new Pool({ max: 20, connectionString: process.env.DATABASE_URL });\nexport const db = drizzle(pool);`
		}
	};

	let activeEngine = $state<DbEngine>('neon');
	let selectedProfile = $derived(ENGINE_PROFILES[activeEngine]);

	// Query Builder Sandbox State
	let selectedRole = $state<'all' | 'admin' | 'member'>('all');
	let minReputation = $state(50);
	let queryLimit = $state(5);

	// Connection Pool Simulation State
	let activePoolConnections = $state(12);
	const maxPoolCapacity = 20;
	let poolExhausted = $derived(activePoolConnections >= maxPoolCapacity);

	let compiledSQL = $derived.by(() => {
		const isPg =
			activeEngine === 'neon' || activeEngine === 'postgres' || activeEngine === 'postgresjs';
		const quote = isPg ? '"' : '`';
		let sql = `SELECT ${quote}id${quote}, ${quote}email${quote}, ${quote}role${quote}, ${quote}reputation${quote}\nFROM ${quote}users${quote}\nWHERE ${quote}reputation${quote} >= ${minReputation}`;
		if (selectedRole !== 'all') {
			sql += `\n  AND ${quote}role${quote} = '${selectedRole}'`;
		}
		sql += `\nORDER BY ${quote}reputation${quote} DESC\nLIMIT ${queryLimit};`;
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
		<h3>Modern Database Engines & Drizzle ORM</h3>
		<p class="text-base sm:text-lg">
			Selecting the right database engine and transport protocol determines application latency,
			edge compatibility, concurrency limits, and operational complexity.
		</p>
		<ul>
			<li>
				<strong>Neon Serverless Postgres:</strong> Separates compute from storage, scaling compute to
				zero when idle and executing queries over sub-millisecond HTTP/WebSocket connections to solve
				serverless lambda connection starvation.
			</li>
			<li>
				<strong>Turso & libSQL:</strong> Distributed SQLite for global edge deployments powered by libSQL.
				Features embedded local file replicas that execute reads directly from local in-memory/file storage
				with zero network hops.
			</li>
			<li>
				<strong>postgres.js:</strong> The fastest full-featured PostgreSQL client for Node.js, Bun, and
				Deno. Features zero dependencies, tagged-template literal queries, and native type serialization.
			</li>
			<li>
				<strong>SQLite & better-sqlite3:</strong> The world's most widely deployed database engine. In-process,
				zero-configuration with Write-Ahead Logging (WAL) concurrency, ideal for local development, embedded
				software, and single-container deployments.
			</li>
			<li>
				<strong>PostgreSQL (Stateful):</strong> The industry-standard ACID relational database with rich
				JSONB indexing, pgvector similarity search, and advanced transactional guarantees.
			</li>
			<li>
				<strong>Drizzle ORM:</strong> Zero-runtime TypeScript SQL query builder that maps type-safe schemas
				directly to SQL dialects without heavy query translation overhead.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: Interactive Database Engine Selector & Comparison Matrix -->
		<LabCard title="Database Architecture Matrix" badge="Engine Evaluator">
			<div class="space-y-4 font-mono text-sm sm:text-base">
				<!-- Engine Selector Tabs -->
				<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
					{#each Object.keys(ENGINE_PROFILES) as DbEngine[] as engineKey (engineKey)}
						{@const p = ENGINE_PROFILES[engineKey]}
						<button
							onclick={() => (activeEngine = engineKey)}
							class="rounded-xl border p-2.5 text-center text-sm font-bold transition-all {activeEngine ===
							engineKey
								? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-xs dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-200'
								: 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800'}"
						>
							<div class="truncate">{p.name.split(' ')[0]}</div>
							<div class="mt-0.5 text-sm font-normal text-slate-500 dark:text-slate-400">
								{p.dialect}
							</div>
						</button>
					{/each}
				</div>

				<!-- Active Engine Deep Dive Card -->
				<div
					class="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950"
				>
					<div
						class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800"
					>
						<div>
							<span class="text-base font-bold text-slate-900 dark:text-white"
								>{selectedProfile.name}</span
							>
							<span
								class="ml-2 rounded-md bg-indigo-100 px-2 py-0.5 text-sm font-bold text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300"
							>
								{selectedProfile.badge}
							</span>
						</div>
						<span class="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
							Cold Start: {selectedProfile.coldStart}
						</span>
					</div>

					<p class="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
						{selectedProfile.summary}
					</p>

					<div class="grid grid-cols-1 gap-3 pt-1 text-sm sm:grid-cols-2">
						<div
							class="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="block text-sm font-bold text-slate-500 uppercase dark:text-slate-400"
								>Transport Protocol:</span
							>
							<span class="mt-1 block font-bold text-slate-900 dark:text-white"
								>{selectedProfile.transport}</span
							>
						</div>
						<div
							class="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="block text-sm font-bold text-slate-500 uppercase dark:text-slate-400"
								>Edge Compatibility:</span
							>
							<span class="mt-1 block font-bold text-slate-900 dark:text-white"
								>{selectedProfile.edgeCompatibility}</span
							>
						</div>
						<div
							class="rounded-xl border border-slate-200 bg-white p-3 sm:col-span-2 dark:border-slate-800 dark:bg-slate-900"
						>
							<span class="block text-sm font-bold text-slate-500 uppercase dark:text-slate-400"
								>Replication & Branching:</span
							>
							<span class="mt-1 block font-bold text-slate-900 dark:text-white"
								>{selectedProfile.replication}</span
							>
						</div>
					</div>

					<div class="space-y-1.5 pt-2">
						<span class="text-sm font-bold text-slate-500 uppercase dark:text-slate-400"
							>Drizzle Driver Initialization:</span
						>
						<pre
							class="overflow-x-auto rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-bold text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-indigo-300">{selectedProfile.codeSample}</pre>
					</div>
				</div>
			</div>
		</LabCard>

		<!-- Simulator 2: Type-Safe Query Builder Simulator -->
		<LabCard title="Type-Safe Query Builder Simulator" badge="Drizzle AST → SQL">
			<div class="space-y-4 font-mono text-sm sm:text-base">
				<div class="grid grid-cols-1 gap-3 text-slate-600 sm:grid-cols-3 dark:text-slate-400">
					<div>
						<label for="role-filter" class="mb-1 block font-bold text-slate-700 dark:text-slate-300"
							>Filter Role</label
						>
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
						<label for="min-rep" class="mb-1 block font-bold text-slate-700 dark:text-slate-300"
							>Min Rep: {minReputation}</label
						>
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
						<label for="limit-val" class="mb-1 block font-bold text-slate-700 dark:text-slate-300"
							>Limit: {queryLimit}</label
						>
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
					<div
						class="flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800"
					>
						<span class="text-sm font-bold tracking-wider text-slate-500 uppercase"
							>Compiled SQL ({selectedProfile.dialect}):</span
						>
						<span class="text-sm font-bold text-indigo-600 dark:text-indigo-400"
							>Drizzle AST Output</span
						>
					</div>
					<pre
						class="mt-3 text-sm font-bold whitespace-pre-wrap text-indigo-600 sm:text-base dark:text-indigo-300">{compiledSQL}</pre>
				</div>
			</div>
		</LabCard>

		<!-- Simulator 3: Serverless Connection Pool Guard -->
		<LabCard title="Serverless Connection Pool Guard" badge="Pooling Protocol">
			<div class="space-y-4 font-mono text-sm sm:text-base">
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
				>
					<span class="text-sm font-bold text-slate-700 sm:text-base dark:text-slate-300"
						>TCP Pool Capacity</span
					>
					<div class="flex gap-2">
						<button
							onclick={simulateSpike}
							class="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500"
						>
							+ Traffic Spike
						</button>
						<button
							onclick={drainPool}
							class="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
						>
							Drain Pool
						</button>
					</div>
				</div>

				<div class="space-y-2.5">
					<div class="flex justify-between text-sm sm:text-base">
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
					<div class="h-3.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
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
							class="mt-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm font-semibold text-rose-700 sm:text-base dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
						>
							⚠️ TCP Connection limit reached! Traditional Postgres pools reject incoming edge
							lambdas. Use Neon HTTP query pipelines or Turso LibSQL to bypass TCP handshake limits.
						</div>
					{:else}
						<div
							class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
						>
							Active Architecture: {activeEngine === 'neon' || activeEngine === 'turso'
								? 'Stateless HTTP connection pooling enables unlimited concurrent serverless invocations.'
								: 'Stateful TCP pool actively reserving dedicated database server sockets.'}
						</div>
					{/if}
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
