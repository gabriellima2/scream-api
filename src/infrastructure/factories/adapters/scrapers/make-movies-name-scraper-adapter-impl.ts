import { MoviesNameScraperAdapterImpl } from "@/infrastructure/adapters/scrapers/movie-scrapers-adapters/movies-name-scraper.adapter.impl";

export const makeMoviesNameScraperAdapterImpl = () =>
	new MoviesNameScraperAdapterImpl();
