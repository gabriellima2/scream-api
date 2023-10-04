import * as DTO from "../dtos/character.dto";

export interface CharacterRepository {
	insert(
		data: DTO.InsertCharactersInputDTO
	): Promise<DTO.InsertCharactersOutputDTO>;
	create(
		data: DTO.CreateCharacterInputDTO
	): Promise<DTO.CreateCharacterOutputDTO>;
	getByName(
		name: DTO.GetCharacterByNameInputDTO
	): Promise<DTO.GetCharacterByNameOutputDTO>;
	getAll(
		params: DTO.GetCharactersInputDTO
	): Promise<DTO.GetCharactersOutputDTO["items"]>;
}
