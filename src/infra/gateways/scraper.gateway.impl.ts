import { GenericScraperAdapter } from "@/domain/adapters";
import { EmptyDataError } from "@/domain/errors";
import { Injectable } from "@nestjs/common";

import { HttpClientGateway, ScraperGateway } from "@/domain/gateways";
import { ObjectIsEmpty } from "@/domain/helpers/functions/object-is-empty";

@Injectable()
export class ScraperGatewayImpl<T extends object> implements ScraperGateway<T> {
	constructor(
		private readonly http: HttpClientGateway,
		private readonly scraperAdapter: GenericScraperAdapter<T>
	) {}

	async execute(url: string): Promise<T> {
		const html = await this.http.getHtml(url);
		if (!html) throw new EmptyDataError();
		const data = this.scraperAdapter.execute(html);
		if (ObjectIsEmpty(data)) throw new EmptyDataError();
		return data;
	}
}
