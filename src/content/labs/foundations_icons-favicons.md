---
id: 'foundation-icons-favicons'
title: '04. Modern Icons & Responsive Favicon Systems'
track: 'Foundations & Tooling'
category: 'Icons & Assets'
segment: 'foundations'
slug: 'icons-favicons'
tech: ['SVG Favicons', 'Dark/Light Media', 'Web App Manifest', 'CSS Mask Icons', 'DOM Optimisation']
description: 'Design theme-reactive SVG favicons, Apple touch icons, PWA manifest configurations, and high-performance single-node CSS mask icon systems.'
snippetLang: 'html'
lastmod: '2026-02-15'
---

<h3>Modern Icon & Favicon Systems</h3>
		<p class="text-base sm:text-lg">
			Modern web standards eliminate large icon sprite libraries by leveraging responsive SVG
			favicons and CSS mask icons.
		</p>
		<ul>
			<li>
				<strong>Theme-Aware SVG Favicons:</strong> SVG favicons support embedded
				<code>&lt;style&gt;</code>
				tags and <code>@media (prefers-color-scheme: dark)</code>, dynamically switching colors
				without JavaScript.
			</li>
			<li>
				<strong>CSS Mask Icons:</strong> By rendering a single <code>&lt;span&gt;</code> with
				<code>mask: url(...)</code>, icons inherit CSS <code>background-color</code> and
				<code>currentColor</code> while keeping the DOM tree flat.
			</li>
			<li>
				<strong>PWA Manifest & Apple Touch Icons:</strong> Configure
				<code>manifest.webmanifest</code>
				and <code>apple-touch-icon.png</code> for seamless cross-device home screen installation.
			</li>
		</ul>
