import { ScraperGatewayAdapter } from "@/adapters/gateways/scraper-gateway.adapter";
import { CharacterData } from "@/core/domain/entities/character-entity/character.entity";

export interface CharacterScraperGateways {
	character: ScraperGatewayAdapter<CharacterData>;
	names: ScraperGatewayAdapter<string[]>;
}
