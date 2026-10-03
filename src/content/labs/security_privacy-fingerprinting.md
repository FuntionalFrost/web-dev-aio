<h3>Privacy Engineering & Anti-Fingerprinting Architecture</h3>
<p class="text-base sm:text-lg">
  As third-party cookies are deprecated, covert tracking vectors like device entropy fingerprinting, CNAME cloaking, and bounce tracking have become the primary threat to web privacy.
</p>
<ul>
  <li>
    <strong>Global Privacy Control (<code>Sec-GPC: 1</code>):</strong> Machine-readable HTTP header signaling the user's universal legal opt-out from personal data sale, sharing, and cross-site profiling.
  </li>
  <li>
    <strong>Entropy Fingerprint Resistance:</strong> Introduces imperceptible micro-jitter to Canvas 2D, WebGL, and Web Audio rendering outputs to prevent deterministic device hashing while maintaining visual fidelity.
  </li>
  <li>
    <strong>Storage Partitioning (CHIPS / Cookies Having Independent Partitioned State):</strong> Isolates cookie jars and local storage per top-level site context, eliminating cross-site tracking via embedded iframes.
  </li>
  <li>
    <strong>Link Decoration & Bounce Tracking Defenses:</strong> Strips tracking query parameters (<code>utm_*</code>, <code>fbclid</code>, <code>gclid</code>) and prevents stateful cross-site redirects.
  </li>
</ul>
