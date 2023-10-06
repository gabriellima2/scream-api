import { GetCharacterByNameOutputDTO } from "../../dtos/character.dto";
import { CharacterData } from "../../entities/character-entity/character.entity";

export namespace CharacterControllerProtocol {
	export type GetCharactersResponse = {
		items: CharacterData[];
		total: number;
		next: string | undefined;
		last: string | undefined;
	};
	export type GetCharacterResponse = GetCharacterByNameOutputDTO;
}
