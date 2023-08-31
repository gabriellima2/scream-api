import { GenericScrapingAdapter } from "@/domain/adapters";
import { EmptyDataError } from "@/domain/errors";
import { Injectable } from "@nestjs/common";

import { HttpClient } from "@/domain/gateways";
import { ObjectIsEmpty } from "@/domain/helpers/functions/object-is-empty";

@Injectable()
export class ScrapingImpl<T extends object> {
	constructor(
		private readonly http: HttpClient,
		private readonly scrapingAdapter: GenericScrapingAdapter<T>
	) {}

	async execute(url: string): Promise<T> {
		const html = await this.http.getHtmlPage(url);
		if (!html) throw new EmptyDataError();
		const data = this.scrapingAdapter.execute(html);
		if (ObjectIsEmpty(data)) throw new EmptyDataError();
		return data;
	}
}
