export interface SnippetDefinition {
	code: string;
	lang?: 'typescript' | 'javascript' | 'html' | 'svelte' | 'vue' | 'css' | 'json';
}

export const snippets: Record<string, SnippetDefinition> = {
	// ==========================================
	// Track 1: Foundations
	// ==========================================
	'foundations/html5': {
		lang: 'html',
		code: `<!-- 1. Native Modal with Browser-Managed Focus Trap -->
<dialog id="lab-modal" class="backdrop:bg-slate-950/80 rounded-2xl p-6">
  <form method="dialog" class="space-y-4">
    <h3 class="font-bold text-lg">Native Modal</h3>
    <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg">Close</button>
  </form>
</dialog>

<!-- 2. Exclusive Accordion Group via HTML5 'name' attribute -->
<details name="faq-group" open class="border rounded-xl p-4">
  <summary class="font-semibold cursor-pointer">01. Architecture</summary>
  <p class="mt-2 text-sm text-slate-600">Zero JavaScript required for mutual exclusivity.</p>
</details>

<details name="faq-group" class="border rounded-xl p-4 mt-2">
  <summary class="font-semibold cursor-pointer">02. Performance</summary>
  <p class="mt-2 text-sm text-slate-600">Native browser engine optimization.</p>
</details>

<!-- 3. Accessible Landmark & Post-Interaction Validation -->
<search>
  <form action="/query">
    <input type="search" placeholder="Search API..." required class="border valid:border-emerald-500" />
  </form>
</search>`
	},

	'foundations/tailwind': {
		lang: 'css',
		code: `@import "tailwindcss";

@theme {
  --color-brand-primary: oklch(0.62 0.24 264.5);
  --color-brand-accent: oklch(0.85 0.18 190.2);
  --font-display: 'Inter Variable', sans-serif;
  --font-mono: 'JetBrains Mono Variable', monospace;
}

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));`
	},

	'foundations/typescript': {
		lang: 'typescript',
		code: `interface RouteConfig {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  rateLimit?: number;
}

// 'satisfies' enforces interface compliance without widening literal strings
export const routes = {
  getUsers: { path: '/api/v1/users', method: 'GET' },
  createUser: { path: '/api/v1/users', method: 'POST', rateLimit: 60 },
  deleteUser: { path: '/api/v1/users/:id', method: 'DELETE', rateLimit: 10 }
} as const satisfies Record<string, RouteConfig>;

// Inferred type preserves exact literal paths and methods
type CreateMethod = typeof routes.createUser.method; // 'POST' (not widened to string)`
	},

	'foundations/icons': {
		lang: 'html',
		code: `<!-- Zero-DOM SVG Icon Masking Pattern -->
<!-- Uses 1 single DOM element instead of a complex SVG subtree -->
<span 
  class="inline-block h-6 w-6 bg-indigo-600 [mask:url(/icons/zap.svg)_no-repeat_center/contain]"
  aria-hidden="true"
></span>

<span 
  class="inline-block h-6 w-6 bg-emerald-500 [mask:url(/icons/shield.svg)_no-repeat_center/contain]"
  aria-hidden="true"
></span>`
	},

	// ==========================================
	// Track 2: Modern ECMAScript
	// ==========================================
	'ecmascript/math-and-maps': {
		lang: 'typescript',
		code: `// 1. Exact IEEE 754 Summation without roundoff error
const values = [0.1, 0.2, 0.3, -0.6];
const standardSum = values.reduce((acc, curr) => acc + curr, 0); // 5.551115123125783e-17 (Bug!)
const exactSum = Math.sumPrecise(values); // 0.0 (Exact accumulator)

// 2. Map.prototype.getOrInsert Key Memoization
const userCache = new Map<string, { data: string; fetchedAt: number }>();

function getUserData(userId: string) {
  return userCache.getOrInsert(userId, {
    data: \`User record for \${userId}\`,
    fetchedAt: Date.now()
  });
}`
	},

	'ecmascript/binary-streams': {
		lang: 'typescript',
		code: `// 1. Native Uint8Array Base64/Hex encoding (Zero polyfills)
const encoder = new TextEncoder();
const bytes = encoder.encode("Web Engine 2026 Core");

const base64String = bytes.toBase64(); // Standard ES2026
const hexDump = bytes.toHex();          // "57656220456e67696e65..."

// 2. Stream promise aggregation via Array.fromAsync
async function* generatePayloads() {
  yield Promise.resolve({ chunk: 1 });
  yield Promise.resolve({ chunk: 2 });
}
const allChunks = await Array.fromAsync(generatePayloads());`
	},

	'ecmascript/discrete-transitions': {
		lang: 'css',
		code: `/* Animating DOM entry from display: none */
.dialog-overlay {
  transition: opacity 0.3s ease-out, display 0.3s allow-discrete;
  opacity: 1;
}

@starting-style {
  .dialog-overlay {
    opacity: 0;
  }
}

/* Background Isolation with inert */
[inert] {
  pointer-events: none;
  user-select: none;
}`
	},

	'ecmascript/resource-scopes': {
		lang: 'typescript',
		code: `// 1. Explicit Resource Management (ERM) with using keyword
class DatabaseConnection implements Disposable {
  constructor(public id: string) {}
  [Symbol.dispose]() {
    console.log(\`Released DB handle: \${this.id}\`);
  }
}

function processTransaction() {
  using conn = new DatabaseConnection('neon-pool-1');
  // Auto-disposed upon exiting scope, even on throw
}

// 2. Promise.withResolvers() Decoupling
const { promise, resolve, reject } = Promise.withResolvers<string>();
setTimeout(() => resolve('Deferred Pipeline Ready'), 500);`
	},

	'ecmascript/anchors-and-popovers': {
		lang: 'html',
		code: `<!-- Native Anchored Popover without Popper or Floating UI -->
<button popovertarget="user-menu" style="anchor-name: --avatar-anchor">
  Open Profile
</button>

<div 
  id="user-menu" 
  popover="auto"
  style="position-anchor: --avatar-anchor; top: anchor(bottom); left: anchor(left);"
  class="rounded-xl border p-4 shadow-xl backdrop:bg-transparent"
>
  <p class="font-bold">Active User Session</p>
  <button class="mt-2 text-xs text-rose-500">Sign Out</button>
</div>`
	},

	// ==========================================
	// Track 3: UI & Frameworks
	// ==========================================
	'frameworks/svelte5': {
		lang: 'svelte',
		code: `<script lang="ts">
  // Svelte 5 Universal Runes
  let count = $state(0);
  let double = $derived(count * 2);

  $effect(() => {
    console.log(\`Count changed to: \${count}\`);
  });

  let { label = 'Counter' }: { label?: string } = $props();
</script>

<button onclick={() => count++} class="btn">
  {label}: {count} (Double: {double})
</button>`
	},

	'frameworks/shadcn-svelte': {
		lang: 'typescript',
		code: `import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-mono text-xs font-semibold transition',
  {
    variants: {
      variant: {
        default: 'bg-indigo-600 text-white hover:bg-indigo-500',
        destructive: 'bg-rose-600 text-white hover:bg-rose-500',
        outline: 'border border-slate-200 dark:border-slate-800'
      },
      size: {
        sm: 'px-2.5 py-1 rounded-md text-xs',
        md: 'px-4 py-2 rounded-xl text-sm',
        lg: 'px-6 py-3 rounded-2xl text-base'
      }
    },
    defaultVariants: { variant: 'default', size: 'md' }
  }
);`
	},

	'frameworks/vue35': {
		lang: 'vue',
		code: `<script setup lang="ts">
import { watchEffect } from 'vue';

// Vue 3.5 Reactive Prop Destructuring (no toRefs() needed)
const { count = 0, label = 'Metric' } = defineProps<{
  count?: number;
  label?: string;
}>();

// Reactivity is automatically preserved across destructure boundaries
watchEffect(() => {
  console.log(\`\${label}: \${count}\`);
});
</script>

<template>
  <div class="card">
    <span>{{ label }}</span>
    <strong>{{ count }}</strong>
  </div>
</template>`
	},

	'frameworks/nuxt4': {
		lang: 'typescript',
		code: `// Nuxt 4 app/ directory & Universal Data Fetching Lifecycle
export default defineNuxtComponent({
  async setup() {
    const { data: telemetry, refresh } = await useAsyncData('metrics', () =>
      $fetch('/api/v1/telemetry')
    );

    return { telemetry, refresh };
  }
});`
	},

	// ==========================================
	// Track 4: APIs & Real-Time
	// ==========================================
	'apis/schema-rpc': {
		lang: 'typescript',
		code: `import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

export const userSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'member'])
});

const app = new Hono()
  .post('/api/users', zValidator('json', userSchema), (c) => {
    const data = c.req.valid('json'); // End-to-end typed contract
    return c.json({ success: true, user: data });
  });

export type AppType = typeof app;`
	},

	'apis/realtime-webhooks': {
		lang: 'typescript',
		code: `import { timingSafeEqual, createHmac } from 'node:crypto';

// Verify Webhook Signatures immune to timing attacks
export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string
): boolean {
  const hmac = createHmac('sha256', secret);
  const digest = Buffer.from('sha256=' + hmac.update(rawBody).digest('hex'), 'utf8');
  const signature = Buffer.from(signatureHeader, 'utf8');

  if (digest.length !== signature.length) return false;
  return timingSafeEqual(digest, signature);
}`
	},

	// ==========================================
	// Track 5: Data, Caching & Auth
	// ==========================================
	'infra/databases-orm': {
		lang: 'typescript',
		code: `import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Sub-millisecond connection pooling over HTTP for Edge runtimes
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);`
	},

	'infra/redis-ratelimit': {
		lang: 'typescript',
		code: `import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const redis = Redis.fromEnv();

// Sliding window rate limiter: 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true
});

export async function checkRateLimit(ip: string) {
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);
  return { success, remaining };
}`
	},

	'infra/better-auth': {
		lang: 'typescript',
		code: `import { betterAuth } from 'better-auth';
import { passkey } from 'better-auth/plugins/passkey';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '$lib/server/db';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: { enabled: true },
  session: {
    cookieCache: { enabled: true, maxAge: 300 },
    cookie: {
      httpOnly: true, // Immune to JavaScript XSS exfiltration
      secure: true,   // HTTPS only
      sameSite: 'lax' // CSRF protection
    }
  },
  plugins: [
    passkey({
      rpID: 'web-engine26.pages.dev',
      rpName: 'Web Engine 2026'
    })
  ]
});`
	},

	// ==========================================
	// Track 6: Infrastructure & Monetization
	// ==========================================
	'infra/deployment-edge': {
		lang: 'typescript',
		code: `// Cloudflare Workers V8 Isolate vs Node Container Profile
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const start = performance.now();
    
    // 0ms Cold-start isolate execution
    const response = new Response(JSON.stringify({
      runtime: 'Cloudflare V8 Isolate',
      latencyMs: performance.now() - start
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

    return response;
  }
};`
	},

	'services/billing-email': {
		lang: 'typescript',
		code: `import { Resend } from 'resend';
import { Polar } from '@polar-sh/sdk';

const resend = new Resend(process.env.RESEND_API_KEY);
const polar = new Polar({ accessToken: process.env.POLAR_ACCESS_TOKEN });

export async function handleOrderCompleted(order: { customerEmail: string; amount: number }) {
  // Merchant of Record tax handling & automated transactional receipt dispatch
  await resend.emails.send({
    from: 'billing@web-engine26.pages.dev',
    to: order.customerEmail,
    subject: 'License Order Confirmation',
    html: \`<strong>Thank you for your purchase of $\${order.amount / 100}!</strong>\`
  });
}`
	},

	'services/storage-jobs': {
		lang: 'typescript',
		code: `import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inngest } from 'inngest';

// 1. Direct Presigned PUT generator
const s3 = new S3Client({ region: 'auto', endpoint: process.env.R2_ENDPOINT });

export async function createPresignedUpload(fileKey: string, contentType: string) {
  const command = new PutObjectCommand({ Bucket: 'user-assets', Key: fileKey, ContentType: contentType });
  return await getSignedUrl(s3, command, { expiresIn: 300 });
}

// 2. Inngest Step Functions
export const inngest = new Inngest({ id: 'media-worker' });
export const mediaJob = inngest.createFunction(
  { id: 'process-asset' },
  { event: 'media.uploaded' },
  async ({ step }) => {
    await step.run('checksum', async () => ({ valid: true }));
    await step.run('resize', async () => ({ derivatives: 3 }));
  }
);`
	}
};
