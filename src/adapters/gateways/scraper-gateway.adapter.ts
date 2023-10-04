export interface ScraperGatewayAdapter<T> {
	execute(url: string): Promise<T>;
}
