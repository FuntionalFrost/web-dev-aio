<h3>Cloud Platforms: Cloudflare Workers, Vercel & Netlify</h3>
		<p class="text-base sm:text-lg">
			Comparing cloud deployment architectures for Nuxt and SvelteKit applications across V8 Edge
			Isolates and containerised Serverless Functions.
		</p>
		<ul>
			<li>
				<strong>V8 Isolates vs Containerised Node:</strong> Cloudflare Workers spin up in 0–5ms by sharing
				a single V8 runtime process, whereas standard Node lambdas incur container cold starts.
			</li>
			<li>
				<strong>Bandwidth & Egress Optimisation:</strong> Evaluating egress fees and static asset caching
				policies across platforms.
			</li>
			<li>
				<strong>Reverse & Forward Proxying:</strong> Reverse proxies (Cloudflare, Nginx, Caddy)
				handle inbound SSL termination, rate limiting, and <code>X-Forwarded-For</code> header passing
				to backend nodes. Forward proxies act as dedicated egress gateways for outbound IP whitelisting.
			</li>
			<li>
				<strong>Framework Adapter Topologies:</strong> Deploying universal SvelteKit and Nuxt Nitro applications
				with zero application code changes.
			</li>
		</ul>
