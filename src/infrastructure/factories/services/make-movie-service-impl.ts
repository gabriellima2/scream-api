import { makeMoviesNameScraperAdapterImpl } from "../adapters/scrapers/make-movies-name-scraper-adapter-impl";
import { makeScraperGatewayAdapterImpl } from "../adapters/gateways/make-scraper-gateway-adapter-impl";
import { makeMovieScraperAdapterImpl } from "../adapters/scrapers/make-movie-scraper-adapter-impl";
import { makeMovieRepositoryImpl } from "../repositories/make-movie-repository-impl";

import { MovieServiceImpl } from "@/infrastructure/services/movie.service.impl";

import { SOURCE_WEBSITE } from "@/infrastructure/constants/source-website";
import type { MovieScraperGateways } from "@/adapters/gateways/movie-scraper-gateways";

export const makeMovieServiceImpl = () => {
	const repository = makeMovieRepositoryImpl();
	const scrapers: MovieScraperGateways = {
		movie: makeScraperGatewayAdapterImpl(makeMovieScraperAdapterImpl()),
		names: makeScraperGatewayAdapterImpl(makeMoviesNameScraperAdapterImpl()),
	};
	return new MovieServiceImpl(repository, scrapers, SOURCE_WEBSITE.MOVIE);
};
