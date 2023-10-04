import { Injectable } from "@nestjs/common";

import {
	GetCharacterProtocols,
	GetCharactersProtocols,
} from "@/domain/protocols";
import { EmptyDataError, InvalidParamsError } from "@/domain/errors";
import { CharacterScrapersAdapter } from "@/domain/adapters";
import { CharacterRepository } from "@/domain/repositories";
import {
	CreateCharacterInputDTO,
	InsertManyCharactersInputDTO,
} from "@/domain/dtos";

import { createPathname } from "@/domain/helpers/functions/create-pathname";

@Injectable()
export class CharacterService {
	constructor(
		private readonly repository: CharacterRepository,
		private readonly scrapers: CharacterScrapersAdapter,
		private readonly baseUrl: string
	) {}

	async getCharacters(
		page?: string,
		limit?: string
	): GetCharactersProtocols.Response {
		const charactersFromDB = await this.repository.getAll();
		if (!charactersFromDB) {
			const namesUrl = `${this.baseUrl}/Category:Characters`;
			const names = await this.scrapers.names.execute(namesUrl);
			if (!names) throw new EmptyDataError();
			const promises = names.map(async (name) => {
				const characterUrl = `${this.baseUrl}/${createPathname(name)}`;
				return await this.scrapers.character.execute(characterUrl);
			});
			const characters = await Promise.all(promises);
			const insertedCharacters = await this.repository.insertMany(
				characters as InsertManyCharactersInputDTO
			);
			if (!insertedCharacters) throw new EmptyDataError();
			const insertedCharactersTotal = insertedCharacters.length;
			if (!limit) {
				return {
					items: insertedCharacters,
					total: insertedCharactersTotal,
					currentPage: 1,
					totalPages: 1,
				};
			}
			const slicedCharacters = insertedCharacters.slice(0, Number(limit));
			return {
				items: slicedCharacters,
				total: slicedCharacters.length,
				currentPage: 1,
				totalPages: 1,
			};
		}
		if (!page)
			return {
				items: charactersFromDB,
				total: charactersFromDB.length,
				currentPage: 1,
				totalPages: 1,
			};
		const pagedCharacters = await this.repository.getAll(
			page && {
				page: Number(page),
				limit: Number(limit),
			}
		);
		if (!pagedCharacters) throw new EmptyDataError();
		return {
			items: pagedCharacters,
			total: pagedCharacters.length,
			currentPage: Number(page),
			totalPages: Math.ceil(pagedCharacters.length / Number(limit)),
		};
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
