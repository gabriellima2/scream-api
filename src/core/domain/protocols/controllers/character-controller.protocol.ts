import { GetCharacterByNameOutputDTO } from "../../dtos/character.dto";
import { CharacterEntity } from "../../entities/character.entity";

export namespace CharacterControllerProtocol {
	export type GetCharactersResponse = {
		items: CharacterEntity[];
		total: number;
		next: string | undefined;
		last: string | undefined;
	};
	export type GetCharacterResponse = GetCharacterByNameOutputDTO;
}
