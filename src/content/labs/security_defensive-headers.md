<h3>Modern Web Security & Defensive Architecture</h3>
<p class="text-base sm:text-lg">
  Comprehensive browser-side defense-in-depth requires more than basic sanitization. Modern web architectures in 2026 rely on cryptographic nonces, execution boundaries, and hardware isolation headers to render entire classes of injection and timing attacks obsolete.
</p>
<ul>
  <li>
    <strong>Strict CSP Level 3 (<code>'strict-dynamic'</code>):</strong> Replaces fragile domain allowlists with per-request cryptographic nonces (<code>'nonce-UUID'</code>), ensuring dynamically loaded trusted dependencies execute while malicious inline scripts are immediately blocked.
  </li>
  <li>
    <strong>Cross-Origin Isolation (COOP + COEP + CORP):</strong> Enables high-precision WebAssembly threads, <code>SharedArrayBuffer</code>, and prevents Spectre-style side-channel microarchitectural attacks by isolating browsing context groups.
  </li>
  <li>
    <strong>Trusted Types API:</strong> Eliminates DOM-based XSS by requiring typed objects (<code>TrustedHTML</code>, <code>TrustedScript</code>) before strings can be written to dangerous injection sinks like <code>innerHTML</code>.
  </li>
  <li>
    <strong>Fine-Grained Permissions-Policy:</strong> Explicitly disables unneeded device hardware access (cameras, microphones, sensors, FLoC/Topics tracking) at the HTTP protocol layer.
  </li>
</ul>
