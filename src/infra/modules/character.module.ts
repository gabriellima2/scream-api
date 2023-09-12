import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
	CharacterNamesScraperAdapterImpl,
	CharacterScraperAdapterImpl,
} from "../adapters";
import { HttpClientGatewayImpl, ScraperGatewayImpl } from "../gateways";
import { CharacterRepositoryImpl } from "../repositories";
import { CharacterController } from "../controllers";
import { CharacterService } from "../services";
import { CharacterSchema } from "../schemas";
import { CharacterModel } from "../models";

import type {
	CharacterNamesScraperAdapter,
	CharacterScraperAdapter,
	CharacterScrapersAdapter,
} from "@/domain/adapters";
import type { CharacterRepository } from "@/domain/repositories";
import type { HttpClientGateway } from "@/domain/gateways";

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
				scrapers: CharacterScrapersAdapter,
				baseUrl: string
			) => {
				return new CharacterService(repository, scrapers, baseUrl);
			},
			inject: [CharacterRepositoryImpl, "SCRAPERS", "BASEURL"],
		},
		{
			provide: "SCRAPERS",
			useFactory: (
				http: HttpClientGateway,
				characterScraperAdapter: CharacterScraperAdapter,
				nameScraperAdapter: CharacterNamesScraperAdapter
			) => ({
				character: new ScraperGatewayImpl(http, characterScraperAdapter),
				names: new ScraperGatewayImpl(http, nameScraperAdapter),
			}),
			inject: [
				HttpClientGatewayImpl,
				CharacterScraperAdapterImpl,
				CharacterNamesScraperAdapterImpl,
			],
		},
		{
			provide: "BASEURL",
			useValue: "https://scream.fandom.com/wiki",
		},
		CharacterRepositoryImpl,
		HttpClientGatewayImpl,
		CharacterScraperAdapterImpl,
		CharacterNamesScraperAdapterImpl,
	],
	exports: [CharacterService],
})
export class CharacterModule {}
