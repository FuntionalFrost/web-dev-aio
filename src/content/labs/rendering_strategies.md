---
id: 'rendering-strategies'
title: '14. Rendering Strategies: SSG, SSR, Hybrid & CSR'
track: 'Rendering & Architecture'
category: 'Rendering Strategies'
segment: 'rendering'
slug: 'strategies'
tech:
  [
    'Prerendering (SSG)',
    'Server-Side Rendering (SSR)',
    'Hybrid / ISR',
    'Client-Side Rendering (CSR)',
    'TTFB vs FCP'
  ]
description: 'Compare static generation, dynamic server rendering, hybrid incremental regeneration, and client-side single page app models for speed and cost.'
snippetLang: 'typescript'
lastmod: '2026-02-15'
---

<h3>Rendering Strategies: SSG, SSR, Hybrid & CSR</h3>
		<p class="text-base sm:text-lg">
			Selecting the appropriate rendering model balances Time to First Byte (TTFB), First Contentful
			Paint (FCP), SEO indexability, and cloud infrastructure expenditure.
		</p>
		<ul>
			<li>
				<strong>SSG (Static Site Generation):</strong> Pre-renders HTML at build time for instant CDN
				delivery and zero server compute overhead.
			</li>
			<li>
				<strong>SSR (Server-Side Rendering):</strong> Renders fresh dynamic HTML on every request for
				personalized, real-time data.
			</li>
			<li>
				<strong>Hybrid / ISR:</strong> Combines static caching with background regeneration triggers.
			</li>
			<li>
				<strong>CSR (Client-Side Rendering):</strong> Offloads rendering entirely to the browser for thick,
				offline-capable applications.
			</li>
		</ul>
