import { MovieScrappingProtocols } from "../protocols";

export interface MovieScrappingService {
	execute(url: string): Promise<MovieScrappingProtocols.Response>;
}
