import { CharacterData } from "../../entities/character-entity/character.entity";
import { NameEntity } from "../../entities/name.entity";

export namespace CharacterScraperProtocols {
	export type Response = Partial<Omit<CharacterData, "id">>;
}

export namespace CharactersNameScraperProtocols {
	export type Response = NameEntity[] | undefined;
}
