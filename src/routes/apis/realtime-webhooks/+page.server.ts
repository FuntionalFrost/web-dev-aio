import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const realtimeSnippet = `import crypto from 'node:crypto';

// 1. Server-Sent Events (SSE): Unidirectional HTTP/2 or HTTP/3 Stream
export function createSSEStream() {
  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        const payload = JSON.stringify({ price: (Math.random() * 100).toFixed(2), time: Date.now() });
        controller.enqueue(new TextEncoder().encode(\`data: \${payload}\\n\\n\`));
      }, 1000);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}

// 2. Webhook Signature Verification (Timing-Safe HMAC-SHA256)
export function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  // Prevent timing attacks by comparing hashes in constant time
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(realtimeSnippet, 'typescript');

	return {
		meta: {
			title: 'Real-Time Streaming (SSE vs WebSockets) & Webhook Security',
			description:
				'Master unidirectional Server-Sent Events, bidirectional WebSockets, and timing-safe HMAC-SHA256 webhook verification.'
		},
		codeHtml: highlightedCode,
		rawCode: realtimeSnippet
	};
};
