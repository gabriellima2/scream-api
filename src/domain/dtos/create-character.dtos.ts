import { Character } from "@/domain/entities";

export type CreateCharacterInputDTO = Omit<Character, "id">;
export type CreateCharacterOutputDTO = Character | null;
