import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const redisSnippet = `import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// 1. Serverless HTTP Redis Client (Zero TCP socket exhaustion)
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

// 2. Sliding Window Counter Rate Limiter
// Allows 5 requests per 10-second rolling window per identifier
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 s'),
  analytics: true,
  prefix: '@ratelimit/api'
});

// 3. Edge/Serverless Middleware Guard
export async function handleRequest(ip: string) {
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(JSON.stringify({ error: 'Too Many Requests' }), {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
        'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString()
      }
    });
  }

  return new Response(JSON.stringify({ status: 'ok', remaining }));
}`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(redisSnippet, 'typescript');

	return {
		meta: {
			title: 'Serverless Redis & Sliding Window Rate Limiting',
			description:
				'Implement stateless HTTP Redis caching and protect serverless APIs with high-precision sliding window rate limiters.'
		},
		codeHtml: highlightedCode,
		rawCode: redisSnippet
	};
};
