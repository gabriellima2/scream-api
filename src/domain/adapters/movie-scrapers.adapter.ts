import { ScraperGateway } from "../gateways";
import { Movie } from "../entities";

export interface MovieScrapersAdapter {
	names: ScraperGateway<string[]>;
	movie: ScraperGateway<Movie>;
}
