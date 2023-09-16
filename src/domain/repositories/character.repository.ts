import {
	CreateCharacterInputDTO,
	CreateCharacterOutputDTO,
	FindCharacterByNameInputDTO,
	FindCharacterByNameOutputDTO,
	GetAllCharactersInputDTO,
	GetAllCharactersOutputDTO,
	InsertManyCharactersInputDTO,
	InsertManyCharactersOutputDTO,
} from "../dtos";

export interface CharacterRepository {
	insertMany(
		data: InsertManyCharactersInputDTO
	): Promise<InsertManyCharactersOutputDTO>;
	create(data: CreateCharacterInputDTO): Promise<CreateCharacterOutputDTO>;
	findByName(
		name: FindCharacterByNameInputDTO
	): Promise<FindCharacterByNameOutputDTO>;
	getAll(params?: GetAllCharactersInputDTO): Promise<GetAllCharactersOutputDTO>;
}
