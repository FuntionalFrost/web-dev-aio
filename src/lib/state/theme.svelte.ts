import { browser } from '$app/environment';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

class ThemeManager {
	current = $state<Theme>('dark');

	constructor() {
		if (browser) {
			const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
			const fromDom = document.documentElement.dataset.theme as Theme | undefined;
			const initial = stored || fromDom || 'dark';

			this.set(initial);
		}
	}

	set(theme: Theme) {
		this.current = theme;
		if (browser) {
			localStorage.setItem(STORAGE_KEY, theme);
			document.documentElement.dataset.theme = theme;
			document.documentElement.classList.toggle('dark', theme === 'dark');
			document.documentElement.style.colorScheme = theme;
		}
	}

	toggle = () => {
		this.set(this.current === 'dark' ? 'light' : 'dark');
	};
}

export const theme = new ThemeManager();
