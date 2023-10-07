import { Injectable } from "@nestjs/common";

import { EmptyDataException } from "@/core/domain/exceptions/empty-data.exception";
import { isEmptyObject } from "@/core/domain/functions/is-empty-object";

import { ScraperGatewayAdapter } from "@/adapters/gateways/scraper-gateway.adapter";
import { HttpGatewayAdapter } from "@/adapters/gateways/http-gateway.adapter";
import { BaseScraperAdapter } from "@/adapters/scrapers/base-scraper.adapter";

@Injectable()
export class ScraperGatewayAdapterImpl<T extends object>
	implements ScraperGatewayAdapter<T>
{
	constructor(
		private readonly http: HttpGatewayAdapter,
		private readonly scraper: BaseScraperAdapter<T>
	) {}

	async execute(url: string): Promise<T> {
		const html = await this.http.getHtml(url);
		if (!html) throw new EmptyDataException();
		const data = this.scraper.execute(html);
		if (isEmptyObject(data)) throw new EmptyDataException();
		return data;
	}
}
