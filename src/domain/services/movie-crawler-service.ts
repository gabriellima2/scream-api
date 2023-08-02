import { Movie } from "../entities/movie";

export interface MovieCrawlerService {
	execute(url: string): Promise<Movie>;
}
