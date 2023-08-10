import { CharacterScrapingProtocols } from "../protocols";

export interface CharacterScrapingService {
	execute(url: string): Promise<CharacterScrapingProtocols.Response>;
}
