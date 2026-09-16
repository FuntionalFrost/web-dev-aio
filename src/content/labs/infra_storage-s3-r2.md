---
id: 'infra-storage-s3-r2'
title: '22. Object Storage: S3 Client, Cloudflare R2 & Presigned Uploads'
track: 'APIs & Data Architecture'
category: 'Object Storage & R2'
segment: 'infra'
slug: 'storage-s3-r2'
tech:
  [
    '@aws-sdk/client-s3',
    'Cloudflare R2',
    'Presigned URLs',
    'Zero Egress',
    'Multipart Uploads',
    'Bucket Policies'
  ]
description: 'Architect scalable media and file storage with AWS SDK v3, presigned client upload tokens, and zero-egress Cloudflare R2 buckets.'
snippetLang: 'typescript'
lastmod: '2026-02-15'
---

<h3>Object Storage: S3 Client, Cloudflare R2 & Presigned Uploads</h3>
		<p class="text-base sm:text-lg">
			Modern file architectures decouple binary storage from application compute. Instead of routing
			gigabytes of user file uploads through web servers, clients stream data directly to object
			storage buckets using short-lived presigned URLs.
		</p>
		<ul>
			<li>
				<strong>AWS SDK v3 (<code>@aws-sdk/client-s3</code>):</strong> Tree-shakable, modular client architecture
				tailored for edge runtimes and serverless functions.
			</li>
			<li>
				<strong>Presigned Upload URLs:</strong> The application server cryptographically signs a PUT command;
				the browser uploads directly to S3/R2 with zero server CPU or bandwidth overhead.
			</li>
			<li>
				<strong>Cloudflare R2 (Zero Egress):</strong> 100% S3-compatible API with zero data transfer egress
				fees, drastically cutting bandwidth expenses for media-heavy web applications.
			</li>
			<li>
				<strong>Multipart Streaming:</strong> Efficient chunking for multi-gigabyte video or archive files
				with parallel chunk verification and resumption.
			</li>
		</ul>
