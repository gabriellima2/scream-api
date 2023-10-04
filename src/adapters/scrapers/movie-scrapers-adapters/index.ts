import { MovieScraperAdapter } from "./movie-scraper.adapter";
import { MoviesNameScraperAdapter } from "./movies-name-scraper.adapter";

export interface MovieScrapersAdapters {
	Movie: MovieScraperAdapter;
	names: MoviesNameScraperAdapter;
}
