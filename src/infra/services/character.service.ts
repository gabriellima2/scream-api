import { Injectable } from "@nestjs/common";

import {
	GetCharacterProtocols,
	GetCharactersProtocols,
} from "@/domain/protocols";
import { EmptyDataError, InvalidParamsError } from "@/domain/errors";
import { CharacterScrapersAdapter } from "@/domain/adapters";
import { CharacterRepository } from "@/domain/repositories";
import { CreateCharacterInputDTO } from "@/domain/dtos";

import { createPathname } from "@/domain/helpers/functions/create-pathname";

@Injectable()
export class CharacterService {
	constructor(
		private readonly repository: CharacterRepository,
		private readonly scrapers: CharacterScrapersAdapter,
		private readonly baseUrl: string
	) {}

	async getCharacters(): GetCharactersProtocols.Response {
		const url = `${this.baseUrl}/Category:Characters`;
		const names = await this.scrapers.names.execute(url);
		if (!names) throw new EmptyDataError();
		const promises = names.map(async (character) => {
			return await this.getCharacter(character);
		});
		const characters = await Promise.all(promises);
		return [...new Set(characters)];
	}

	async getCharacter(name: string): GetCharacterProtocols.Response {
		if (!name) throw new InvalidParamsError();
		const characterFromDB = await this.repository.findByName(name);
		if (characterFromDB) return characterFromDB;
		const url = `${this.baseUrl}/${createPathname(name)}`;
		const character = await this.scrapers.character.execute(url);
		if (!character) throw new EmptyDataError();
		const createdCharacter = await this.repository.create(
			character as CreateCharacterInputDTO
		);
		if (!createdCharacter) throw new Error();
		return createdCharacter;
	}
}
