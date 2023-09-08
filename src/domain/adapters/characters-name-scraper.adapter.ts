import { GenericScraperAdapter } from "./generic-scraper.adapter";
import { CharactersNameScraperProtocols } from "../protocols";

export interface CharactersNameScraperAdapter
	extends GenericScraperAdapter<CharactersNameScraperProtocols.Response> {}
