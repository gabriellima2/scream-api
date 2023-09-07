import { GenericScraperAdapter } from "./generic-scraper.adapter";
import { CharacterScraperProtocols } from "../protocols";

export interface CharacterScraperAdapter
	extends GenericScraperAdapter<CharacterScraperProtocols.Response> {}
