<script lang="ts">
	import LabCard from '#lib/components/LabCard.svelte';

	let activeTab = $state<'proxy' | 'types'>('proxy');

	// Tab 1: Runtime JS Proxy Traps
	let targetObject = $state({ username: 'gandalf', age: 300 });
	let selectedAction = $state<'get' | 'set' | 'magic'>('get');
	let targetProperty = $state('username');
	let newValue = $state('');
	let logs = $state<string[]>([]);

	function runSimulation() {
		logs = [];
		if (selectedAction === 'get') {
			logs.push(`[Operation]: Reading "${targetProperty}"`);
			logs.push(`[Proxy Trap]: get(target, prop="${targetProperty}", receiver)`);
			if (targetProperty in targetObject) {
				logs.push(
					`[Reflect.get]: Resolved target["${targetProperty}"] -> ${JSON.stringify(targetObject[targetProperty as keyof typeof targetObject])}`
				);
			} else {
				logs.push(
					`[Dynamic Fallback]: Property "${targetProperty}" missing on target; synthesized virtual fallback.`
				);
			}
		} else if (selectedAction === 'set') {
			logs.push(`[Operation]: Assigning "${newValue}" to "${targetProperty}"`);
			logs.push(`[Proxy Trap]: set(target, prop="${targetProperty}", value="${newValue}")`);
			if (targetProperty === 'age' && (newValue.trim() === '' || Number.isNaN(Number(newValue)))) {
				logs.push('[Validation Error]: Trap rejected non-numeric assignment to "age".');
			} else {
				if (targetProperty === 'age') targetObject.age = Number(newValue);
				else if (targetProperty === 'username') targetObject.username = newValue;
				logs.push('[Reflect.set]: Target mutated and trap returned true.');
			}
		} else {
			logs.push(`[Operation]: Invoking "${targetProperty}()"`);
			if (targetProperty.startsWith('cast')) {
				logs.push(
					`[Dynamic Synthesis]: Intercepted unknown method! Synthesized -> "Casting ${targetProperty.replace('cast', '').toUpperCase() || 'SPELL'}!"`
				);
			} else {
				logs.push('[Proxy Trap]: Unknown dynamic method pattern (try prefix "cast...").');
			}
		}
	}

	// Tab 2: Compile-Time TypeScript Mapped & Conditional Type Transforms
	let activeTransformation = $state<'getters' | 'readonly' | 'optional' | 'pick'>('getters');

	const baseType = {
		id: 'string',
		title: 'string',
		released: 'boolean'
	} as const;

	let simulatedOutput = $derived.by(() => {
		if (activeTransformation === 'getters') {
			return `type Getters<T> = {\n  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];\n};\n\ntype GameGetters = {\n${Object.keys(
				baseType
			)
				.map(
					(key) =>
						`  get${key.charAt(0).toUpperCase() + key.slice(1)}: () => ${baseType[key as keyof typeof baseType]};`
				)
				.join('\n')}\n}`;
		}
		if (activeTransformation === 'readonly') {
			return `type Readonly<T> = {\n  readonly [K in keyof T]: T[K];\n};\n\ntype ReadonlyGame = {\n${Object.keys(
				baseType
			)
				.map((key) => `  readonly ${key}: ${baseType[key as keyof typeof baseType]};`)
				.join('\n')}\n}`;
		}
		if (activeTransformation === 'optional') {
			return `type Partial<T> = {\n  [K in keyof T]?: T[K];\n};\n\ntype PartialGame = {\n${Object.keys(
				baseType
			)
				.map((key) => `  ${key}?: ${baseType[key as keyof typeof baseType]};`)
				.join('\n')}\n}`;
		}
		return `type StringKeys<T> = {\n  [K in keyof T as T[K] extends string ? K : never]: T[K];\n};\n\ntype GameStringFields = {\n  id: string;\n  title: string;\n}`;
	});
</script>

<LabCard
	title="Metaprogramming: Runtime Proxy Traps & Compile-Time Type Transforms"
	badge="ES6 + TS6"
>
	<div class="space-y-6">
		<div
			class="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-950"
		>
			<button
				type="button"
				onclick={() => (activeTab = 'proxy')}
				class="rounded-lg px-4 py-2 text-xs font-bold transition {activeTab === 'proxy'
					? 'bg-primary-600 text-white shadow-xs'
					: 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}"
			>
				Runtime JS Proxy Traps
			</button>
			<button
				type="button"
				onclick={() => (activeTab = 'types')}
				class="rounded-lg px-4 py-2 text-xs font-bold transition {activeTab === 'types'
					? 'bg-primary-600 text-white shadow-xs'
					: 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}"
			>
				Compile-Time TS Mapped Types
			</button>
		</div>

		{#if activeTab === 'proxy'}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div
					class="min-w-0 space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/60"
				>
					<div
						class="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
					>
						1. Configure Trap Operation
					</div>

					<div class="space-y-1.5">
						<label
							for="proxy-action"
							class="block text-xs font-semibold text-slate-700 dark:text-slate-300"
						>
							Action Type
						</label>
						<select
							id="proxy-action"
							bind:value={selectedAction}
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
						>
							<option value="get">Read Property (get trap)</option>
							<option value="set">Write Property (set trap)</option>
							<option value="magic">Dynamic Method (get -> synthetic fn)</option>
						</select>
					</div>

					<div class="space-y-1.5">
						<label
							for="proxy-prop"
							class="block text-xs font-semibold text-slate-700 dark:text-slate-300"
						>
							Property / Key Name
						</label>
						<input
							id="proxy-prop"
							type="text"
							bind:value={targetProperty}
							placeholder={selectedAction === 'magic' ? 'castFireball' : 'username'}
							class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
						/>
					</div>

					{#if selectedAction === 'set'}
						<div class="space-y-1.5">
							<label
								for="proxy-val"
								class="block text-xs font-semibold text-slate-700 dark:text-slate-300"
							>
								New Value
							</label>
							<input
								id="proxy-val"
								type="text"
								bind:value={newValue}
								placeholder="e.g. 500"
								class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
							/>
						</div>
					{/if}

					<button
						type="button"
						onclick={runSimulation}
						class="w-full rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-amber-500"
					>
						Run Proxy Interception
					</button>
				</div>

				<div
					class="flex min-w-0 flex-col space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/60"
				>
					<div
						class="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
					>
						2. Live Execution Trace
					</div>

					<div class="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
						<span class="block font-semibold">Target State:</span>
						<code
							class="block w-full overflow-x-auto rounded-lg bg-slate-200 px-2.5 py-1.5 font-mono break-all text-slate-900 dark:bg-slate-800 dark:text-amber-300"
						>
							{JSON.stringify(targetObject)}
						</code>
					</div>

					<div
						class="min-h-44 min-w-0 flex-1 space-y-1.5 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-400"
					>
						{#if logs.length === 0}
							<p class="text-slate-500 italic">Configure an operation and run interception...</p>
						{/if}
						{#each logs as log, i (`log-${i}`)}
							<div class="border-b border-slate-900 pb-1.5 break-words">{log}</div>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div
					class="min-w-0 space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/60"
				>
					<div
						class="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
					>
						1. Base Type Definition
					</div>

					<pre
						class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-sky-400"><code
							>{`type Game = {
  id: string;
  title: string;
  released: boolean;
};`}</code
						></pre>

					<div class="space-y-2">
						<div class="text-xs font-bold text-slate-700 dark:text-slate-300">
							Select Type Transformation
						</div>
						<div class="grid grid-cols-1 gap-2">
							{#each [{ id: 'getters', label: 'Key Remapping: Generate Getters' }, { id: 'readonly', label: 'Modifier Mapping: Readonly<Game>' }, { id: 'optional', label: 'Partial Key Mapper: Partial<Game>' }, { id: 'pick', label: 'Conditional Key Filter: StringKeys<Game>' }] as const as item (item.id)}
								<button
									type="button"
									onclick={() => (activeTransformation = item.id)}
									class="rounded-xl border px-3.5 py-2.5 text-left text-xs font-semibold transition {activeTransformation ===
									item.id
										? 'border-primary-500 bg-primary-600 text-white shadow-xs'
										: 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'}"
								>
									{item.label}
								</button>
							{/each}
						</div>
					</div>
				</div>

				<div
					class="flex min-w-0 flex-col space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/60"
				>
					<div
						class="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
					>
						2. Synthesized Compile-Time Output
					</div>
					<pre
						class="min-h-60 flex-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-emerald-400"><code
							>{simulatedOutput}</code
						></pre>
				</div>
			</div>
		{/if}
	</div>
</LabCard>
