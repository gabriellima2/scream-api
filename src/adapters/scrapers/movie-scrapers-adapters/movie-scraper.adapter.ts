import { MovieScraperProtocols } from "@/core/domain/protocols/scrapers/movie-scrapers.protocol";
import { BaseScraperAdapter } from "../base-scraper.adapter";

export interface MovieScraperAdapter
	extends BaseScraperAdapter<MovieScraperProtocols.Response> {}
