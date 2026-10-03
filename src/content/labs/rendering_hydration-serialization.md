<h3>Hydration Engines & Data Serialisation</h3>
		<p class="text-base sm:text-lg">
			Passing state across the server-to-client boundary requires specialised serialisers like <code
				>devalue</code
			>
			or <code>SuperJSON</code> that preserve complex JavaScript data structures.
		</p>
		<ul>
			<li>
				<strong>Standard JSON Limitations:</strong> <code>JSON.stringify</code> converts
				<code>Date</code>
				objects to strings, loses <code>Set</code> / <code>Map</code> prototypes, and throws on
				<code>BigInt</code>.
			</li>
			<li>
				<strong><code>devalue</code> Engine:</strong> Powers SvelteKit and Nuxt payload transfers by serialising
				circular references, custom prototypes, and native ECMAScript data structures safely.
			</li>
			<li>
				<strong>Hydration Mismatch Prevention:</strong> Guarantees identical client state recreation on
				the initial load without re-triggering network fetches.
			</li>
		</ul>
