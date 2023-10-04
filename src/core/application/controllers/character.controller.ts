import { CharacterControllerProtocol } from "@/core/domain/protocols/controllers/character-controller.protocol";

export interface CharacterController {
	getCharacters(
		page?: string,
		limit?: string
	): Promise<CharacterControllerProtocol.GetCharactersResponse>;
	getCharacter(
		name: string
	): Promise<CharacterControllerProtocol.GetCharacterResponse>;
}
