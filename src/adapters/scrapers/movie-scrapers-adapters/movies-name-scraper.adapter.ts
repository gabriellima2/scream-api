import { MoviesNameScraperProtocols } from "@/core/domain/protocols/scrapers/movie-scrapers.protocol";
import { BaseScraperAdapter } from "../base-scraper.adapter";

export interface MoviesNameScraperAdapter
	extends BaseScraperAdapter<MoviesNameScraperProtocols.Response> {}
