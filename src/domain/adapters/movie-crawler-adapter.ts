import { MovieCrawlerProtocols } from "../protocols/movie-crawler-protocols";

export interface MovieCrawlerAdapter {
	execute(html: string): MovieCrawlerProtocols.Response;
}
