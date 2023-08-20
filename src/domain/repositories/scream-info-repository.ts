export interface ScreamInfoRepository<T> {
	insert(data: Omit<T, "id">): Promise<T>;
	getByName(name: string): Promise<T>;
}
