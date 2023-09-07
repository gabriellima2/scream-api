import { Injectable } from "@nestjs/common";

import {
	GetCharacterProtocols,
	GetCharactersProtocols,
} from "@/domain/protocols";
import { EmptyDataError, InvalidParamsError } from "@/domain/errors";
import { CharacterRepository } from "@/domain/repositories";
import { CreateCharacterInputDTO } from "@/domain/dtos";
import { ScraperGateway } from "@/domain/gateways";
import { Character } from "@/domain/entities";

import { removeInvalidChars } from "@/domain/helpers/functions/remove-invalid-chars";
import { CHARACTER_NAMES } from "@/domain/constants/character-names";

@Injectable()
export class CharacterService {
	constructor(
		private readonly repository: CharacterRepository,
		private readonly scraper: ScraperGateway<Character>,
		private readonly uri: string
	) {}

	async getCharacters(): GetCharactersProtocols.Response {
		const promises = CHARACTER_NAMES.map(async (character) => {
			return await this.getCharacter(removeInvalidChars(character));
		});
		const characters = await Promise.all(promises);
		return [...new Set(characters)];
	}

	async getCharacter(name: string): GetCharacterProtocols.Response {
		if (!name) throw new InvalidParamsError();
		const characterFromDB = await this.repository.findByName(
			name.toLowerCase()
		);
		if (characterFromDB) return characterFromDB;
		const url = `${this.uri}/${name}`;
		const character = await this.scraper.execute(url);
		if (!character) throw new EmptyDataError();
		const createdCharacter = await this.repository.create(
			character as CreateCharacterInputDTO
		);
		if (!createdCharacter) throw new Error();
		return createdCharacter;
	}
}
