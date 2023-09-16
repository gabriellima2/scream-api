import { Character } from "../entities";

export type InsertManyCharactersInputDTO = Omit<Character, "id">[];

export type InsertManyCharactersOutputDTO = Character[];
