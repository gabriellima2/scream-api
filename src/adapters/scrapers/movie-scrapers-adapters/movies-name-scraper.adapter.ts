import { ScraperGatewayAdapter } from "@/adapters/gateways/scraper-gateway.adapter";
import { MoviesNameScraperProtocols } from "@/core/domain/protocols/scrapers/movie-scrapers.protocol";

export interface MoviesNameScraperAdapter
	extends ScraperGatewayAdapter<MoviesNameScraperProtocols.Response> {}
