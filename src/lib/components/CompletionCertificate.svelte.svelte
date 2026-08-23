<script lang="ts">
	import { progress } from '$lib/state/progress.svelte';
	import { curriculum } from '$lib/data/curriculum';

	let studentName = $state('');
	let isModalOpen = $state(false);
	let certificateSvgRef = $state<SVGSVGElement | null>(null);

	let isComplete = $derived(progress.count === curriculum.length);
	let completionDate = $derived(
		new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
	);

	function downloadCertificate() {
		if (!certificateSvgRef) return;
		const svgData = new XMLSerializer().serializeToString(certificateSvgRef);
		const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
		const url = URL.createObjectURL(svgBlob);

		const downloadLink = document.createElement('a');
		downloadLink.href = url;
		downloadLink.download = `Web-Engineering-2026-Certificate-${studentName.replace(/\s+/g, '_') || 'Student'}.svg`;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
		URL.revokeObjectURL(url);
	}
</script>

{#if isComplete}
	<!-- Trophy Banner Trigger -->
	<div
		class="rounded-2xl border border-emerald-500/40 bg-linear-to-r from-emerald-500/10 via-indigo-500/10 to-cyan-500/10 p-6 shadow-lg backdrop-blur-md"
	>
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="space-y-1">
				<div class="flex items-center gap-2">
					<span class="text-xl">🏆</span>
					<h3 class="text-lg font-bold text-slate-900 dark:text-white">
						Curriculum 100% Mastered!
					</h3>
				</div>
				<p class="text-xs text-slate-600 dark:text-slate-400">
					You have completed all 21 interactive engineering labs across foundations, ECMAScript, UI
					systems, APIs, databases, and edge infrastructure.
				</p>
			</div>

			<button
				onclick={() => (isModalOpen = true)}
				class="shrink-0 rounded-xl bg-linear-to-r from-indigo-600 to-cyan-600 px-5 py-2.5 font-mono text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-500 hover:to-cyan-500 active:scale-95"
			>
				Claim Certificate 🎓
			</button>
		</div>
	</div>

	<!-- Modal Dialog -->
	{#if isModalOpen}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
		>
			<div
				class="w-full max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
			>
				<div
					class="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800"
				>
					<div>
						<h4 class="text-base font-bold text-slate-900 dark:text-white">
							Certificate of Engineering Mastery
						</h4>
						<span class="font-mono text-xs text-slate-500"
							>Modern Web Architecture (21 Modules)</span
						>
					</div>
					<button
						onclick={() => (isModalOpen = false)}
						aria-label="Close modal"
						class="text-slate-400 hover:text-slate-600 dark:hover:text-white"
					>
						✕
					</button>
				</div>

				<div>
					<label
						for="student-name"
						class="mb-1 block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300"
					>
						Recipient Name:
					</label>
					<input
						id="student-name"
						type="text"
						placeholder="e.g. Ada Lovelace"
						bind:value={studentName}
						class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 font-mono text-xs text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					/>
				</div>

				<!-- Renderable Certificate SVG -->
				<div
					class="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-inner dark:border-slate-800"
				>
					<svg
						bind:this={certificateSvgRef}
						viewBox="0 0 800 450"
						class="h-auto w-full font-sans text-white"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="800" height="450" fill="#030712" />

						<!-- Tech Grid Background Pattern -->
						<defs>
							<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
								<path
									d="M 40 0 L 0 0 0 40"
									fill="none"
									stroke="rgba(255,255,255,0.03)"
									stroke-width="1"
								/>
							</pattern>
							<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" stop-color="#6366f1" />
								<stop offset="50%" stop-color="#a855f7" />
								<stop offset="100%" stop-color="#06b6d4" />
							</linearGradient>
						</defs>
						<rect width="800" height="450" fill="url(#grid)" />

						<!-- Outer Border -->
						<rect
							x="20"
							y="20"
							width="760"
							height="410"
							rx="16"
							fill="none"
							stroke="url(#grad)"
							stroke-width="2"
						/>
						<rect
							x="28"
							y="28"
							width="744"
							height="394"
							rx="12"
							fill="none"
							stroke="rgba(255,255,255,0.08)"
							stroke-width="1"
						/>

						<!-- Header Badge -->
						<text
							x="400"
							y="80"
							text-anchor="middle"
							fill="#818cf8"
							font-family="monospace"
							font-size="12"
							font-weight="bold"
							letter-spacing="4"
						>
							INTERACTIVE CURRICULUM VERIFICATION
						</text>
						<text
							x="400"
							y="125"
							text-anchor="middle"
							fill="#ffffff"
							font-size="28"
							font-weight="800"
							letter-spacing="-0.5"
						>
							Modern Web Engineering 2026
						</text>

						<!-- Recipient Text -->
						<text x="400" y="180" text-anchor="middle" fill="#94a3b8" font-size="13">
							This is certified to verify that
						</text>
						<text
							x="400"
							y="225"
							text-anchor="middle"
							fill="#38bdf8"
							font-size="32"
							font-weight="bold"
						>
							{studentName.trim() || 'Software Engineer'}
						</text>
						<text x="400" y="260" text-anchor="middle" fill="#94a3b8" font-size="12">
							has completed all 21 modules covering HTML5, CSS Anchor, TypeScript 6, Svelte 5, Vue
							3.5,
						</text>
						<text x="400" y="280" text-anchor="middle" fill="#94a3b8" font-size="12">
							Drizzle ORM, Neon PostgreSQL, Better Auth, Serverless Redis, and V8 Edge Architecture.
						</text>

						<!-- Footer Details -->
						<line
							x1="80"
							y1="340"
							x2="720"
							y2="340"
							stroke="rgba(255,255,255,0.1)"
							stroke-width="1"
						/>
						<text x="100" y="380" fill="#64748b" font-family="monospace" font-size="11"
							>DATE: {completionDate}</text
						>
						<text
							x="400"
							y="380"
							text-anchor="middle"
							fill="#10b981"
							font-family="monospace"
							font-size="11">STATUS: 21/21 LABS MASTERED</text
						>
						<text
							x="700"
							y="380"
							text-anchor="end"
							fill="#64748b"
							font-family="monospace"
							font-size="11">ID: 0x2026-ENG</text
						>
					</svg>
				</div>

				<div class="flex justify-end gap-2 pt-2">
					<button
						onclick={() => (isModalOpen = false)}
						class="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 font-mono text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
					>
						Close
					</button>
					<button
						onclick={downloadCertificate}
						class="rounded-xl bg-indigo-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500"
					>
						Download SVG Certificate ⬇
					</button>
				</div>
			</div>
		</div>
	{/if}
{/if}
