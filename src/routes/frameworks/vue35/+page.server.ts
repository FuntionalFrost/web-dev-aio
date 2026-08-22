import { highlightCode } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const prerender = true;

const vueSnippet = `<script setup lang="ts">
import { useTemplateRef, useId, watchEffect } from 'vue';

// 1. Vue 3.5 Reactive Props Destructure (No toRefs needed)
const { count = 0, label = 'Metric' } = defineProps<{
  count?: number;
  label?: string;
}>();

// 2. Typed template references via useTemplateRef()
const inputRef = useTemplateRef<HTMLInputElement>('customInput');

// 3. SSR-Safe Unique ID generation
const elementId = useId();

watchEffect(() => {
  // 'count' remains fully reactive despite being destructured!
  console.log(\`Prop count changed: \${count}\`);
});
</script>

<template>
  <div :id="elementId" class="panel">
    <label :for="\`input-\${elementId}\`">{{ label }}: {{ count }}</label>
    <input :id="\`input-\${elementId}\`" ref="customInput" />
    
    <!-- 4. Deferred Teleport target mounting -->
    <Teleport defer to="#modal-target">
      <div class="teleported-node">Mounted after target renders</div>
    </Teleport>
  </div>
</template>`;

export const load: PageServerLoad = async () => {
	const highlightedCode = await highlightCode(vueSnippet, 'html');

	return {
		meta: {
			title: 'Vue 3.5 Reactive Props & Modern Composition Primitives',
			description:
				'Explore reactive props destructuring, useTemplateRef, useId SSR identifiers, and memory-optimized reactivity engine upgrades.'
		},
		codeHtml: highlightedCode,
		rawCode: vueSnippet
	};
};
