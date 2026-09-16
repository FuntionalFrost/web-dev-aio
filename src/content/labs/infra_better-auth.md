---
id: 'infra-better-auth'
title: '21. Modern Authentication, Passkeys & Better Auth'
track: 'APIs & Data Architecture'
category: 'Auth & Security'
segment: 'infra'
slug: 'better-auth'
tech: ['Better Auth', 'WebAuthn Passkeys', 'HttpOnly Cookies', 'Session Rotation', 'PKCE OAuth']
description: 'Implement passwordless biometric passkeys, secure HttpOnly cookie session rotation, and modular authentication plugins with Better Auth.'
snippetLang: 'typescript'
lastmod: '2026-02-15'
---

<h3>Modern Authentication, Passkeys & Better Auth</h3>
		<p class="text-base sm:text-lg">
			Better Auth provides a comprehensive TypeScript authentication runtime with passwordless
			WebAuthn passkeys, HttpOnly cookie rotation, and organisation multi-tenancy.
		</p>
		<ul>
			<li>
				<strong>Passkeys (WebAuthn):</strong> Asymmetric public-private keypairs anchored in hardware
				secure enclaves (TouchID, FaceID, Windows Hello) that are immune to phishing.
			</li>
			<li>
				<strong>HttpOnly Session Cookies:</strong> Completely isolated from client JavaScript (<code
					>document.cookie</code
				>), protecting session tokens against XSS exfiltration.
			</li>
			<li>
				<strong>Schema Ownership:</strong> Better Auth creates native Drizzle tables in your own database
				without third-party auth vendor lock-in.
			</li>
		</ul>
