<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type RuntimeKey = 'podman' | 'docker' | 'ecs_fargate' | 'render_caas';
	let selectedRuntime = $state<RuntimeKey>('podman');

	const runtimeDetails: Record<
		RuntimeKey,
		{
			title: string;
			architecture: string;
			securityModel: string;
			daemon: string;
			orchestration: string;
			bestFor: string;
		}
	> = {
		podman: {
			title: 'Podman (Pod Manager)',
			architecture: 'Daemonless fork/exec process model',
			securityModel: 'Rootless by default; isolated user namespaces (subuid/subgid)',
			daemon: 'No background root daemon (0 socket attack surface)',
			orchestration: 'Direct Kubernetes YAML pods & podman-compose',
			bestFor: 'High-security enterprise Linux environments, local dev, Fedora/RHEL'
		},
		docker: {
			title: 'Docker Engine (Moby)',
			architecture: 'Client-Server architecture via dockerd REST API',
			securityModel: 'Root daemon by default (optional experimental rootless mode)',
			daemon: 'dockerd service bound to /var/run/docker.sock',
			orchestration: 'Docker Compose & Docker Swarm',
			bestFor: 'General cross-platform desktop tooling and standard CI pipelines'
		},
		ecs_fargate: {
			title: 'AWS ECS with AWS Fargate (CaaS)',
			architecture: 'Serverless Container as a Service (CaaS)',
			securityModel: 'AWS IAM Task Execution Roles & VPC security groups',
			daemon: 'Managed by AWS hypervisor; zero EC2 instance management',
			orchestration: 'AWS ECS Task Definitions, Service auto-scaling, ALB integration',
			bestFor:
				'Production mission-critical enterprise microservices & long-running background workers'
		},
		render_caas: {
			title: 'Render Web Services (Managed PaaS/CaaS)',
			architecture: 'Git-push / Docker image automated web service deployment',
			securityModel: 'Sandboxed tenant containers with automatic SSL certificates',
			daemon: 'Managed cloud orchestration plane',
			orchestration: 'Automatic health-check rolling restarts and autoscaling',
			bestFor: 'Solo developers, startups, and teams needing zero-maintenance Node servers'
		}
	};

	// Simulator 2: IaC Template Generator
	type IacTool = 'opentofu' | 'pulumi' | 'wrangler';
	let selectedIacTool = $state<IacTool>('opentofu');

	const iacTemplates: Record<IacTool, { toolName: string; lang: string; snippet: string }> = {
		opentofu: {
			toolName: 'OpenTofu / Terraform (HCL)',
			lang: 'hcl',
			snippet: `resource "aws_ecs_task_definition" "web_engine" {
  family                   = "web-engine-prod"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_role.arn

  container_definitions = jsonencode([{
    name      = "sveltekit-node"
    image     = "ghcr.io/acme-org/web-engine:latest"
    essential = true
    portMappings = [{ containerPort = 3000, hostPort = 3000 }]
    environment = [
      { name = "NODE_ENV", value = "production" },
      { name = "ORIGIN", value = "https://engine.acme.co.uk" }
    ]
  }])
}`
		},
		pulumi: {
			toolName: 'Pulumi (TypeScript)',
			lang: 'typescript',
			snippet: `import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const cluster = new aws.ecs.Cluster("production-cluster");

const service = new awsx.ecs.FargateService("web-engine-service", {
    cluster: cluster.arn,
    taskDefinitionArgs: {
        container: {
            name: "sveltekit-app",
            image: "ghcr.io/acme-org/web-engine:latest",
            cpu: 256,
            memory: 512,
            essential: true,
            portMappings: [{ containerPort: 3000 }],
            environment: [
                { name: "NODE_ENV", value: "production" },
                { name: "ORIGIN", value: "https://engine.acme.co.uk" }
            ]
        }
    }
});`
		},
		wrangler: {
			toolName: 'Cloudflare Wrangler (JSONC / TOML)',
			lang: 'jsonc',
			snippet: `{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "web-engine-edge",
  "main": ".svelte-kit/cloudflare/_worker.js",
  "compatibility_date": "2026-09-01",
  "compatibility_flags": ["nodejs_compat"],
  "r2_buckets": [
    {
      "binding": "MEDIA_BUCKET",
      "bucket_name": "web-engine-media"
    }
  ],
  "vars": {
    "ENVIRONMENT": "production"
  }
}`
		}
	};
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
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
	{/snippet}

	{#snippet lab()}
		<!-- Simulator 1: Container Runtime Evaluator -->
		<LabCard title="Container Runtime & CaaS Evaluator" badge="OCI Specifications">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
					{#each ['podman', 'docker', 'ecs_fargate', 'render_caas'] as const as rk (rk)}
						<button
							onclick={() => (selectedRuntime = rk)}
							class="rounded-xl border p-2.5 text-center text-sm font-bold transition {selectedRuntime ===
							rk
								? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
								: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
						>
							{runtimeDetails[rk].title.split(' ')[0]}
						</button>
					{/each}
				</div>

				<div
					class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
				>
					<div>
						<h4 class="text-base font-bold text-slate-900 dark:text-white">
							{runtimeDetails[selectedRuntime].title}
						</h4>
						<p class="mt-0.5 text-sm text-indigo-600 dark:text-indigo-400">
							{runtimeDetails[selectedRuntime].architecture}
						</p>
					</div>

					<div class="space-y-2 border-t border-slate-200 pt-3 text-sm dark:border-slate-800">
						<div>
							<span class="font-bold text-slate-500">Security Model:</span>
							<p class="text-slate-800 dark:text-slate-200">
								{runtimeDetails[selectedRuntime].securityModel}
							</p>
						</div>
						<div>
							<span class="font-bold text-slate-500">Daemon Architecture:</span>
							<p class="text-slate-800 dark:text-slate-200">
								{runtimeDetails[selectedRuntime].daemon}
							</p>
						</div>
						<div>
							<span class="font-bold text-slate-500">Orchestration & Tooling:</span>
							<p class="text-slate-800 dark:text-slate-200">
								{runtimeDetails[selectedRuntime].orchestration}
							</p>
						</div>
						<div>
							<span class="font-bold text-slate-500">Recommended For:</span>
							<p class="text-slate-800 dark:text-slate-200">
								{runtimeDetails[selectedRuntime].bestFor}
							</p>
						</div>
					</div>
				</div>
			</div>
		</LabCard>

		<!-- Simulator 2: IaC Blueprint Generator -->
		<LabCard title="Declarative Infrastructure as Code (IaC)" badge="IaC Blueprints">
			<div class="space-y-4 font-mono text-sm">
				<div class="grid grid-cols-3 gap-2">
					{#each ['opentofu', 'pulumi', 'wrangler'] as const as it (it)}
						<button
							onclick={() => (selectedIacTool = it)}
							class="rounded-xl border p-2.5 text-center text-sm font-bold transition {selectedIacTool ===
							it
								? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
								: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
						>
							{iacTemplates[it].toolName.split(' ')[0]}
						</button>
					{/each}
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-900 p-4 dark:border-slate-800">
					<div class="flex items-center justify-between border-b border-slate-800 pb-2">
						<span class="text-sm font-bold text-slate-400">
							{iacTemplates[selectedIacTool].toolName}
						</span>
						<span class="text-sm text-emerald-400">Declarative Topology</span>
					</div>
					<pre class="mt-3 overflow-x-auto text-sm leading-relaxed text-slate-200"><code
							>{iacTemplates[selectedIacTool].snippet}</code
						></pre>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
