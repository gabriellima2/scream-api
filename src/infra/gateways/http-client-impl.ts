import { Injectable } from "@nestjs/common";
import { HttpClient } from "@/domain/gateways";

@Injectable()
export class HttpClientImpl implements HttpClient {
	async getHtmlPage(url: string): Promise<string> {
		const response = await fetch(url);
		const html = await response.text();
		return html;
	}
}
