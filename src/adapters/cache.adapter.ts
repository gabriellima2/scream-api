export interface CacheAdapter<T> {
	get(id: string): T | undefined;
	clear(): void;
	insert(id: string, value: T): void;
	remove(id: string): void;
}
