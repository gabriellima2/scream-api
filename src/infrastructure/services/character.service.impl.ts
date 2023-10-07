import { Injectable } from "@nestjs/common";

import {
	CharacterData,
	CharacterEntity,
} from "@/core/domain/entities/character-entity/character.entity";
import { CharacterService } from "@/core/application/services/character.service";
import { PaginationAdapter } from "@/adapters/pagination.adapter";

import {
	GetCharacterByNameInputDTO,
	GetCharacterByNameOutputDTO,
	GetCharactersInputDTO,
	GetCharactersOutputDTO,
} from "@/core/domain/dtos/character.dto";
import { InvalidParamsException } from "@/core/domain/exceptions/invalid-params.exception";
import { CharacterScraperGateways } from "@/adapters/gateways/character-scraper-gateways";
import { CharacterRepository } from "@/core/domain/repositories/character.repository";
import { EmptyDataException } from "@/core/domain/exceptions/empty-data.exception";

import { createEndpointURL } from "../helpers/create-endpoint-url";

@Injectable()
export class CharacterServiceImpl implements CharacterService {
	constructor(
		private readonly repository: CharacterRepository,
		private readonly scrapers: CharacterScraperGateways,
		private readonly paginate: PaginationAdapter<Required<CharacterData>>,
		private readonly baseUrl: string
	) {}

	async getCharacters(
		params?: GetCharactersInputDTO
	): Promise<GetCharactersOutputDTO> {
		const namesUrl = `${this.baseUrl}/Category:Characters`;
		const names = await this.scrapers.names.execute(namesUrl);
		if (!names) throw new EmptyDataException();
		const promises = names.map(async (name) => {
			return await this.getCharacter(name);
		});
		const characters = await Promise.all(promises);
		if (!characters) throw new EmptyDataException();
		return this.paginate.execute(characters, params);
	}

	async getCharacter(
		name: GetCharacterByNameInputDTO
	): Promise<GetCharacterByNameOutputDTO> {
		if (!name) throw new InvalidParamsException();
		const characterFromDB = await this.repository.getByName(name);
		if (characterFromDB) return characterFromDB;
		const endpoint = createEndpointURL(this.baseUrl, name);
		const scrapedCharacter = await this.scrapers.character.execute(endpoint);
		if (scrapedCharacter.name === name) throw new EmptyDataException();
		const characterEntity = CharacterEntity.create(scrapedCharacter);
		const character: CharacterData = {
			name: characterEntity.name,
			image: characterEntity.image,
			description: characterEntity.description,
			born: characterEntity.born,
			personality: characterEntity.personality,
			status: characterEntity.status,
			portrayed_by: characterEntity.portrayed_by,
			appearances: characterEntity.appearances,
		};
		const createdCharacter = await this.repository.create(character);
		if (!createdCharacter) throw new Error();
		characterEntity.setId(createdCharacter.id);
		return { ...character, id: characterEntity.id };
	}
}
