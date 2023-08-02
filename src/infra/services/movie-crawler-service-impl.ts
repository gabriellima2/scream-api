import { MovieCrawlerProtocols } from "@/domain/protocols/movie-crawler-protocols";
import { MovieCrawlerAdapter } from "@/domain/adapters/movie-crawler-adapter";
import { MovieCrawlerService } from "@/domain/services/movie-crawler-service";
import { HttpClient } from "@/domain/gateways/http-client";

export class MovieCrawlerServiceImpl implements MovieCrawlerService {
	constructor(
		private readonly http: HttpClient,
		private readonly crawler: MovieCrawlerAdapter
	) {}

	async execute(url: string): Promise<MovieCrawlerProtocols.Response> {
		const html = await this.http.getHtmlPage(url);
		const data = this.crawler.execute(html);
		return data;
	}
}
