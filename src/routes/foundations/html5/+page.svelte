<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let dialogElement: HTMLDialogElement;
	let dialogResult = $state<string>('No action taken');
	let patternInput = $state<string>('https://api.example.com/api/v1/users/usr_2026');
	let parsedPatternGroup = $state<string>('');

	function testURLPattern() {
		try {
			if (typeof URLPattern !== 'undefined') {
				const pattern = new URLPattern({ pathname: '/api/v1/users/:userId' });
				const match = pattern.exec(patternInput);
				parsedPatternGroup = match?.pathname.groups.userId ?? 'No match';
			} else {
				// Fallback regex if browser lacks native URLPattern
				const match = patternInput.match(/\/api\/v1\/users\/([^/?#]+)/);
				parsedPatternGroup = match ? match[1] : 'No match (fallback parser)';
			}
		} catch (e: any) {
			parsedPatternGroup = 'Error parsing: ' + e.message;
		}
	}

	function openModal() {
		dialogElement?.showModal();
	}

	function handleDialogClose() {
		dialogResult = `Dialog closed with return value: "${dialogElement.returnValue || 'backdrop/escape'}"`;
	}
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Modern HTML5 Semantics & Web Standards</h3>
		<p class="text-base sm:text-lg">
			Web Standards provide native browser-level primitives that replace megabytes of legacy JavaScript libraries.
		</p>
		<ul>
			<li>
				<strong>Native <code>&lt;dialog&gt;</code>:</strong> Provides automatic focus trapping, backdrop dimming via <code>::backdrop</code>, and light dismissal with Esc without external dependencies.
			</li>
			<li>
				<strong>Exclusive <code>&lt;details name="..."&gt;</code>:</strong> Groups accordion items natively. Opening one item automatically closes siblings sharing the same <code>name</code> attribute.
			</li>
			<li>
				<strong>Web Standards (Streams & Web Crypto):</strong> First-class browser APIs like <code>URLPattern</code>, <code>TransformStream</code>, and <code>crypto.subtle</code> execute at native C++ speeds.
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Interactive HTML5 Native Dialog" badge="Zero-JS Focus Trap">
			<div class="space-y-4">
				<p class="text-base text-slate-600 dark:text-slate-300">
					Click below to invoke the browser's native top-layer modal system:
				</p>
				<button
					onclick={openModal}
					class="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500 text-base"
				>
					Open Native &lt;dialog&gt;
				</button>
				<p class="font-mono text-sm text-slate-500 dark:text-slate-400">{dialogResult}</p>
			</div>

			<!-- Native HTML Dialog -->
			<dialog
				bind:this={dialogElement}
				onclose={handleDialogClose}
				class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl backdrop:bg-slate-950/70 dark:border-slate-800 dark:bg-slate-900"
			>
				<form method="dialog" class="space-y-4">
					<h3 class="text-xl font-bold text-slate-900 dark:text-white">Native Browser Modal</h3>
					<p class="text-base text-slate-600 dark:text-slate-300">
						Focus is contained within this dialog. Pressing <kbd class="rounded border px-1 font-mono text-sm">Esc</kbd> or submitting this form dismisses it.
					</p>
					<div class="flex justify-end gap-3 pt-2">
						<button
							value="cancelled"
							class="rounded-xl border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 text-base"
						>
							Cancel
						</button>
						<button
							value="confirmed"
							class="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 text-base"
						>
							Confirm
						</button>
					</div>
				</form>
			</dialog>
		</LabCard>

		<LabCard title="Web Standard URLPattern Tester" badge="URLPattern API">
			<div class="space-y-4 font-mono text-sm">
				<label class="block space-y-1">
					<span class="text-slate-600 dark:text-slate-400 font-bold">Target Route URL:</span>
					<input
						type="text"
						bind:value={patternInput}
						class="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
					/>
				</label>
				<button
					onclick={testURLPattern}
					class="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 text-base"
				>
					Execute URLPattern Match
				</button>
				{#if parsedPatternGroup}
					<div class="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3.5 dark:border-indigo-900 dark:bg-indigo-950/30">
						<span class="text-sm font-bold text-indigo-700 dark:text-indigo-300">Extracted :userId parameter:</span>
						<p class="mt-1 text-base font-bold text-slate-900 dark:text-white">{parsedPatternGroup}</p>
					</div>
				{/if}
			</div>
		</LabCard>
	{/snippet}
</LabShell>
