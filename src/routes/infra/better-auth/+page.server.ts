import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const betterAuthSnippet = `import { betterAuth } from 'better-auth';
import { passkey } from 'better-auth/plugins/passkey';
import { twoFactor } from 'better-auth/plugins/two-factor';
import { organization } from 'better-auth/plugins/organization';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';

// 1. Better Auth Universal Configuration
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: { enabled: true },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24       // Rolling session refresh every 24 hours
  },
  plugins: [
    passkey(),      // Native FIDO2 / WebAuthn passwordless login
    twoFactor(),    // TOTP Authenticator app support
    organization()  // Multi-tenant B2B RBAC roles & permissions
  ]
});

// 2. SvelteKit / Hono Universal Hook Integration
// export async function handle({ event, resolve }) {
//   event.locals.session = await auth.api.getSession({ headers: event.request.headers });
//   return resolve(event);
// }`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(betterAuthSnippet, 'typescript');

	return {
		meta: {
			title: 'Modern Auth: Better Auth, Passkeys & Session Lifecycle',
			description:
				'Deploy modern TypeScript authentication with Better Auth, WebAuthn passkeys, TOTP two-factor authentication, and multi-tenant organizations.'
		},
		codeHtml: highlightedCode,
		rawCode: betterAuthSnippet
	};
};
