import { ScraperGateway } from "../gateways";
import { Character } from "../entities";

export interface CharacterScrapersAdapter {
	names: ScraperGateway<string[]>;
	character: ScraperGateway<Character>;
}
