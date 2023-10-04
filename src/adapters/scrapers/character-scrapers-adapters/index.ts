import { CharacterScraperAdapter } from "./character-scraper.adapter";
import { CharactersNameScraperAdapter } from "./characters-name-scraper.adapter";

export interface CharacterScrapersAdapters {
	character: CharacterScraperAdapter;
	names: CharactersNameScraperAdapter;
}
