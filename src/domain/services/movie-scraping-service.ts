import { MovieScrapingProtocols } from "../protocols";

export interface MovieScrapingService {
	execute(url: string): Promise<MovieScrapingProtocols.Response>;
}
