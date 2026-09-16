---
id: 'ecma-discrete-transitions'
title: '12. Discrete Transitions & DOM Interactivity'
track: 'Modern ECMAScript'
category: 'HTML5 & Standards'
segment: 'ecmascript'
slug: 'discrete-transitions'
tech: ['HTML5 inert', 'CSS @starting-style', 'allow-discrete', 'View Transitions API']
description: 'Orchestrate smooth zero-JavaScript entrance animations from display: none, isolate background accessibility trees, and apply modern popovers.'
snippetLang: 'css'
lastmod: '2026-02-15'
---

<h3>Discrete Transitions & DOM Interactivity</h3>
		<p class="text-base sm:text-lg">
			CSS discrete transitions and HTML5 background isolation provide butter-smooth entrance
			animations without heavy JavaScript animation runtimes.
		</p>
		<ul>
			<li>
				<strong><code>@starting-style</code> & <code>allow-discrete</code>:</strong> Transition CSS
				properties directly from <code>display: none</code> to visible block layout.
			</li>
			<li>
				<strong><code>inert</code> Attribute:</strong> Completely removes background DOM subtrees from
				focus, selection, and accessibility trees when overlays are open.
			</li>
			<li>
				<strong>Hardware Transforms:</strong> GPU-composited 3D spatial matrix operations calculated smoothly
				with zero layout thrashing.
			</li>
		</ul>
