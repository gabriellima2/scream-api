import { CharacterScraperProtocols } from "@/core/domain/protocols/scrapers/character-scrapers.protocol";
import { BaseScraperAdapter } from "../base-scraper.adapter";

export interface CharacterScraperAdapter
	extends BaseScraperAdapter<CharacterScraperProtocols.Response> {}
