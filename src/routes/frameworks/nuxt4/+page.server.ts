import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const nuxtSnippet = `// 1. Nuxt 4 Unified Directory Structure (app/)
// app/pages/index.vue
<script setup lang="ts">
// 2. Deduplicated, Universal Data Fetching with useAsyncData
const { data: telemetry, status } = await useAsyncData('cluster-health', () =>
  $fetch('/api/v1/metrics')
);

// 3. Nuxt UI / Reka UI Compound Component
const items = [
  [{ label: 'System Dashboard', icon: 'i-heroicons-chart-bar' }],
  [{ label: 'Disconnect', icon: 'i-heroicons-arrow-left-on-rectangle' }]
];
</script>

<template>
  <div class="p-6">
    <!-- Nuxt UI Dropdown with integrated Reka UI accessibility -->
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton color="primary" variant="solid" label="Cluster Actions" />
    </UDropdown>

    <div v-if="status === 'pending'" class="skeleton-loader" />
    <pre v-else>{{ telemetry }}</pre>
  </div>
</template>`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(nuxtSnippet, 'html');

	return {
		meta: {
			title: 'Nuxt 4 Architecture & Nuxt UI (Reka UI) Systems',
			description:
				'Master the forward-compatible Nuxt 4 app/ root structure, universal useAsyncData lifecycles, and Nuxt UI design token customization.'
		},
		codeHtml: highlightedCode,
		rawCode: nuxtSnippet
	};
};
