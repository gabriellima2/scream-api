import { CharacterScraperAdapterImpl } from "@/infrastructure/adapters/scrapers/character-scrapers-adapters/character-scraper.adapter.impl";

export const makeCharacterScraperAdapterImpl = () =>
	new CharacterScraperAdapterImpl();
