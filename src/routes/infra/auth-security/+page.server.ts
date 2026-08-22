import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const authSnippet = `import { generateRegistrationOptions, verifyRegistrationResponse } from '@simplewebauthn/server';

// 1. Passwordless WebAuthn / Passkey Registration Challenge
export async function createPasskeyChallenge(user: { id: string; email: string }) {
  const options = await generateRegistrationOptions({
    rpName: 'Web Engine 2026',
    rpID: 'localhost',
    userID: new TextEncoder().encode(user.id),
    userName: user.email,
    attestationType: 'none',
    authenticatorSelection: {
      residentKey: 'required',
      userVerification: 'preferred'
    }
  });

  // Store options.challenge securely in server-side session
  return options;
}

// 2. Secure HttpOnly Session Cookie Issuance
export function setSessionCookie(cookies: { set: Function }, sessionId: string) {
  cookies.set('app_session', sessionId, {
    httpOnly: true,     // Immune to JavaScript document.cookie XSS theft
    secure: true,       // HTTPS transmission only
    sameSite: 'lax',    // CSRF protection for top-level navigations
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7-day rolling duration
  });
}`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(authSnippet, 'typescript');

	return {
		meta: {
			title: 'Modern Auth: Passkeys, WebAuthn & Session Security',
			description:
				'Implement passwordless WebAuthn authentication, secure HttpOnly session cookie rotation, and evaluate client storage security models.'
		},
		codeHtml: highlightedCode,
		rawCode: authSnippet
	};
};
