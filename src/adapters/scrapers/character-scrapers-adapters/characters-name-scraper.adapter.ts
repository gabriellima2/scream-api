import { CharactersNameScraperProtocols } from "@/core/domain/protocols/scrapers/character-scrapers.protocol";
import { ScraperGatewayAdapter } from "@/adapters/gateways/scraper-gateway.adapter";

export interface CharactersNameScraperAdapter
	extends ScraperGatewayAdapter<CharactersNameScraperProtocols.Response> {}
