/**
 * Normalizes a URL pathname by removing trailing slashes.
 * Empty or root path returns '/'.
 */
export function cleanPath(path: string): string {
	if (!path || path === '/') return '/';
	return path.replace(/\/+$/, '') || '/';
}

/**
 * Normalizes a route path for route key comparisons (without leading or trailing slash).
 */
export function toRouteKey(path: string): string {
	return path.replace(/^\/+/, '').replace(/\/+$/, '');
}
