export interface BaseScraperAdapter<T extends object> {
	execute(html: string): T;
}
