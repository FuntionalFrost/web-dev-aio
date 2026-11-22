<script lang="ts">
	import { Button, Card, Drawer, Progress } from 'yaxa-svelte';
	import { treeData, type TreeNode } from '#lib/data/roadmap.js';
	import { progress } from '#lib/state/progress.svelte.js';

	const CELL_WIDTH = 270;
	const CELL_HEIGHT = 155;
	const NODE_WIDTH = 236;
	const NODE_HEIGHT = 68;

	const maxCol = Math.max(...treeData.map((n) => n.col));
	const maxRow = Math.max(...treeData.map((n) => n.row));
	const canvasWidth = (maxCol + 1) * CELL_WIDTH;
	const canvasHeight = (maxRow + 1) * CELL_HEIGHT;

	let selectedNode = $state<TreeNode | null>(null);
	let isSheetOpen = $state(false);

	function getNodeCenter(row: number, col: number) {
		return {
			x: col * CELL_WIDTH + CELL_WIDTH / 2,
			y: row * CELL_HEIGHT + CELL_HEIGHT / 2
		};
	}

	function handleOpenDetails(node: TreeNode) {
		selectedNode = node;
		isSheetOpen = true;
	}

	const progressPercent = $derived(
		Math.round((progress.completedNodes.length / treeData.length) * 100) || 0
	);

	const lines = $derived(
		treeData.flatMap((node) => {
			const targetCenter = getNodeCenter(node.row, node.col);
			return node.prerequisites
				.map((prereqId) => {
					const parent = treeData.find((n) => n.id === prereqId);
					if (!parent) return null;

					const sourceCenter = getNodeCenter(parent.row, parent.col);
					const isParentCompleted = progress.completedNodes.includes(parent.id);
					const isChildCompleted = progress.completedNodes.includes(node.id);

					const path = `M ${sourceCenter.x} ${sourceCenter.y} C ${sourceCenter.x} ${(sourceCenter.y + targetCenter.y) / 2}, ${targetCenter.x} ${(sourceCenter.y + targetCenter.y) / 2}, ${targetCenter.x} ${targetCenter.y}`;

					return {
						key: `${parent.id}-${node.id}`,
						path,
						isActive: isParentCompleted,
						isFullyActive: isParentCompleted && isChildCompleted
					};
				})
				.filter((l): l is NonNullable<typeof l> => l !== null);
		})
	);
</script>

<div class="flex min-h-[calc(100vh-4rem)] w-full flex-col bg-slate-50 dark:bg-slate-950">
	<header
		class="border-b border-slate-200 bg-white/80 p-4 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/80"
	>
		<Card
			variant="outline"
			padding="none"
			class="mx-auto w-full max-w-4xl border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60"
			ui={{ body: 'flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center' }}
		>
			<div class="flex items-center gap-3">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-lg text-primary-600 dark:bg-primary-950/60 dark:text-primary-400"
				>
					🗺️
				</div>
				<div>
					<h1 class="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
						Web Engineering Skill Tree
					</h1>
					<p class="text-xs text-slate-500 dark:text-slate-400">
						Click any node to inspect linked labs, resources, and unlock downstream tracks
					</p>
				</div>
			</div>
			<div class="flex max-w-sm flex-1 items-center gap-4 sm:justify-end">
				<div class="w-full space-y-1">
					<div class="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
						<span>Overall Path Completion</span>
						<span class="font-bold text-primary-600 dark:text-primary-400">{progressPercent}%</span>
					</div>
					<Progress
						value={progressPercent}
						size="sm"
						class="border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950"
					/>
				</div>
			</div>
		</Card>
	</header>

	<div class="flex flex-1 items-center justify-center overflow-auto p-8">
		<div class="relative" style="width: {canvasWidth}px; height: {canvasHeight}px;">
			<svg class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
				{#each lines as line (line.key)}
					<path
						d={line.path}
						fill="none"
						stroke="currentColor"
						class="text-slate-200 dark:text-slate-800"
						stroke-width="4"
					/>
					{#if line.isActive}
						<path
							d={line.path}
							fill="none"
							stroke={line.isFullyActive ? '#10b981' : '#6366f1'}
							stroke-width="4"
							class={!line.isFullyActive ? 'animate-pulse' : ''}
						/>
					{/if}
				{/each}
			</svg>

			{#each treeData as node (node.id)}
				{@const center = getNodeCenter(node.row, node.col)}
				{@const isCompleted = progress.completedNodes.includes(node.id)}
				{@const isUnlocked =
					node.prerequisites.length === 0 ||
					node.prerequisites.every((id) => progress.completedNodes.includes(id))}

				<div
					class="absolute -translate-x-1/2 -translate-y-1/2"
					style="left: {center.x}px; top: {center.y}px; width: {NODE_WIDTH}px; height: {NODE_HEIGHT}px;"
				>
					<button
						type="button"
						onclick={() => handleOpenDetails(node)}
						class="group flex h-full w-full items-center justify-between gap-2 rounded-xl border px-4 text-xs font-semibold tracking-wide shadow-sm transition-all duration-200 {isCompleted
							? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'
							: isUnlocked
								? 'cursor-pointer border-primary-500 bg-white text-slate-900 hover:scale-[1.03] dark:bg-slate-900 dark:text-slate-100'
								: 'cursor-pointer border-slate-200 bg-slate-100/70 text-slate-400 opacity-75 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-500'}"
					>
						<span class="text-left leading-snug">{node.title}</span>
						<span class="shrink-0 font-mono text-xs">
							{#if isCompleted}
								✓
							{:else if !isUnlocked}
								🔒
							{:else}
								○
							{/if}
						</span>
					</button>
				</div>
			{/each}
		</div>
	</div>

	<Drawer
		bind:open={isSheetOpen}
		title={selectedNode?.title}
		description={selectedNode?.description}
		class="border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
		ui={{
			content: 'flex flex-col justify-between sm:max-w-lg',
			header: 'space-y-2',
			title: 'text-xl font-bold',
			description: 'pt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400',
			footer: 'mt-auto border-t border-slate-200 pt-6 dark:border-slate-800/80'
		}}
	>
		{#snippet header()}
			{#if selectedNode}
				<div
					class="text-xs font-bold tracking-widest text-primary-600 uppercase dark:text-primary-400"
				>
					Skill Module
				</div>
			{/if}
		{/snippet}

		{#if selectedNode}
			<div class="space-y-6">
				<div
					class="w-fit rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400"
				>
					Estimated Focus: <strong class="text-slate-900 dark:text-slate-200"
						>{selectedNode.duration}</strong
					>
				</div>

				{#if selectedNode.labHref && selectedNode.labTitle}
					<div class="space-y-2">
						<h4 class="text-xs font-bold tracking-wider text-slate-500 uppercase">
							Interactive Lab in Web Engine
						</h4>
						<a
							href={selectedNode.labHref}
							onclick={() => (isSheetOpen = false)}
							class="flex items-center justify-between rounded-xl border border-primary-300 bg-primary-50/70 p-3 text-xs font-semibold text-primary-800 transition hover:bg-primary-100 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-200 dark:hover:bg-primary-950/70"
						>
							<span>{selectedNode.labTitle}</span>
							<span>&rarr;</span>
						</a>
					</div>
				{/if}

				<div class="space-y-2">
					<h4 class="text-xs font-bold tracking-wider text-slate-500 uppercase">
						External Reference Guides
					</h4>
					<div class="space-y-2">
						{#each selectedNode.resources as resource (resource.url)}
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								href={resource.url}
								target="_blank"
								rel="noreferrer"
								class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-700 transition hover:border-primary-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
							>
								<span>{resource.title}</span>
								<span class="text-slate-400">↗</span>
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						{/each}
					</div>
				</div>
			</div>
		{/if}

		{#snippet footer()}
			{#if selectedNode}
				{@const isCompleted = progress.completedNodes.includes(selectedNode.id)}
				{@const isUnlocked =
					selectedNode.prerequisites.length === 0 ||
					selectedNode.prerequisites.every((id) => progress.completedNodes.includes(id))}
				<Button
					disabled={!isUnlocked}
					color={isCompleted ? 'success' : 'primary'}
					block
					onclick={() => {
						if (selectedNode) progress.toggleNode(selectedNode.id);
					}}
					class="py-5 text-xs font-bold tracking-wide uppercase"
				>
					{#if !isUnlocked}
						Complete Prerequisites to Unlock
					{:else if isCompleted}
						Completed (Click to Reset)
					{:else}
						Mark Skill Complete
					{/if}
				</Button>
			{/if}
		{/snippet}
	</Drawer>
</div>
