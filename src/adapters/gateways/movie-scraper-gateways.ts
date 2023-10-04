import { ScraperGatewayAdapter } from "@/adapters/gateways/scraper-gateway.adapter";
import { MovieEntity } from "@/core/domain/entities/movie.entity";

export interface MovieScraperGateways {
	movie: ScraperGatewayAdapter<MovieEntity>;
	names: ScraperGatewayAdapter<string[]>;
}
