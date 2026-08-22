// src/lib/stores/progress.svelte.ts
const STORAGE_KEY = 'sveltekit_guide_progress_v1';

function createProgressStore() {
	let completedModules = $state<string[]>([]);

	// Load from localStorage in browser context
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				completedModules = JSON.parse(saved);
			} catch {
				completedModules = [];
			}
		}
	}

	function toggleComplete(moduleId: string) {
		if (completedModules.includes(moduleId)) {
			completedModules = completedModules.filter((id) => id !== moduleId);
		} else {
			completedModules = [...completedModules, moduleId];
		}
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(completedModules));
		}
	}

	function isComplete(moduleId: string) {
		return completedModules.includes(moduleId);
	}

	return {
		get list() {
			return completedModules;
		},
		get count() {
			return completedModules.length;
		},
		toggleComplete,
		isComplete
	};
}

export const progress = createProgressStore();
