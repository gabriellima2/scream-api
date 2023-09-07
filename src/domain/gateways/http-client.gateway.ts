export interface HttpClientGateway {
	getHtmlPage(url: string): Promise<string | undefined>;
}
