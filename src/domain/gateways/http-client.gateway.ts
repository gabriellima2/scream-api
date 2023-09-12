export interface HttpClientGateway {
	getHtml(url: string): Promise<string | undefined>;
}
