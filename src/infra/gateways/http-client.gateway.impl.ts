import { Injectable } from "@nestjs/common";
import { HttpClientGateway } from "@/domain/gateways";

@Injectable()
export class HttpClientGatewayImpl implements HttpClientGateway {
	async getHtml(url: string): Promise<string> {
		const response = await fetch(url);
		const html = await response.text();
		return html;
	}
}
