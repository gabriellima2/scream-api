import {
	GetCharactersOutputDTO,
	GetCharacterByNameInputDTO,
	GetCharacterByNameOutputDTO,
	GetCharactersInputDTO,
} from "@/core/domain/dtos/character.dto";

export interface CharacterService {
	getCharacters(params: GetCharactersInputDTO): Promise<GetCharactersOutputDTO>;
	getCharacter(
		params: GetCharacterByNameInputDTO
	): Promise<GetCharacterByNameOutputDTO>;
}
