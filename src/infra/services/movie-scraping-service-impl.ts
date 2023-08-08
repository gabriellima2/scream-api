import { Injectable } from "@nestjs/common";

import { MovieScrapingProtocols } from "@/domain/protocols";
import { MovieScrapingAdapter } from "@/domain/adapters";
import { MovieScrapingService } from "@/domain/services";
import { HttpClient } from "@/domain/gateways";
import { Movie } from "@/domain/entities";

@Injectable()
export class MovieScrapingServiceImpl implements MovieScrapingService {
	constructor(
		private readonly http: HttpClient,
		private readonly scraper: MovieScrapingAdapter
	) {}

	async execute(url: string): Promise<MovieScrapingProtocols.Response> {
		const html = await this.http.getHtmlPage(url);
		if (!html) throw new Error();
		const data = this.scraper.execute(html);
		if (Object.values(data).some((value) => !value)) throw new Error();
		return { id: "1", ...data } as Movie;
	}
}
