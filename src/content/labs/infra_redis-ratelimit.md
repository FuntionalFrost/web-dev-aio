---
id: 'infra-redis-ratelimit'
title: '20. Edge Caching & Sliding Window Rate Limiting'
track: 'APIs & Data Architecture'
category: 'Backend & Data'
segment: 'infra'
slug: 'redis-ratelimit'
tech:
  [
    '@upstash/redis',
    '@upstash/ratelimit',
    'Sliding Window Algorithm',
    'Distributed Locks',
    'Edge Tokens'
  ]
description: 'Deploy stateless HTTP Redis caching, defend APIs against brute force attacks with sliding window algorithms, and manage distributed edge state.'
snippetLang: 'typescript'
lastmod: '2026-02-15'
---

<h3>Edge Caching & Sliding Window Rate Limiting</h3>
		<p class="text-base sm:text-lg">
			Sliding window algorithms in Upstash Redis over stateless HTTP prevent traffic burst exploits
			across fixed window intervals and defend against DDoS attacks.
		</p>
		<ul>
			<li>
				<strong>The Fixed Window Burst Vulnerability:</strong> In fixed window rate limiting, a client
				can send its full limit at second 9 and another batch at second 10, executing a 2x burst across
				the boundary.
			</li>
			<li>
				<strong>Sliding Window Smoothness:</strong> Tracks a continuous rolling weighted window in Redis
				memory, ensuring the client never exceeds quota across any arbitrary slice of time.
			</li>
			<li>
				<strong>Stateless HTTP Redis:</strong> Upstash uses standard HTTPS requests instead of persistent
				TCP sockets, eliminating connection exhaustion on Cloudflare Workers and serverless edges.
			</li>
		</ul>
