import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const schemaSnippet = `import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

// 1. Runtime Schema Boundary definition
export const CreateUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  role: z.enum(['admin', 'member', 'viewer']).default('member'),
  telemetryConsent: z.boolean().default(false)
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

// 2. Type-Safe Backend RPC Route (e.g., Hono / tRPC)
const app = new Hono()
  .post('/api/users', zValidator('json', CreateUserSchema), (c) => {
    const validatedData = c.req.valid('json'); // Fully typed as CreateUserInput
    return c.json({ status: 'created', user: validatedData }, 201);
  });

export type AppType = typeof app;

// 3. Client Consumer with ZERO Code Generation
// const client = hc<AppType>('https://api.example.com');
// const res = await client.api.users.$post({ json: { username: 'ada', email: 'ada@lovelace.dev' } });
// const payload = await res.json(); // Automatically typed!
`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(schemaSnippet, 'typescript');

	return {
		meta: {
			title: 'Schema Validation (Standard Schema) & Type-Safe RPCs',
			description:
				'Enforce runtime boundaries using Zod / Standard Schema and eliminate API drift with end-to-end type-safe RPC clients.'
		},
		codeHtml: highlightedCode,
		rawCode: schemaSnippet
	};
};
