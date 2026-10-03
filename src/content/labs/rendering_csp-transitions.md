<h3>Security: Strict CSP, Nonces & View Transitions</h3>
		<p class="text-base sm:text-lg">
			Securing web applications against Cross-Site Scripting (XSS) and clickjacking with strict
			Content Security Policies while providing fluid navigational animations with the View
			Transitions API.
		</p>
		<ul>
			<li>
				<strong>Cryptographic CSP Nonces:</strong> Server-generated nonces ensure that only vetted scripts
				executed by the framework can run, blocking malicious injected payloads.
			</li>
			<li>
				<strong>Clickjacking Mitigation (<code>frame-ancestors 'none'</code>):</strong> Prevents unauthorized
				embedding inside foreign iframes.
			</li>
			<li>
				<strong>View Transitions API:</strong> Natively morphs DOM elements between pages and route navigations
				without complex layout calculations.
			</li>
		</ul>
