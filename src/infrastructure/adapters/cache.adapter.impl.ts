/* eslint-disable @typescript-eslint/no-unused-vars */
import { CacheAdapter } from "@/adapters/cache.adapter";

interface Cache<T> {
	[id: string]: T;
}

export class CacheAdapterImpl<T> implements CacheAdapter<T> {
	private cache: Cache<T>;
	constructor() {
		this.cache = {};
	}
	public get(id: string): T {
		const formattedId = this.formatId(id);
		const data = this.cache[formattedId];
		if (!data) return;
		return data;
	}
	public clear(): void {
		this.cache = {};
	}
	public insert(id: string, value: T): void {
		if (this.alreadyHaveId(id)) throw new Error();
		const formattedId = this.formatId(id);
		this.cache = { ...this.cache, [formattedId]: value };
	}
	public remove(id: string): void {
		const formattedId = this.formatId(id);
		const { [formattedId]: _, ...withRemovedData } = this.cache;
		this.cache = withRemovedData;
	}
	private alreadyHaveId(id: string): boolean {
		const formattedId = this.formatId(id);
		return Object.keys(this.cache).some((key) => key === formattedId);
	}
	private formatId(id: string): string {
		return id.toLowerCase().trim().replaceAll(" ", "_");
	}
}
