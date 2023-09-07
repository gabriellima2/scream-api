export interface GenericScraperAdapter<T> {
	execute(html: string): T;
}
