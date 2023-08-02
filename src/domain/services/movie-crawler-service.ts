import { MovieCrawlerProtocols } from "../protocols/movie-crawler-protocols";

export interface MovieCrawlerService {
	execute(url: string): Promise<MovieCrawlerProtocols.Response>;
}
