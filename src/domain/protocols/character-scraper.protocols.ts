import { Character } from "../entities";

export namespace CharacterScraperProtocols {
	export type Response = Partial<Omit<Character, "id">>;
}
