import { Movie } from "../entities/movie";

export interface MovieCrawlerAdapter {
	execute(html: string): Movie;
}
