/* eslint-disable @typescript-eslint/no-unused-vars */
import { CacheAdapter } from "@/adapters/cache.adapter";

interface Cache<T> {
	[id: string]: T;
}

export class CacheAdapterImpl<T> implements CacheAdapter<T> {
	private data: Cache<T>;
	constructor() {
		this.data = {};
	}
	get cache() {
		return Object.freeze(this.data);
	}
	public get(id: string): T | null {
		const formattedId = this.formatId(id);
		const data = this.data[formattedId];
		if (!data) return null;
		return data;
	}
	public clear(): void {
		this.data = {};
	}
	public insert(id: string, value: T): void {
		if (this.alreadyHaveId(id)) throw new Error();
		const formattedId = this.formatId(id);
		this.data = { ...this.data, [formattedId]: value };
	}
	public remove(id: string): void {
		const formattedId = this.formatId(id);
		const { [formattedId]: _, ...withRemovedData } = this.data;
		this.data = withRemovedData;
	}
	private alreadyHaveId(id: string): boolean {
		const formattedId = this.formatId(id);
		return Object.keys(this.data).some((key) => key === formattedId);
	}
	private formatId(id: string): string {
		return id.toLowerCase().trim().replaceAll(" ", "_");
	}
}
