---
id: 'foundation-styling-assets'
title: '02. Tailwind CSS v4, Styling & Asset Architecture'
track: 'Foundations & Tooling'
category: 'Tailwind CSS v4'
segment: 'foundations'
slug: 'styling-assets'
tech: ['@theme Tokens', '@container Queries', 'Asset Pipeline', 'AVIF / WebP', 'Immutable Cache']
description: 'Explore Tailwind CSS v4 CSS-first token configuration, container queries, modern layout systems, responsive image formats, and immutable asset delivery.'
snippetLang: 'css'
lastmod: '2026-02-15'
---

<h3>Tailwind CSS v4 & Modern Asset Pipelines</h3>
		<p class="text-base sm:text-lg">
			Tailwind CSS v4 introduces a CSS-first architecture that eliminates <code
				>tailwind.config.js</code
			>
			in favor of native <code>@theme</code> blocks, cascade layers, and container queries.
		</p>
		<ul>
			<li>
				<strong>CSS-First <code>@theme</code>:</strong> Tokens bind directly to native CSS custom properties
				without JavaScript runtime compilation overhead.
			</li>
			<li>
				<strong>Modular Container Queries (<code>@container</code>):</strong> Components adapt based on
				their parent container width rather than the global viewport width.
			</li>
			<li>
				<strong>Asset Optimisation & Immutable Delivery:</strong> Modern bundlers hash static assets
				and serve them with <code>Cache-Control: public, max-age=31536000, immutable</code>.
			</li>
		</ul>
