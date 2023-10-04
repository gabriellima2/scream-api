import {
	GetCharactersOutputDTO,
	GetCharacterByNameInputDTO,
	GetCharacterByNameOutputDTO,
} from "@/core/domain/dtos/character.dto";

export interface CharacterService {
	getCharacters(): Promise<GetCharactersOutputDTO>;
	getCharacterByName(
		params: GetCharacterByNameInputDTO
	): Promise<GetCharacterByNameOutputDTO>;
}
