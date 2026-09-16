---
id: 'ecma-binary-streams'
title: '11. Binary Streams, Buffers & Container Layouts'
track: 'Modern ECMAScript'
category: 'ECMAScript'
segment: 'ecmascript'
slug: 'binary-streams'
tech: ['Uint8Array.prototype.toBase64', 'toHex', 'Array.fromAsync', 'Tailwind v4 @container']
description: 'Execute native browser-level Base64 and Hex conversions, stream async iterables, and construct modular container-responsive interfaces.'
snippetLang: 'typescript'
lastmod: '2026-02-15'
---

<h3>Binary Streams, Buffers & Container Layouts</h3>
		<p class="text-base sm:text-lg">
			Native binary buffer transformations eliminate client-side polyfills for cryptography, file
			processing, and network serialisation.
		</p>
		<ul>
			<li>
				<strong><code>Uint8Array.prototype.toBase64()</code>:</strong> Browser-native, specification-grade
				Base64 conversion without string corruption or memory overhead.
			</li>
			<li>
				<strong><code>Uint8Array.prototype.toHex()</code>:</strong> Fast hexadecimal serialisation for
				hashes, tokens, and cryptographic signatures.
			</li>
			<li>
				<strong><code>Array.fromAsync()</code>:</strong> Consumes asynchronous iterables, ReadableStreams,
				and Promise batches directly into an array in a single operation.
			</li>
		</ul>
