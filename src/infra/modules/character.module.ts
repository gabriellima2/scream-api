import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { HttpClientGatewayImpl, ScraperGatewayImpl } from "../gateways";
import {
	CharacterNamesScraperAdapterImpl,
	CharacterScraperAdapterImpl,
} from "../adapters";
import { CharacterRepositoryImpl } from "../repositories";
import { CharacterController } from "../controllers";
import { CharacterService } from "../services";
import { CharacterSchema } from "../schemas";
import { CharacterModel } from "../models";

import type { HttpClientGateway } from "@/domain/gateways";
import type {
	CharacterNamesScraperAdapter,
	CharacterScraperAdapter,
	CharacterScrapersAdapter,
} from "@/domain/adapters";
import type { CharacterRepository } from "@/domain/repositories";

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
				uri: string
			) => {
				return new CharacterService(repository, scrapers, uri);
			},
			inject: [CharacterRepositoryImpl, "SCRAPERS", "URI"],
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
			provide: "URI",
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
