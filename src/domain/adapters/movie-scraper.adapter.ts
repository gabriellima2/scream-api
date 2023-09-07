import { GenericScraperAdapter } from "./generic-scraper.adapter";
import { MovieScraperProtocols } from "../protocols";

export interface MovieScraperAdapter
	extends GenericScraperAdapter<MovieScraperProtocols.Response> {}
