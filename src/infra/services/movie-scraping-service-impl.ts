import { Injectable } from "@nestjs/common";

import { MovieScrapingProtocols } from "@/domain/protocols";
import { MovieScrapingAdapter } from "@/domain/adapters";
import { MovieScrapingService } from "@/domain/services";
import { EmptyDataError } from "@/domain/errors";
import { HttpClient } from "@/domain/gateways";
import { Movie } from "@/domain/entities";

import { ObjectIsEmpty } from "@/domain/helpers/object-is-empty";

@Injectable()
export class MovieScrapingServiceImpl implements MovieScrapingService {
	constructor(
		private readonly http: HttpClient,
		private readonly scraper: MovieScrapingAdapter
	) {}

	async execute(url: string): Promise<MovieScrapingProtocols.Response> {
		const html = await this.http.getHtmlPage(url);
		if (!html) throw new EmptyDataError();
		const data = this.scraper.execute(html);
		if (ObjectIsEmpty(data)) throw new EmptyDataError();
		return { id: "1", ...data } as Movie;
	}
}
