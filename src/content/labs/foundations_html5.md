---
id: "foundation-html"
title: "01. Modern HTML5, Semantics & Web APIs"
track: "Foundations & Tooling"
category: "HTML5 & Standards"
segment: "foundations"
slug: "html5"
tech: ["<dialog>", "<details name="...">", "Web Standards", "Streams API", "Web Crypto", "URLPattern"]
description: "Master native accessible modals, exclusive accordions, clientless form validation, and core browser Web Standard APIs including Streams and Web Crypto."
snippetLang: "html"
lastmod: "2026-02-15"
---

<h3>Modern HTML5 Semantics & Web Standards</h3>
		<p class="text-base sm:text-lg">
			Web Standards provide native browser-level primitives that replace megabytes of legacy
			JavaScript libraries.
		</p>
		<ul>
			<li>
				<strong>Native <code>&lt;dialog&gt;</code>:</strong> Provides automatic focus trapping,
				backdrop dimming via <code>::backdrop</code>, and light dismissal with Esc without external
				dependencies.
			</li>
			<li>
				<strong>Exclusive <code>&lt;details name="..."&gt;</code>:</strong> Groups accordion items
				natively. Opening one item automatically closes siblings sharing the same <code>name</code> attribute.
			</li>
			<li>
				<strong>Web Standards (Streams & Web Crypto):</strong> First-class browser APIs like
				<code>URLPattern</code>, <code>TransformStream</code>, and <code>crypto.subtle</code> execute
				at native C++ speeds.
			</li>
		</ul>
