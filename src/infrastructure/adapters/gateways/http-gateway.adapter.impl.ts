import { Injectable } from "@nestjs/common";
import { HttpGatewayAdapter } from "@/adapters/gateways/http-gateway.adapter";

@Injectable()
export class HttpGatewayAdapterImpl implements HttpGatewayAdapter {
	async getHtml(url: string): Promise<string> {
		const response = await fetch(url);
		const html = await response.text();
		return html;
	}
}
