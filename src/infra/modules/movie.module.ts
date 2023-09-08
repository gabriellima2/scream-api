import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { HttpClientGatewayImpl, ScraperGatewayImpl } from "../gateways";
import {
	MovieNamesScraperAdapterImpl,
	MovieScraperAdapterImpl,
} from "../adapters";
import { MovieRepositoryImpl } from "../repositories";
import { MovieController } from "../controllers";
import { MovieService } from "../services";
import { MovieSchema } from "../schemas";
import { MovieModel } from "../models";

import type { HttpClientGateway } from "@/domain/gateways";
import type {
	MovieNamesScraperAdapter,
	MovieScraperAdapter,
	MovieScrapersAdapter,
} from "@/domain/adapters";
import type { MovieRepository } from "@/domain/repositories";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: MovieModel.name, schema: MovieSchema }]),
	],
	controllers: [MovieController],
	providers: [
		{
			provide: MovieService,
			useFactory: (
				repository: MovieRepository,
				scrapers: MovieScrapersAdapter,
				uri: string
			) => {
				return new MovieService(repository, scrapers, uri);
			},
			inject: [MovieRepositoryImpl, "SCRAPERS", "URI"],
		},
		{
			provide: "SCRAPERS",
			useFactory: (
				http: HttpClientGateway,
				movieScraperAdapter: MovieScraperAdapter,
				nameScraperAdapter: MovieNamesScraperAdapter
			) => ({
				movie: new ScraperGatewayImpl(http, movieScraperAdapter),
				names: new ScraperGatewayImpl(http, nameScraperAdapter),
			}),
			inject: [
				HttpClientGatewayImpl,
				MovieScraperAdapterImpl,
				MovieNamesScraperAdapterImpl,
			],
		},
		{
			provide: "URI",
			useValue: "https://scream.fandom.com/wiki",
		},
		MovieRepositoryImpl,
		HttpClientGatewayImpl,
		MovieScraperAdapterImpl,
		MovieNamesScraperAdapterImpl,
	],
	exports: [MovieService],
})
export class MovieModule {}
