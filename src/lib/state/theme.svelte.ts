type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

class ThemeManager {
	current = $state<Theme>('dark');

	constructor() {
		if (typeof window !== 'undefined') {
			const active = (document.documentElement.dataset.theme as Theme) || 'dark';
			this.current = active;
		}
	}

	set(theme: Theme) {
		this.current = theme;
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, theme);
			document.documentElement.dataset.theme = theme;
			document.documentElement.style.colorScheme = theme;
		}
	}

	toggle = () => {
		this.set(this.current === 'dark' ? 'light' : 'dark');
	};
}

export const theme = new ThemeManager();
