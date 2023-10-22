import { CharactersNameScraperAdapterImpl } from "@/infrastructure/adapters/scrapers/character-scrapers-adapters/characters-name-scraper.adapter.impl";

export const makeCharactersNameScraperAdapterImpl = () =>
	new CharactersNameScraperAdapterImpl();
