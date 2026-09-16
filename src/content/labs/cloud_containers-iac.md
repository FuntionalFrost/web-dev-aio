---
id: 'cloud-containers-iac'
title: '28. Containers, Orchestration & IaC: Podman, Docker, OCI, ECS & Terraform'
track: 'Cloud, Operations & Licences'
category: 'Containers & IaC'
segment: 'cloud'
slug: 'containers-iac'
tech:
  [
    'Podman Rootless',
    'Docker & OCI',
    'AWS ECS / Fargate',
    'Render PaaS',
    'Terraform / OpenTofu',
    'Wrangler IaC'
  ]
description: 'Compare rootless daemonless Podman with Docker, evaluate Container as a Service (ECS/Render) vs FaaS, and declare infrastructure with Terraform.'
snippetLang: 'typescript'
lastmod: '2026-02-15'
---

<h3>Containers, Orchestration & IaC: Podman, Docker, OCI, ECS & Terraform</h3>
		<p class="text-base sm:text-lg">
			Modern cloud applications bridge development and production through OCI container standards
			and declarative Infrastructure as Code (IaC).
		</p>
		<ul>
			<li>
				<strong>Rootless Podman vs Docker:</strong> Podman runs containers directly under user namespaces
				without a centralised background root daemon, preventing root privilege escalation.
			</li>
			<li>
				<strong>Container as a Service (CaaS):</strong> AWS ECS Fargate and Render allow hosting stateful
				Node servers, WebSockets, and background workers without managing underlying virtual machines.
			</li>
			<li>
				<strong>Declarative IaC:</strong> OpenTofu, Terraform, and Pulumi treat cloud topology as version-controlled
				source code, enabling reproducible deployments across multi-region environments.
			</li>
			<li>
				<strong>Open Container Initiative (OCI):</strong> Adheres to strict <code>image-spec</code>
				and
				<code>runtime-spec</code> definitions supported across all container engines.
			</li>
		</ul>
