import { CharacterEntity } from "../../entities/character-entity/character.entity";
import { NameEntity } from "../../entities/name.entity";

export namespace CharacterScraperProtocols {
	export type Response = Partial<Omit<CharacterEntity, "id">>;
}

export namespace CharactersNameScraperProtocols {
	export type Response = NameEntity[] | undefined;
}
