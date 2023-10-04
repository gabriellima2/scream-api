import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { MovieControllerImpl } from "../controllers/movie.controller";
import { MovieServiceImpl } from "../services/movie.service.impl";

import { MovieRepository } from "@/core/domain/repositories/movie.repository";
import { MovieRepositoryImpl } from "../repositories/movie.repository.impl";

import { MoviesNameScraperAdapterImpl } from "../adapters/scrapers/movie-scrapers-adapters/movies-name-scraper.adapter.impl";
import { MoviesNameScraperAdapter } from "@/adapters/scrapers/movie-scrapers-adapters/movies-name-scraper.adapter";
import { MovieScraperAdapterImpl } from "../adapters/scrapers/movie-scrapers-adapters/movie-scraper.adapter.impl";
import { MovieScraperAdapter } from "@/adapters/scrapers/movie-scrapers-adapters/movie-scraper.adapter";
import { ScraperGatewayAdapterImpl } from "../adapters/gateways/scraper-gateway.adapter.impl";
import { HttpGatewayAdapterImpl } from "../adapters/gateways/http-gateway.adapter.impl";
import { MovieScraperGateways } from "@/adapters/gateways/movie-scraper-gateways";
import { HttpGatewayAdapter } from "@/adapters/gateways/http-gateway.adapter";

import { MovieSchema } from "../schemas/movie.schema";
import { MovieModel } from "../models/movie.model";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: MovieModel.name, schema: MovieSchema }]),
	],
	controllers: [MovieControllerImpl],
	providers: [
		{
			provide: MovieServiceImpl,
			useFactory: (
				repository: MovieRepository,
				scrapers: MovieScraperGateways,
				baseUrl: string
			) => {
				return new MovieServiceImpl(repository, scrapers, baseUrl);
			},
			inject: [MovieRepositoryImpl, "SCRAPERS", "BASEURL"],
		},
		{
			provide: "SCRAPERS",
			useFactory: (
				http: HttpGatewayAdapter,
				movieScraperAdapter: MovieScraperAdapter,
				nameScraperAdapter: MoviesNameScraperAdapter
			) => ({
				movie: new ScraperGatewayAdapterImpl(http, movieScraperAdapter),
				names: new ScraperGatewayAdapterImpl(http, nameScraperAdapter),
			}),
			inject: [
				HttpGatewayAdapterImpl,
				MovieScraperAdapterImpl,
				MoviesNameScraperAdapterImpl,
			],
		},
		{
			provide: "BASEURL",
			useValue: "https://scream.fandom.com/wiki",
		},
		MovieRepositoryImpl,
		HttpGatewayAdapterImpl,
		MovieScraperAdapterImpl,
		MoviesNameScraperAdapterImpl,
	],
	exports: [MovieServiceImpl],
})
export class MovieModule {}
