import {
	CreateCharacterInputDTO,
	CreateCharacterOutputDTO,
	FindCharacterByIdInputDTO,
	FindCharacterByIdOutputDTO,
	FindCharacterByNameInputDTO,
	FindCharacterByNameOutputDTO,
} from "../dtos/character-dtos";

export interface CharacterRepository {
	create(data: CreateCharacterInputDTO): Promise<CreateCharacterOutputDTO>;
	findByName(
		name: FindCharacterByNameInputDTO
	): Promise<FindCharacterByNameOutputDTO>;
	findById(id: FindCharacterByIdInputDTO): Promise<FindCharacterByIdOutputDTO>;
}
