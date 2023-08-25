import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { HttpClientImpl, ScrapingImpl } from "../gateways";
import { MovieScrapingAdapterImpl } from "../adapters";
import { MovieRepositoryImpl } from "../repositories";
import { MovieController } from "../controllers";
import { MovieService } from "../services";
import { MovieSchema } from "../schemas";
import { MovieModel } from "../models";

import { HttpClient, Scraping } from "@/domain/gateways";
import { MovieRepository } from "@/domain/repositories";
import { Movie } from "@/domain/entities";

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
				scraping: Scraping<Movie>,
				uri: string
			) => {
				return new MovieService(repository, scraping, uri);
			},
			inject: [MovieRepositoryImpl, ScrapingImpl, "URI"],
		},
		{
			provide: ScrapingImpl,
			useFactory: (http: HttpClient, adapter: MovieScrapingAdapterImpl) => {
				return new ScrapingImpl(http, adapter);
			},
			inject: [HttpClientImpl, MovieScrapingAdapterImpl],
		},
		{
			provide: "URI",
			useValue: "https://scream.fandom.com/wiki",
		},
		MovieRepositoryImpl,
		HttpClientImpl,
		MovieScrapingAdapterImpl,
	],
	exports: [MovieService],
})
export class MovieModule {}
