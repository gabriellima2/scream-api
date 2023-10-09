import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CharacterData } from "@/core/domain/entities/character-entity/character.entity";
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

import { CharacterControllerImpl } from "../controllers/character.controller.impl";
import { CharacterServiceImpl } from "../services/character.service.impl";

import { PaginationAdapterImpl } from "../adapters/pagination.adapter.impl";
import { PaginationAdapter } from "@/adapters/pagination.adapter";

type Characters = Required<CharacterData>;

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
				paginate: PaginationAdapter<Characters>,
				baseUrl: string
			) => {
				return new CharacterServiceImpl(
					repository,
					scrapers,
					paginate,
					baseUrl
				);
			},
			inject: [
				CharacterRepositoryImpl,
				"SCRAPERS",
				PaginationAdapterImpl,
				"BASEURL",
			],
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
		PaginationAdapterImpl,
		CharactersNameScraperAdapterImpl,
	],
	exports: [CharacterServiceImpl],
})
export class CharacterModule {}
