import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { MovieSchema } from "../schemas/movie.schema";
import { MovieModel } from "../models/movie.model";

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
import { CacheAdapterImpl } from "../adapters/cache.adapter.impl";
import { CacheAdapter } from "@/adapters/cache.adapter";

import { MovieControllerImpl } from "../controllers/movie.controller.impl";
import {
	MovieServiceImpl,
	MovieServiceOptions,
} from "../services/movie.service.impl";

import { SOURCE_WEBSITE } from "../constants/source-website";
import type { MovieData } from "@/core/domain/entities/movie-entity/movie.entity";

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
				options: MovieServiceOptions
			) => {
				return new MovieServiceImpl(repository, scrapers, options);
			},
			inject: [MovieRepositoryImpl, "SCRAPERS", "OPTIONS"],
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
			provide: "OPTIONS",
			useFactory: (
				baseUrl: string,
				cache: CacheAdapter<Required<MovieData>>
			) => ({
				baseUrl,
				cache,
			}),
			inject: ["BASEURL", CacheAdapterImpl],
		},
		{ provide: "BASEURL", useValue: SOURCE_WEBSITE.MOVIE },
		MovieRepositoryImpl,
		HttpGatewayAdapterImpl,
		MovieScraperAdapterImpl,
		CacheAdapterImpl,
		MoviesNameScraperAdapterImpl,
	],
	exports: [MovieServiceImpl],
})
export class MovieModule {}
