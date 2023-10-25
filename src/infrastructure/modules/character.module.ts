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
import { PaginationAdapterImpl } from "../adapters/pagination.adapter.impl";
import { CacheAdapterImpl } from "../adapters/cache.adapter.impl";
import { PaginationAdapter } from "@/adapters/pagination.adapter";
import { CacheAdapter } from "@/adapters/cache.adapter";

import { CharacterControllerImpl } from "../controllers/character.controller.impl";
import {
	CharacterServiceImpl,
	CharacterServiceOptions,
} from "../services/character.service.impl";

import { SOURCE_WEBSITE } from "../constants/source-website";
import type { CharacterData } from "@/core/domain/entities/character-entity/character.entity";

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
				options: CharacterServiceOptions
			) => {
				return new CharacterServiceImpl(repository, scrapers, options);
			},
			inject: [CharacterRepositoryImpl, "SCRAPERS", "OPTIONS"],
		},
		{
			provide: "SCRAPERS",
			useFactory: (
				http: HttpGatewayAdapter,
				characterScraper: CharacterScraperAdapter,
				nameScraper: CharactersNameScraperAdapter
			) => ({
				character: new ScraperGatewayAdapterImpl(http, characterScraper),
				names: new ScraperGatewayAdapterImpl(http, nameScraper),
			}),
			inject: [
				HttpGatewayAdapterImpl,
				CharacterScraperAdapterImpl,
				CharactersNameScraperAdapterImpl,
			],
		},
		{
			provide: "OPTIONS",
			useFactory: (
				baseUrl: string,
				paginate: PaginationAdapter<Required<CharacterData>>,
				cache: CacheAdapter<Required<CharacterData>>
			) => ({
				baseUrl,
				paginate,
				cache,
			}),
			inject: ["BASEURL", PaginationAdapterImpl, CacheAdapterImpl],
		},
		{ provide: "BASEURL", useValue: SOURCE_WEBSITE.CHARACTER },
		CharacterRepositoryImpl,
		HttpGatewayAdapterImpl,
		CharacterScraperAdapterImpl,
		PaginationAdapterImpl,
		CacheAdapterImpl,
		CharactersNameScraperAdapterImpl,
	],
	exports: [CharacterServiceImpl],
})
export class CharacterModule {}
