import { GenericScraperAdapter } from "./generic-scraper.adapter";
import { CharacterNamesScraperProtocols } from "../protocols";

export interface CharacterNamesScraperAdapter
	extends GenericScraperAdapter<CharacterNamesScraperProtocols.Response> {}
