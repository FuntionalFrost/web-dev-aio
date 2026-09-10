<script lang="ts">
	import LabShell from '$lib/components/LabShell.svelte';
	import LabCard from '$lib/components/LabCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type LicenseCategory =
		'All' | 'Permissive' | 'Weak Copyleft' | 'Strong Copyleft' | 'Source-Available';
	let selectedCategory = $state<LicenseCategory>('All');
	let selectedSpdx = $state('MIT');

	interface LicenseInfo {
		spdx: string;
		name: string;
		category: 'Permissive' | 'Weak Copyleft' | 'Strong Copyleft' | 'Source-Available';
		commercialUse: boolean;
		patentGrant: boolean;
		disclosureRequired: boolean;
		networkCopyleft: boolean;
		summary: string;
		idealFor: string;
	}

	const licenseList: LicenseInfo[] = [
		{
			spdx: 'MIT',
			name: 'MIT License',
			category: 'Permissive',
			commercialUse: true,
			patentGrant: false,
			disclosureRequired: false,
			networkCopyleft: false,
			summary:
				'Extremely permissive; permits commercial use, modification, distribution, and private sublicensing with simple copyright notice retention.',
			idealFor:
				'Broadest community adoption, frontend components, utility libraries (Svelte, React, Vue, Vite).'
		},
		{
			spdx: 'Apache-2.0',
			name: 'Apache License 2.0',
			category: 'Permissive',
			commercialUse: true,
			patentGrant: true,
			disclosureRequired: false,
			networkCopyleft: false,
			summary:
				'Permissive license that includes an explicit contributor patent grant and trademark restrictions to protect maintainers against patent litigation.',
			idealFor:
				'Enterprise open source, foundational backend engines, TypeScript tooling, Rust libraries.'
		},
		{
			spdx: 'BSD-3-Clause',
			name: 'BSD 3-Clause "New" or "Revised"',
			category: 'Permissive',
			commercialUse: true,
			patentGrant: false,
			disclosureRequired: false,
			networkCopyleft: false,
			summary:
				'Permissive license similar to MIT with an explicit clause prohibiting using author names for product endorsements without permission.',
			idealFor: 'Academic codebases, systems software, Go standard library ecosystem.'
		},
		{
			spdx: 'MPL-2.0',
			name: 'Mozilla Public License 2.0',
			category: 'Weak Copyleft',
			commercialUse: true,
			patentGrant: true,
			disclosureRequired: true,
			networkCopyleft: false,
			summary:
				'File-level weak copyleft: modifications to MPL-licensed files must remain open source, but larger aggregate proprietary works can bundle them cleanly.',
			idealFor:
				'Shared core libraries where you want modifications contributed back without infecting parent applications.'
		},
		{
			spdx: 'GPL-3.0',
			name: 'GNU General Public License v3',
			category: 'Strong Copyleft',
			commercialUse: true,
			patentGrant: true,
			disclosureRequired: true,
			networkCopyleft: false,
			summary:
				'Strong copyleft: any distributed binary or derivative work incorporating GPL code must make its entire source code available under GPL-3.0.',
			idealFor:
				'Desktop applications, Linux kernel utilities, developer tools committed to perpetual user software freedom.'
		},
		{
			spdx: 'AGPL-3.0',
			name: 'GNU Affero General Public License v3',
			category: 'Strong Copyleft',
			commercialUse: true,
			patentGrant: true,
			disclosureRequired: true,
			networkCopyleft: true,
			summary:
				'Closes the SaaS cloud loophole: interacting with the program over a network triggers the legal obligation to make modified source code downloadable.',
			idealFor:
				'Web applications and SaaS backends preventing cloud providers from hosting proprietary hosted forks without contributing back.'
		},
		{
			spdx: 'BSL-1.1',
			name: 'Business Source License 1.1',
			category: 'Source-Available',
			commercialUse: false,
			patentGrant: true,
			disclosureRequired: false,
			networkCopyleft: false,
			summary:
				'Source-available license that grants free use for development and non-production, while requiring a paid commercial license for production hosting; automatically converts to open source (e.g. Apache/MIT) after 3-4 years.',
			idealFor:
				'Commercial open-core companies (Sentry, CockroachDB, MariaDB) defending against hyperscaler cloud reselling.'
		},
		{
			spdx: 'FSL-1.1-MIT',
			name: 'Functional Source License (FSL)',
			category: 'Source-Available',
			commercialUse: false,
			patentGrant: true,
			disclosureRequired: false,
			networkCopyleft: false,
			summary:
				'Modern source-available license: grants complete free use except for directly competing products, and guarantees conversion to standard MIT after exactly two years.',
			idealFor:
				'Modern developer tools and startups wanting open innovation while protecting core revenue.'
		}
	];

	let filteredLicenses = $derived(
		selectedCategory === 'All'
			? licenseList
			: licenseList.filter((l) => l.category === selectedCategory)
	);

	let activeLicense = $derived(licenseList.find((l) => l.spdx === selectedSpdx) ?? licenseList[0]);
</script>

<LabShell codeHtml={data.codeHtml} rawCode={data.rawCode} filename={data.filename}>
	{#snippet guide()}
		<h3>Software License Types & Open Source Strategy</h3>
		<p class="text-base sm:text-lg">
			Selecting the right software license governs intellectual property rights, commercial
			exploitation, patent protection, and source code redistribution requirements.
		</p>
		<ul>
			<li>
				<strong>Permissive Licenses (MIT, Apache 2.0, BSD):</strong> Maximum freedom with minimal obligations
				(keep copyright notice). Apache 2.0 adds explicit patent defense.
			</li>
			<li>
				<strong>Copyleft Licenses (MPL, GPL, AGPL):</strong> Ensures software remains open. AGPL-3.0 specifically
				closes the cloud SaaS loophole by triggering disclosure when accessed over a network.
			</li>
			<li>
				<strong>Source-Available Licenses (BSL 1.1, FSL):</strong> Not strictly OSI Open Source, but allows
				public code inspection and non-competing use while converting to permissive open source after
				a fixed duration.
			</li>
			<li>
				<strong>Dual-Licensing Model:</strong> Providing software under both a strong copyleft / source-available
				license (for community) and a commercial proprietary license (for enterprise customers).
			</li>
		</ul>
	{/snippet}

	{#snippet lab()}
		<LabCard title="Interactive Software License Decision Matrix" badge="Legal Architecture">
			<div class="space-y-4 font-mono text-sm">
				<!-- Category Filter Pills -->
				<div class="flex flex-wrap gap-1.5">
					{#each ['All', 'Permissive', 'Weak Copyleft', 'Strong Copyleft', 'Source-Available'] as const as cat (cat)}
						<button
							onclick={() => (selectedCategory = cat)}
							class="rounded-xl px-3.5 py-1.5 text-sm font-bold transition sm:text-sm {selectedCategory ===
							cat
								? 'bg-indigo-600 text-white shadow-sm'
								: 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}"
						>
							{cat}
						</button>
					{/each}
				</div>

				<!-- License Selector Grid -->
				<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
					{#each filteredLicenses as lic (lic.spdx)}
						<button
							onclick={() => (selectedSpdx = lic.spdx)}
							class="rounded-xl border p-2.5 text-center text-sm font-bold transition sm:text-sm {selectedSpdx ===
							lic.spdx
								? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
								: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'}"
						>
							{lic.spdx}
						</button>
					{/each}
				</div>

				<!-- Active License Deep Dive -->
				<div
					class="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950"
				>
					<div
						class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800"
					>
						<div>
							<h4 class="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
								{activeLicense.name}
							</h4>
							<div class="mt-1 flex items-center gap-2">
								<span
									class="rounded-md bg-indigo-100 px-2.5 py-0.5 font-mono text-sm font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
								>
									SPDX: {activeLicense.spdx}
								</span>
								<span
									class="rounded-md bg-slate-200/80 px-2.5 py-0.5 font-mono text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
								>
									{activeLicense.category}
								</span>
							</div>
						</div>
					</div>

					<p class="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
						{activeLicense.summary}
					</p>

					<!-- Feature Badges 2x2 Grid -->
					<div class="grid grid-cols-1 gap-2.5 pt-1 text-sm sm:grid-cols-2">
						<!-- Commercial Production -->
						<div
							class="rounded-xl border p-3 transition-colors {activeLicense.commercialUse
								? 'border-emerald-500/40 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-950/40'
								: 'border-amber-500/40 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-950/40'}"
						>
							<span
								class="block text-sm font-bold tracking-wider text-slate-600 uppercase dark:text-slate-400"
							>
								Commercial Production:
							</span>
							<div class="mt-1 flex items-center gap-2">
								<span
									class="text-base font-bold {activeLicense.commercialUse
										? 'text-emerald-700 dark:text-emerald-400'
										: 'text-amber-700 dark:text-amber-400'}"
								>
									{activeLicense.commercialUse ? '✓ Unrestricted' : '⚠️ Restricted / Paid Tier'}
								</span>
							</div>
						</div>

						<!-- Patent Grant Included -->
						<div
							class="rounded-xl border p-3 transition-colors {activeLicense.patentGrant
								? 'border-emerald-500/40 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-950/40'
								: 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80'}"
						>
							<span
								class="block text-sm font-bold tracking-wider text-slate-600 uppercase dark:text-slate-400"
							>
								Patent Grant Included:
							</span>
							<div class="mt-1 flex items-center gap-2">
								<span
									class="text-base font-bold {activeLicense.patentGrant
										? 'text-emerald-700 dark:text-emerald-400'
										: 'text-slate-800 dark:text-slate-200'}"
								>
									{activeLicense.patentGrant ? '✓ Explicit Grant' : '— None Expressed'}
								</span>
							</div>
						</div>

						<!-- Source Disclosure -->
						<div
							class="rounded-xl border p-3 transition-colors {activeLicense.disclosureRequired
								? 'border-indigo-500/40 bg-indigo-50/60 dark:border-indigo-500/30 dark:bg-indigo-950/40'
								: 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80'}"
						>
							<span
								class="block text-sm font-bold tracking-wider text-slate-600 uppercase dark:text-slate-400"
							>
								Source Disclosure:
							</span>
							<div class="mt-1 flex items-center gap-2">
								<span
									class="text-base font-bold {activeLicense.disclosureRequired
										? 'text-indigo-700 dark:text-indigo-400'
										: 'text-emerald-700 dark:text-emerald-400'}"
								>
									{activeLicense.disclosureRequired
										? '⚠️ Required for Derivatives'
										: '✓ Not Required'}
								</span>
							</div>
						</div>

						<!-- Network / SaaS Trigger -->
						<div
							class="rounded-xl border p-3 transition-colors {activeLicense.networkCopyleft
								? 'border-purple-500/40 bg-purple-50/60 dark:border-purple-500/30 dark:bg-purple-950/40'
								: 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80'}"
						>
							<span
								class="block text-sm font-bold tracking-wider text-slate-600 uppercase dark:text-slate-400"
							>
								Network / SaaS Trigger:
							</span>
							<div class="mt-1 flex items-center gap-2">
								<span
									class="text-base font-bold {activeLicense.networkCopyleft
										? 'text-purple-700 dark:text-purple-400'
										: 'text-slate-800 dark:text-slate-200'}"
								>
									{activeLicense.networkCopyleft
										? '⚡ Triggered via Network (AGPL)'
										: '— Binary Delivery Only'}
								</span>
							</div>
						</div>
					</div>

					<!-- Ideal Strategic Use Case -->
					<div
						class="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/40"
					>
						<span
							class="block text-sm font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400"
						>
							Ideal Strategic Use Case:
						</span>
						<p class="mt-1 text-sm font-bold text-slate-900 sm:text-base dark:text-white">
							{activeLicense.idealFor}
						</p>
					</div>
				</div>
			</div>
		</LabCard>
	{/snippet}
</LabShell>
