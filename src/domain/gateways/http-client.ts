export interface HttpClient {
	getHtmlPage(url: string): Promise<string>;
}
