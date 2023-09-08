import { GenericScraperAdapter } from "./generic-scraper.adapter";
import { MovieNamesScraperProtocols } from "../protocols";

export interface MovieNamesScraperAdapter
	extends GenericScraperAdapter<MovieNamesScraperProtocols.Response> {}
