import {
	CreateCharacterInputDTO,
	CreateCharacterOutputDTO,
	FindCharacterByNameInputDTO,
	FindCharacterByNameOutputDTO,
} from "../dtos";

export interface CharacterRepository {
	create(data: CreateCharacterInputDTO): Promise<CreateCharacterOutputDTO>;
	findByName(
		name: FindCharacterByNameInputDTO
	): Promise<FindCharacterByNameOutputDTO>;
}
