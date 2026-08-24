// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	// 1. ECMAScript Stage 4 & Modern Standard Extensions
	interface Uint8Array {
		toBase64(options?: { alphabet?: 'base64' | 'base64url' }): string;
		toHex(): string;
	}

	interface Uint8ArrayConstructor {
		fromBase64(string: string, options?: { alphabet?: 'base64' | 'base64url' }): Uint8Array;
		fromHex(string: string): Uint8Array;
	}

	interface ArrayConstructor {
		fromAsync<T>(
			iterableOrAsyncIterable: AsyncIterable<T> | Iterable<Promise<T>> | Iterable<T>
		): Promise<T[]>;
	}

	interface PromiseConstructor {
		withResolvers<T>(): {
			promise: Promise<T>;
			resolve: (value: T | PromiseLike<T>) => void;
			reject: (reason?: unknown) => void;
		};
	}

	interface Disposable {
		[Symbol.dispose](): void;
	}

	interface Math {
		sumPrecise(items: Iterable<number>): number;
	}

	interface Map<K, V> {
		getOrInsert(key: K, defaultValue: V): V;
		getOrInsertComputed(key: K, callback: (key: K) => V): V;
	}

	interface Set<T> {
		intersection<U>(other: ReadonlySet<U>): Set<T & U>;
		union<U>(other: ReadonlySet<U>): Set<T | U>;
		difference<U>(other: ReadonlySet<U>): Set<T>;
		symmetricDifference<U>(other: ReadonlySet<U>): Set<T | U>;
		isSubsetOf(other: ReadonlySet<unknown>): boolean;
		isSupersetOf(other: ReadonlySet<unknown>): boolean;
		isDisjointFrom(other: ReadonlySet<unknown>): boolean;
	}

	interface IteratorObject<T, TReturn = unknown, TNext = unknown> {
		[Symbol.iterator](): IteratorObject<T, TReturn, TNext>;
		map<U>(callbackfn: (value: T, index: number) => U): IteratorObject<U, undefined, unknown>;
		filter(predicate: (value: T, index: number) => boolean): IteratorObject<T, undefined, unknown>;
		take(limit: number): IteratorObject<T, undefined, unknown>;
		drop(limit: number): IteratorObject<T, undefined, unknown>;
		toArray(): T[];
	}

	interface IteratorConstructor {
		from<T>(iterable: Iterable<T> | Iterator<T>): IteratorObject<T>;
	}

	var Iterator: IteratorConstructor;

	// 2. SvelteKit App Namespace
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
