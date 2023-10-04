import { CharacterScraperProtocols } from "@/core/domain/protocols/scrapers/character-scrapers.protocol";
import { ScraperGatewayAdapter } from "@/adapters/gateways/scraper-gateway.adapter";

export interface CharacterScraperAdapter
	extends ScraperGatewayAdapter<CharacterScraperProtocols.Response> {}
