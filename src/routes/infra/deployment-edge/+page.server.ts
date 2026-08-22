import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const edgeSnippet = `// 1. Cloudflare Workers / V8 Isolate Handler
// Zero Node.js runtime, boots in <5ms across 300+ edge locations worldwide.
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Fast edge caching via standard Web API Caches
    const cache = caches.default;
    let response = await cache.match(request);
    
    if (!response) {
      response = new Response(JSON.stringify({ location: request.cf?.colo, time: Date.now() }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' }
      });
      ctx.waitUntil(cache.put(request, response.clone()));
    }
    
    return response;
  }
};

// 2. Runtime API Availability Constraint
// V8 Isolates DO NOT support arbitrary Node.js native binary bindings:
// ❌ process.chdir(), native fs locks, heavy compiled C++ addons
// ✅ Web Standards: fetch, Request, Response, crypto.subtle, Streams, WebSockets
`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(edgeSnippet, 'typescript');

	return {
		meta: {
			title: 'Deployment Architectures: Edge Isolates vs Serverless Node',
			description:
				'Compare V8 Isolate execution models, cold-start latency, memory boundaries, and runtime Web API compatibility across modern cloud platforms.'
		},
		codeHtml: highlightedCode,
		rawCode: edgeSnippet
	};
};
