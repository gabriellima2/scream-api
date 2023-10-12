import { CharacterData } from "@/core/domain/entities/character-entity/character.entity";

export type MockCharacter = Required<CharacterData>;

export const mockCharacter = {
	id: "1",
	name: "Any_Name",
} as MockCharacter;
