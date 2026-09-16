---
id: 'runtime-project-structures'
title: '09. Modern Project Types & Directory Structures'
track: 'Runtimes & Engines'
category: 'Project Architecture'
segment: 'runtimes'
slug: 'project-structures'
tech:
  [
    'Full-Stack App Hierarchy',
    'Library Architecture',
    'Monorepos',
    'SSG vs Full-Stack',
    'Server Isolation'
  ]
description: 'Architect production-grade codebases across full-stack applications, static sites, component libraries, and enterprise monorepo workspace hierarchies.'
snippetLang: 'typescript'
lastmod: '2026-02-15'
---

<h3>Modern Project Types & Directory Structures</h3>
		<p class="text-base sm:text-lg">
			Choosing the right project topology is fundamental to long-term maintainability, code reuse,
			and team velocity.
		</p>
		<ul>
			<li>
				<strong>SvelteKit 2 Layout:</strong> Enforces strong server-side isolation with
				<code>$lib/server</code>
				and deterministic page routing with <code>+page.server.ts</code> and
				<code>hooks.server.ts</code>.
			</li>
			<li>
				<strong>Nuxt 4 Structure:</strong> Centralises frontend components and composables in
				<code>app/</code>
				while isolating backend endpoints in <code>server/api/</code>.
			</li>
			<li>
				<strong>Monorepo Topologies:</strong> Organises large teams into decoupled
				<code>apps/</code>
				and reusable internal <code>packages/</code> linked via PNPM workspace catalogs.
			</li>
		</ul>
