import { ScraperGatewayAdapter } from "@/adapters/gateways/scraper-gateway.adapter";
import { MovieData } from "@/core/domain/entities/movie-entity/movie.entity";

export interface MovieScraperGateways {
	movie: ScraperGatewayAdapter<MovieData>;
	names: ScraperGatewayAdapter<string[]>;
}
