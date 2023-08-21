export interface Scraping<T extends object> {
	execute(url: string): Promise<Partial<Omit<T, "id">>>;
}
