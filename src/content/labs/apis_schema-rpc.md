<h3>Schema Validation (Standard Schema) & Hono RPC</h3>
		<p class="text-base sm:text-lg">
			Standard Schema and Hono RPC eliminate boilerplate by providing end-to-end type safety between
			backend handlers and frontend clients without code-generation steps.
		</p>
		<ul>
			<li>
				<strong>Runtime Boundary Safety:</strong> TypeScript types evaporate at build time. Standard Schema
				(Zod / Valibot) validates untrusted JSON at the network perimeter.
			</li>
			<li>
				<strong>End-to-End Type-Safe RPCs:</strong> Exporting route definitions directly enables auto-completion
				and compile-time contract enforcement.
			</li>
			<li>
				<strong>OpenAPI 3.1 & Scalar:</strong> Generates standardised JSON specs automatically for external
				consumers and automated SDK generation.
			</li>
			<li>
				<strong>Unified Web & Mobile (Android) Backend:</strong> OpenAPI specs allow tools like
				<code>openapi-generator</code> to generate type-safe Kotlin models (Retrofit/Ktor) for native
				Android apps alongside TypeScript web clients from a single backend.
			</li>
		</ul>
