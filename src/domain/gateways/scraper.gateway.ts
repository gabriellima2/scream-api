export interface ScraperGateway<T extends object> {
	execute(url: string): Promise<Partial<Omit<T, "id">>>;
}
