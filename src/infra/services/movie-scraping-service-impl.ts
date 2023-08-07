import { MovieScrapingProtocols } from "@/domain/protocols";
import { MovieScrapingAdapter } from "@/domain/adapters";
import { MovieScrapingService } from "@/domain/services";
import { HttpClient } from "@/domain/gateways";

export class MovieScrapingServiceImpl implements MovieScrapingService {
	constructor(
		private readonly http: HttpClient,
		private readonly scraper: MovieScrapingAdapter
	) {}

	async execute(url: string): Promise<MovieScrapingProtocols.Response> {
		const html = await this.http.getHtmlPage(url);
		const data = this.scraper.execute(html);
		return data;
	}
}
