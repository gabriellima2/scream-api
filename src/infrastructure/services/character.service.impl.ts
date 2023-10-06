import { Injectable } from "@nestjs/common";

import { CharacterService } from "@/core/application/services/character.service";

import { CharacterEntity } from "@/core/domain/entities/character-entity/character.entity";

import {
	GetCharacterByNameInputDTO,
	GetCharacterByNameOutputDTO,
	GetCharactersInputDTO,
	GetCharactersOutputDTO,
	InsertCharactersInputDTO,
} from "@/core/domain/dtos/character.dto";
import { InvalidParamsException } from "@/core/domain/exceptions/invalid-params.exception";
import { CharacterScraperGateways } from "@/adapters/gateways/character-scraper-gateways";
import { CharacterRepository } from "@/core/domain/repositories/character.repository";
import { EmptyDataException } from "@/core/domain/exceptions/empty-data.exception";
import { createPathname } from "@/core/domain/functions/create-pathname";

@Injectable()
export class CharacterServiceImpl implements CharacterService {
	constructor(
		private readonly repository: CharacterRepository,
		private readonly scrapers: CharacterScraperGateways,
		private readonly baseUrl: string
	) {}

	async getCharacters(
		params?: GetCharactersInputDTO
	): Promise<GetCharactersOutputDTO> {
		const charactersFromDB = await this.repository.getAll();
		if (!charactersFromDB) {
			const namesUrl = `${this.baseUrl}/Category:Characters`;
			const names = await this.scrapers.names.execute(namesUrl);
			if (!names) throw new EmptyDataException();
			const promises = names.map(async (name) => {
				const characterUrl = `${this.baseUrl}/${createPathname(name)}`;
				return await this.scrapers.character.execute(characterUrl);
			});
			const characters = await Promise.all(promises);
			const insertedCharacters = await this.repository.insert(
				characters as InsertCharactersInputDTO
			);
			if (!insertedCharacters) throw new EmptyDataException();
			const insertedCharactersTotal = insertedCharacters.length;
			if (!params?.limit) {
				return {
					items: insertedCharacters,
					total: insertedCharactersTotal,
					currentPage: 1,
					totalPages: 1,
				};
			}
			const slicedCharacters = insertedCharacters.slice(0, params.limit);
			return {
				items: slicedCharacters,
				total: slicedCharacters.length,
				currentPage: 1,
				totalPages: 1,
			};
		}
		if (!params?.page)
			return {
				items: charactersFromDB,
				total: charactersFromDB.length,
				currentPage: 1,
				totalPages: 1,
			};
		const limit =
			params.limit === undefined || params.limit >= 60 ? 60 : params.limit;
		const pagedCharacters = await this.repository.getAll(
			params.page && { ...params, limit }
		);
		if (!pagedCharacters) throw new EmptyDataException();
		return {
			items: pagedCharacters,
			total: pagedCharacters.length,
			currentPage: params.page,
			totalPages: Math.ceil(charactersFromDB.length / limit),
		};
	}

	async getCharacter(
		name: GetCharacterByNameInputDTO
	): Promise<GetCharacterByNameOutputDTO> {
		if (!name) throw new InvalidParamsException();
		const characterFromDB = await this.repository.getByName(name);
		if (characterFromDB) return characterFromDB;
		const url = `${this.baseUrl}/${createPathname(name)}`;
		const characterScraped = await this.scrapers.character.execute(url);
		if (characterScraped.name === name) throw new EmptyDataException();
		const characterEntity = CharacterEntity.create(characterScraped);
		const character = {
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
