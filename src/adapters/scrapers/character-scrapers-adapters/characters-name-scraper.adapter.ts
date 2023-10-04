import { CharactersNameScraperProtocols } from "@/core/domain/protocols/scrapers/character-scrapers.protocol";
import { BaseScraperAdapter } from "../base-scraper.adapter";

export interface CharactersNameScraperAdapter
	extends BaseScraperAdapter<CharactersNameScraperProtocols.Response> {}
