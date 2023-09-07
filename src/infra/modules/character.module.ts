import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { HttpClientGatewayImpl, ScraperGatewayImpl } from "../gateways";
import { CharacterScraperAdapterImpl } from "../adapters";
import { CharacterRepositoryImpl } from "../repositories";
import { CharacterController } from "../controllers";
import { CharacterService } from "../services";
import { CharacterSchema } from "../schemas";
import { CharacterModel } from "../models";

import type { HttpClientGateway, ScraperGateway } from "@/domain/gateways";
import type { CharacterScraperAdapter } from "@/domain/adapters";
import type { CharacterRepository } from "@/domain/repositories";
import type { Character } from "@/domain/entities";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: CharacterModel.name, schema: CharacterSchema },
		]),
	],
	controllers: [CharacterController],
	providers: [
		{
			provide: CharacterService,
			useFactory: (
				repository: CharacterRepository,
				scraper: ScraperGateway<Character>,
				uri: string
			) => {
				return new CharacterService(repository, scraper, uri);
			},
			inject: [CharacterRepositoryImpl, ScraperGatewayImpl, "URI"],
		},
		{
			provide: ScraperGatewayImpl,
			useFactory: (
				http: HttpClientGateway,
				adapter: CharacterScraperAdapter
			) => {
				return new ScraperGatewayImpl(http, adapter);
			},
			inject: [HttpClientGatewayImpl, CharacterScraperAdapterImpl],
		},
		{
			provide: "URI",
			useValue: "https://scream.fandom.com/wiki",
		},
		CharacterRepositoryImpl,
		HttpClientGatewayImpl,
		CharacterScraperAdapterImpl,
	],
	exports: [CharacterService],
})
export class CharacterModule {}
