export interface ScreamInfoRepository<T> {
	insert(data: T): Promise<T & { id: string }>;
	getByName(name: string): Promise<T>;
}
