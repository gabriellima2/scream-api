export interface ScraperGatewayAdapter<T> {
	execute(url: string): T;
}
