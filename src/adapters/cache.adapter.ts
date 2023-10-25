export interface CacheAdapter<T> {
	get(id: string): T | null;
	clear(): void;
	insert(id: string, value: T): void;
	remove(id: string): void;
}
