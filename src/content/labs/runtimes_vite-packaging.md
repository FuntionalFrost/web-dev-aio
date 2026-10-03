<h3>Vite 6 Architecture & Library Packaging</h3>
		<p class="text-base sm:text-lg">
			Modern frontend libraries use modern packaging standards including conditional <code
				>exports</code
			>, TypeScript declaration bundling, and Vite 6's optimised build pipeline.
		</p>
		<ul>
			<li>
				<strong>Vite 6 & Rolldown:</strong> Delivers lightning-fast Hot Module Replacement (HMR) and optimised
				multi-target build outputs.
			</li>
			<li>
				<strong><code>svelte-package</code> & <code>unbuild</code>:</strong> Compiles Svelte runes
				components, processes TypeScript definitions (<code>.d.ts</code>), and produces standard ESM
				artifacts.
			</li>
			<li>
				<strong>Conditional <code>package.json</code> <code>exports</code>:</strong> Enforces explicit
				public API boundaries, preventing consumers from importing internal unexported modules.
			</li>
		</ul>
