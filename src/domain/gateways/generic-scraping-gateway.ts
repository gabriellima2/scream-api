import { GenericScrapingAdapter } from "../adapters";
import { EmptyDataError } from "../errors";
import { HttpClient } from "./http-client";

import { ObjectIsEmpty } from "../helpers/object-is-empty";

export class GenericScrapingGateway<T extends object> {
	constructor(
		private readonly http: HttpClient,
		private readonly genericScrapingAdapter: GenericScrapingAdapter<T>
	) {}

	async execute(url: string): Promise<T> {
		const html = await this.http.getHtmlPage(url);
		if (!html) throw new EmptyDataError();
		const data = this.genericScrapingAdapter.execute(html);
		if (ObjectIsEmpty(data)) throw new EmptyDataError();
		return data;
	}
}
