import { CharacterEntity } from "../entities/character.entity";
import { PaginationInputDTO, PaginationOutputDTO } from "./pagination.dto";

export type CreateCharacterInputDTO = Omit<CharacterEntity, "id">;
export type CreateCharacterOutputDTO = CharacterEntity | null;

export type GetCharacterByNameInputDTO = string;
export type GetCharacterByNameOutputDTO = CharacterEntity | null;

export type GetCharactersInputDTO = PaginationInputDTO;
export type GetCharactersOutputDTO = PaginationOutputDTO<CharacterEntity[]>;

export type InsertCharactersInputDTO = Omit<CharacterEntity, "id">[];
export type InsertCharactersOutputDTO = CharacterEntity[];
