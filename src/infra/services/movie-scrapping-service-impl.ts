import { MovieScrappingProtocols } from "@/domain/protocols";
import { MovieScrappingAdapter } from "@/domain/adapters";
import { MovieScrappingService } from "@/domain/services";
import { HttpClient } from "@/domain/gateways";

export class MovieScrappingServiceImpl implements MovieScrappingService {
	constructor(
		private readonly http: HttpClient,
		private readonly scrapping: MovieScrappingAdapter
	) {}

	async execute(url: string): Promise<MovieScrappingProtocols.Response> {
		const html = await this.http.getHtmlPage(url);
		const data = this.scrapping.execute(html);
		return data;
	}
}
