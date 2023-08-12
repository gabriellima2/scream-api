export interface GenericScrapingGateway<T extends object> {
	execute(url: string): T;
}
