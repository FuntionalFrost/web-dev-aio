---
id: 'security-anonymity-oblivious'
title: '32. Web Anonymity: Oblivious HTTP (OHTTP) & Private State Tokens'
track: 'Security, Privacy & EU Regulations'
category: 'Oblivious Protocols & Anonymity'
segment: 'security'
slug: 'anonymity-oblivious'
tech:
  [
    'Oblivious HTTP (RFC 9458)',
    'Private State Tokens (RFC 9578)',
    'Onion-Location Header',
    'Blind Signatures',
    'Zero-Knowledge Verifiers',
    'Differential Privacy'
  ]
description: 'Decouple client network identities from application payloads with Oblivious HTTP (OHTTP), issue fraud-preventing Private State Tokens, and integrate onion routing.'
snippetLang: 'typescript'
lastmod: '2026-09-30'
---

<h3>Web Anonymity & Oblivious Protocol Architectures</h3>
<p class="text-base sm:text-lg">
  Decoupling network identities (IP addresses, TLS signatures) from application layer requests enables true privacy-preserving telemetry, anti-fraud verifications, and anonymous browsing.
</p>
<ul>
  <li>
    <strong>Oblivious HTTP (OHTTP / RFC 9458):</strong> Employs Hybrid Public Key Encryption (HPKE / RFC 9180) across an untrusted Relay and a Target Gateway. The Relay knows the client IP but cannot read the encrypted payload; the Gateway decrypts the payload but never knows the client IP.
  </li>
  <li>
    <strong>Private State Tokens (PST / Privacy Pass RFC 9578):</strong> Uses blind signatures (VOPRF) to issue cryptographic tokens that prove a client passed anti-bot or subscriber checks without revealing identity across different domains.
  </li>
  <li>
    <strong>Onion-Location & Hidden Services:</strong> Advertises authenticated Tor onion endpoints directly via HTTP response headers, allowing privacy-conscious clients to route traffic through 6-hop encrypted circuits.
  </li>
  <li>
    <strong>Differential Privacy in Telemetry:</strong> Injects calibrated mathematical noise into aggregate metrics to guarantee individual user actions cannot be reconstructed.
  </li>
</ul>
