import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { HttpClientGatewayImpl, ScraperGatewayImpl } from "../gateways";
import { MovieScraperAdapterImpl } from "../adapters";
import { MovieRepositoryImpl } from "../repositories";
import { MovieController } from "../controllers";
import { MovieService } from "../services";
import { MovieSchema } from "../schemas";
import { MovieModel } from "../models";

import type { HttpClientGateway, ScraperGateway } from "@/domain/gateways";
import type { MovieScraperAdapter } from "@/domain/adapters";
import type { MovieRepository } from "@/domain/repositories";
import type { Movie } from "@/domain/entities";

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
				scraper: ScraperGateway<Movie>,
				uri: string
			) => {
				return new MovieService(repository, scraper, uri);
			},
			inject: [MovieRepositoryImpl, ScraperGatewayImpl, "URI"],
		},
		{
			provide: ScraperGatewayImpl,
			useFactory: (http: HttpClientGateway, adapter: MovieScraperAdapter) => {
				return new ScraperGatewayImpl(http, adapter);
			},
			inject: [HttpClientGatewayImpl, MovieScraperAdapterImpl],
		},
		{
			provide: "URI",
			useValue: "https://scream.fandom.com/wiki",
		},
		MovieRepositoryImpl,
		HttpClientGatewayImpl,
		MovieScraperAdapterImpl,
	],
	exports: [MovieService],
})
export class MovieModule {}
