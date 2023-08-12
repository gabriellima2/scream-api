import { Character } from "../entities";

export namespace CharacterScrapingProtocols {
	export type Response = Partial<Omit<Character, "id">>;
}
