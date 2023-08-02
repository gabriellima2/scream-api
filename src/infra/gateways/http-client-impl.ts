import { HttpClient } from "@/domain/gateways";

export class HttpClientImpl implements HttpClient {
	async getHtmlPage(url: string): Promise<string> {
		const response = await fetch(url);
		const html = await response.text();
		return html;
	}
}
