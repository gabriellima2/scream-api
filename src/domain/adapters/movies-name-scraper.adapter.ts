import { GenericScraperAdapter } from "./generic-scraper.adapter";
import { MoviesNameScraperProtocols } from "../protocols";

export interface MoviesNameScraperAdapter
	extends GenericScraperAdapter<MoviesNameScraperProtocols.Response> {}
