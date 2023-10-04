import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CharacterSchema } from "../schemas/character.schema";
import { CharacterModel } from "../models/character.model";

import { CharacterRepository } from "@/core/domain/repositories/character.repository";
import { CharacterRepositoryImpl } from "../repositories/character.repository.impl";

import { CharactersNameScraperAdapterImpl } from "../adapters/scrapers/character-scrapers-adapters/characters-name-scraper.adapter.impl";
import { CharactersNameScraperAdapter } from "@/adapters/scrapers/character-scrapers-adapters/characters-name-scraper.adapter";
import { CharacterScraperAdapterImpl } from "../adapters/scrapers/character-scrapers-adapters/character-scraper.adapter.impl";
import { CharacterScraperAdapter } from "@/adapters/scrapers/character-scrapers-adapters/character-scraper.adapter";
import { ScraperGatewayAdapterImpl } from "../adapters/gateways/scraper-gateway.adapter.impl";
import { CharacterScraperGateways } from "@/adapters/gateways/character-scraper-gateways";
import { HttpGatewayAdapterImpl } from "../adapters/gateways/http-gateway.adapter.impl";
import { HttpGatewayAdapter } from "@/adapters/gateways/http-gateway.adapter";

import { CharacterControllerImpl } from "../controllers/character.controller";
import { CharacterServiceImpl } from "../services/character.service.impl";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: CharacterModel.name, schema: CharacterSchema },
		]),
	],
	controllers: [CharacterControllerImpl],
	providers: [
		{
			provide: CharacterServiceImpl,
			useFactory: (
				repository: CharacterRepository,
				scrapers: CharacterScraperGateways,
				baseUrl: string
			) => {
				return new CharacterServiceImpl(repository, scrapers, baseUrl);
			},
			inject: [CharacterRepositoryImpl, "SCRAPERS", "BASEURL"],
		},
		{
			provide: "SCRAPERS",
			useFactory: (
				http: HttpGatewayAdapter,
				characterScraperAdapter: CharacterScraperAdapter,
				nameScraperAdapter: CharactersNameScraperAdapter
			) => ({
				character: new ScraperGatewayAdapterImpl(http, characterScraperAdapter),
				names: new ScraperGatewayAdapterImpl(http, nameScraperAdapter),
			}),
			inject: [
				HttpGatewayAdapterImpl,
				CharacterScraperAdapterImpl,
				CharactersNameScraperAdapterImpl,
			],
		},
		{
			provide: "BASEURL",
			useValue: "https://scream.fandom.com/wiki",
		},
		CharacterRepositoryImpl,
		HttpGatewayAdapterImpl,
		CharacterScraperAdapterImpl,
		CharactersNameScraperAdapterImpl,
	],
	exports: [CharacterServiceImpl],
})
export class CharacterModule {}
