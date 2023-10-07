import * as DTO from "../dtos/character.dto";

export interface CharacterRepository {
	create(
		data: DTO.CreateCharacterInputDTO
	): Promise<DTO.CreateCharacterOutputDTO>;
	getByName(
		name: DTO.GetCharacterByNameInputDTO
	): Promise<DTO.GetCharacterByNameOutputDTO>;
	getAll(): Promise<DTO.GetCharactersOutputDTO["items"]>;
}
