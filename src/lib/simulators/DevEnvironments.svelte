<script lang="ts">
	import LabCard from '$lib/components/LabCard.svelte';

	type OsKey = 'wsl2' | 'fedora44' | 'macos';
	let selectedOs = $state<OsKey>('fedora44');

	const osProfiles: Record<
		OsKey,
		{
			name: string;
			kernel: string;
			fsPerformance: string;
			containerParity: string;
			ideIntegration: string;
			telemetryRisk: string;
			summary: string;
		}
	> = {
		fedora44: {
			name: 'Fedora 44 (Native Linux)',
			kernel: 'Bare-Metal Linux Kernel (cgroups v2, systemd, Wayland)',
			fsPerformance: 'Native NVMe ext4/btrfs speed (0 translation overhead)',
			containerParity: '100% Native: Rootless Podman and Docker run directly on host kernel',
			ideIntegration: 'VSCodium / VS Code run directly without virtualization hops',
			telemetryRisk: 'Zero OS telemetry (100% free and open-source)',
			summary:
				'Optimal choice for maximum build performance, raw container execution, and open-source engineering.'
		},
		wsl2: {
			name: 'Windows 11 + WSL2 (Ubuntu / Debian)',
			kernel: 'Microsoft Hyper-V Virtualised Linux Subsystem Kernel',
			fsPerformance: 'Fast inside \\\\wsl$\\home; slow across /mnt/c (9P translation bottleneck)',
			containerParity: 'Requires Docker Desktop or subuid/subgid mapping inside WSL2',
			ideIntegration: 'VS Code WSL extension spawns a headless node server inside WSL',
			telemetryRisk: 'Host Windows telemetry active; WSL guest environment clean',
			summary:
				'Excellent compromise for developers requiring Windows desktop apps (Office, Adobe) while coding in Linux.'
		},
		macos: {
			name: 'macOS (Darwin / Apple Silicon)',
			kernel: 'XNU / Mach Microkernel',
			fsPerformance: 'Native APFS speed with strict file indexing',
			containerParity: 'Requires virtual machine layer (Colima, OrbStack, Docker Desktop)',
			ideIntegration: 'Native ARM64 binaries for VS Code / VSCodium',
			telemetryRisk: 'Apple platform analytics (configurable)',
			summary:
				'Popular Unix workstation with strong hardware battery efficiency and native iOS simulator access.'
		}
	};

	// Simulator 2: Modern 2026 Developer Toolchain Matrix
	type ToolchainKey = 'node26' | 'pnpm12' | 'vscodium' | 'openremote';
	let selectedTool = $state<ToolchainKey>('node26');

	const toolchainSpecs: Record<
		ToolchainKey,
		{ name: string; category: string; keyFeature: string; commandSample: string }
	> = {
		node26: {
			name: 'Node.js 26 LTS',
			category: 'JavaScript Runtime',
			keyFeature:
				'Native TypeScript type-stripping (node --experimental-strip-types), built-in SQLite engine, and permission model.',
			commandSample: 'node --strip-types src/index.ts'
		},
		pnpm12: {
			name: 'pnpm v12',
			category: 'Package Manager & Monorepo Engine',
			keyFeature:
				'Content-addressable hard-link store, workspace catalog: protocol, strict dependency isolation.',
			commandSample: 'pnpm install --frozen-lockfile'
		},
		vscodium: {
			name: 'VSCodium & Open VSX',
			category: 'Code Editor',
			keyFeature:
				'Community-driven, 100% telemetry-free binary release of VS Code using the open-source Open VSX extension registry.',
			commandSample: 'codium .'
		},
		openremote: {
			name: 'OpenRemote IoT & Edge Sync',
			category: 'IoT & Asset Orchestration',
			keyFeature:
				'Open-source IoT asset management, MQTT/HTTP protocol bridging, automated rule engines, and smart asset telemetry.',
			commandSample: 'docker compose -f openremote.yml up -d'
		}
	};
</script>

<!-- Simulator 1: OS & Workstation Benchmark Matrix -->
<LabCard title="Workstation OS & Architecture Benchmark" badge="OS Profiles">
	<div class="space-y-4 font-mono text-sm">
		<div class="grid grid-cols-3 gap-2">
			{#each ['fedora44', 'wsl2', 'macos'] as const as ok (ok)}
				<button
					onclick={() => (selectedOs = ok)}
					class="rounded-xl border p-2.5 text-center text-sm font-bold transition {selectedOs === ok
						? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
						: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
				>
					{osProfiles[ok].name.split(' ')[0]}
				</button>
			{/each}
		</div>

		<div
			class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
		>
			<div>
				<h4 class="text-base font-bold text-slate-900 dark:text-white">
					{osProfiles[selectedOs].name}
				</h4>
				<p class="mt-0.5 text-sm text-indigo-600 dark:text-indigo-400">
					{osProfiles[selectedOs].kernel}
				</p>
			</div>

			<div class="space-y-2 border-t border-slate-200 pt-3 text-sm dark:border-slate-800">
				<div>
					<span class="font-bold text-slate-500">Filesystem I/O Speed:</span>
					<p class="text-slate-800 dark:text-slate-200">
						{osProfiles[selectedOs].fsPerformance}
					</p>
				</div>
				<div>
					<span class="font-bold text-slate-500">Container Virtualisation:</span>
					<p class="text-slate-800 dark:text-slate-200">
						{osProfiles[selectedOs].containerParity}
					</p>
				</div>
				<div>
					<span class="font-bold text-slate-500">IDE Architecture:</span>
					<p class="text-slate-800 dark:text-slate-200">
						{osProfiles[selectedOs].ideIntegration}
					</p>
				</div>
				<div>
					<span class="font-bold text-slate-500">Privacy & Telemetry:</span>
					<p class="text-slate-800 dark:text-slate-200">
						{osProfiles[selectedOs].telemetryRisk}
					</p>
				</div>
				<div
					class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3 dark:border-indigo-900/60 dark:bg-indigo-950/30"
				>
					<span class="font-bold text-indigo-700 uppercase dark:text-indigo-300"
						>Engineering Verdict:</span
					>
					<p class="mt-0.5 text-sm text-slate-800 dark:text-slate-200">
						{osProfiles[selectedOs].summary}
					</p>
				</div>
			</div>
		</div>
	</div>
</LabCard>

<!-- Simulator 2: 2026 Modern Toolchain Configurator -->
<LabCard
	title="Modern Toolchain Stack (Node 26, pnpm 12, VSCodium & OpenRemote)"
	badge="Toolchain 2026"
>
	<div class="space-y-4 font-mono text-sm">
		<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
			{#each ['node26', 'pnpm12', 'vscodium', 'openremote'] as const as tk (tk)}
				<button
					onclick={() => (selectedTool = tk)}
					class="rounded-xl border p-2.5 text-center text-sm font-bold transition {selectedTool ===
					tk
						? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
						: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
				>
					{toolchainSpecs[tk].name.split(' ')[0]}
				</button>
			{/each}
		</div>

		<div
			class="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
		>
			<div class="flex items-center justify-between">
				<h4 class="text-base font-bold text-slate-900 dark:text-white">
					{toolchainSpecs[selectedTool].name}
				</h4>
				<span class="text-sm font-bold text-indigo-600 dark:text-indigo-400">
					{toolchainSpecs[selectedTool].category}
				</span>
			</div>
			<p class="text-sm text-slate-700 dark:text-slate-300">
				{toolchainSpecs[selectedTool].keyFeature}
			</p>
			<div class="rounded-xl bg-slate-900 p-3 text-sm text-emerald-400">
				<code>$ {toolchainSpecs[selectedTool].commandSample}</code>
			</div>
		</div>
	</div>
</LabCard>
