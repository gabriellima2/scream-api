import { Injectable } from "@nestjs/common";

import {
	CharacterData,
	CharacterEntity,
} from "@/core/domain/entities/character-entity/character.entity";
import { NameEntity } from "@/core/domain/entities/character-entity/name.entity";
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
import { UnexpectedException } from "@/core/domain/exceptions/unexpected.exception";
import { EmptyDataException } from "@/core/domain/exceptions/empty-data.exception";

import { createEndpointURL } from "../helpers/create-endpoint-url";
import { isEmptyArray } from "@/core/domain/functions/is-empty-array";
import { isEmptyObject } from "@/core/domain/functions/is-empty-object";

let cachedNames: string[];
let cachedCharacters: { [key: string]: GetCharacterByNameOutputDTO } = {};

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
		const hasNamesCache = !!cachedNames && !isEmptyArray(cachedNames);
		const names = hasNamesCache
			? cachedNames
			: await this.scrapers.names.execute(namesUrl);
		if (!names) throw new EmptyDataException();
		if (!hasNamesCache) {
			cachedNames = names;
		}
		const promises = names.map((name) => {
			return this.getCharacter(name);
		});
		const characters = await Promise.all(promises);
		if (!characters) throw new EmptyDataException();
		return this.paginate.execute(characters, params);
	}

	async getCharacter(
		name: GetCharacterByNameInputDTO
	): Promise<GetCharacterByNameOutputDTO> {
		if (!name || (name && name.length > 60)) throw new InvalidParamsException();
		const formattedName = NameEntity.create(name).value;
		const cachedCharacter = cachedCharacters[formattedName.toLowerCase()];
		const hasCachedCharacter =
			!!cachedCharacter && !isEmptyObject(cachedCharacter);
		if (hasCachedCharacter) return cachedCharacter;
		const characterFromDB = await this.repository.getByName(formattedName);
		if (characterFromDB) {
			if (!hasCachedCharacter) {
				cachedCharacters = {
					...cachedCharacters,
					[formattedName.toLowerCase()]: characterFromDB,
				};
			}
			return characterFromDB;
		}
		const endpoint = createEndpointURL(this.baseUrl, formattedName);
		const scrapedCharacter = await this.scrapers.character.execute(endpoint);
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
		if (!createdCharacter) throw new UnexpectedException();
		characterEntity.setId(createdCharacter.id);
		const characterWithID = { ...character, id: characterEntity.id };
		if (!hasCachedCharacter) {
			cachedCharacters = {
				...cachedCharacters,
				[formattedName.toLowerCase()]: characterWithID,
			};
		}
		return characterWithID;
	}
}
