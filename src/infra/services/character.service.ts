import { Injectable } from "@nestjs/common";

import { GetCharacterProtocols } from "@/domain/protocols";
import { CreateCharacterInputDTO } from "@/domain/dtos/character-dtos";
import { EmptyDataError, InvalidParamsError } from "@/domain/errors";
import { CharacterRepository } from "@/domain/repositories";
import { Character } from "@/domain/entities";
import { Scraping } from "@/domain/gateways";

@Injectable()
export class CharacterService {
	constructor(
		private readonly repository: CharacterRepository,
		private readonly scraping: Scraping<Character>,
		private readonly uri: string
	) {}

	async getCharacter(name: string): GetCharacterProtocols.Response {
		if (!name) throw new InvalidParamsError();
		const characterFromDB = await this.repository.findByName(
			name.toLowerCase()
		);
		if (characterFromDB) return characterFromDB;
		const url = `${this.uri}/${name}`;
		const character = await this.scraping.execute(url);
		if (!character) throw new EmptyDataError();
		const createdCharacter = await this.repository.create(
			character as CreateCharacterInputDTO
		);
		if (!createdCharacter) throw new Error();
		return createdCharacter;
	}
}
