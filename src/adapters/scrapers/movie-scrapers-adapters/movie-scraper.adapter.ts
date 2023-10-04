import { ScraperGatewayAdapter } from "@/adapters/gateways/scraper-gateway.adapter";
import { MovieScraperProtocols } from "@/core/domain/protocols/scrapers/movie-scrapers.protocol";

export interface MovieScraperAdapter
	extends ScraperGatewayAdapter<MovieScraperProtocols.Response> {}
