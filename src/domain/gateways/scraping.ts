export interface Scraping<T extends object> {
	execute(url: string): T;
}
