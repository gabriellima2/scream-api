import { MovieScraperAdapterImpl } from "@/infrastructure/adapters/scrapers/movie-scrapers-adapters/movie-scraper.adapter.impl";

export const makeMovieScraperAdapterImpl = () => new MovieScraperAdapterImpl();
