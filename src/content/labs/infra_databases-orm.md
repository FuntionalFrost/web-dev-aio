---
id: 'infra-databases-orm'
title: '19. Database Engines: Neon, Turso, libSQL, SQLite, PostgreSQL & postgres.js'
track: 'APIs & Data Architecture'
category: 'Backend & Data'
segment: 'infra'
slug: 'databases-orm'
tech:
  [
    'Neon Serverless',
    'Turso & libSQL',
    'postgres.js',
    'SQLite & better-sqlite3',
    'PostgreSQL (pg)',
    'Drizzle ORM'
  ]
description: 'Architect high-performance data layers across Neon Serverless Postgres, Turso edge libSQL, postgres.js, embedded SQLite, and stateful PostgreSQL with Drizzle ORM.'
snippetLang: 'typescript'
lastmod: '2026-02-15'
---

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
				Deno. Features zero dependencies, tagged-template literal queries, and native type serialisation.
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
