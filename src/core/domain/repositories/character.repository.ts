import * as DTO from "../dtos/character.dto";

export interface CharacterRepository {
	insertMany(
		data: DTO.InsertManyCharactersInputDTO
	): Promise<DTO.InsertManyCharactersOutputDTO>;
	create(
		data: DTO.CreateCharacterInputDTO
	): Promise<DTO.CreateCharacterOutputDTO>;
	findByName(
		name: DTO.FindCharacterByNameInputDTO
	): Promise<DTO.FindCharacterByNameOutputDTO>;
	getAll(
		params?: DTO.GetAllCharactersInputDTO
	): Promise<DTO.GetAllCharactersOutputDTO>;
}
