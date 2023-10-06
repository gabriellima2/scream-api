import { CharacterData } from "../entities/character-entity/character.entity";
import { PaginationInputDTO, PaginationOutputDTO } from "./pagination.dto";

export type CreateCharacterInputDTO = Omit<CharacterData, "id">;
export type CreateCharacterOutputDTO = Required<CharacterData> | null;

export type GetCharacterByNameInputDTO = string;
export type GetCharacterByNameOutputDTO = Required<CharacterData> | null;

export type GetCharactersInputDTO = PaginationInputDTO;
export type GetCharactersOutputDTO = PaginationOutputDTO<
	Required<CharacterData>[]
>;

export type InsertCharactersInputDTO = Omit<CharacterData, "id">[];
export type InsertCharactersOutputDTO = Required<CharacterData>[];
