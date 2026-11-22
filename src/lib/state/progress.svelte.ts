const STORAGE_KEY = 'webdev-aio-roadmap-completed-nodes';

class ProgressState {
	completedNodes = $state<string[]>([]);

	constructor() {
		if (typeof window !== 'undefined') {
			try {
				const raw = window.localStorage.getItem(STORAGE_KEY);
				if (raw) {
					const parsed = JSON.parse(raw);
					if (Array.isArray(parsed)) {
						this.completedNodes = parsed.filter((item): item is string => typeof item === 'string');
					}
				}
			} catch {
				// Ignore storage errors in restricted environments
			}
		}
	}

	toggleNode(id: string) {
		if (this.completedNodes.includes(id)) {
			this.completedNodes = this.completedNodes.filter((nodeId) => nodeId !== id);
		} else {
			this.completedNodes = [...this.completedNodes, id];
		}

		if (typeof window !== 'undefined') {
			try {
				window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.completedNodes));
			} catch {
				// Ignore storage errors in restricted environments
			}
		}
	}
}

export const progress = new ProgressState();
