import { ScraperGatewayAdapter } from "@/adapters/gateways/scraper-gateway.adapter";
import { CharacterEntity } from "@/core/domain/entities/character.entity";

export interface CharacterScraperGateways {
	character: ScraperGatewayAdapter<CharacterEntity>;
	names: ScraperGatewayAdapter<string[]>;
}
