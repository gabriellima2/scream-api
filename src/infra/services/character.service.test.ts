import { Test } from "@nestjs/testing";

import { CharacterService } from "./character.service";

import { createPathname } from "@/domain/helpers/functions/create-pathname";
import { MockCharacter, mockCharacter } from "@/__mocks__/mock-character";
import { CHARACTER_NAMES } from "@/__mocks__/character-names";

const BASE_URL = "any_url";
const NAME_PARAM = CHARACTER_NAMES[0];
const CHARACTER_WITHOUT_ID = { name: mockCharacter.name };

export const dependencies = {
	repository: { findByName: jest.fn(), create: jest.fn() },
	scrapers: {
		names: { execute: jest.fn() },
		character: { execute: jest.fn() },
	},
};

const makeSut = async () => {
	const app = await Test.createTestingModule({
		providers: [CharacterService],
	})
		.overrideProvider(CharacterService)
		.useValue(
			new CharacterService(
				dependencies.repository,
				dependencies.scrapers,
				BASE_URL
			)
		)
		.compile();
	return app.get<CharacterService>(CharacterService);
};

describe("CharacterService", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	function expectHasCharacter(data: MockCharacter) {
		expect(data).toMatchObject(mockCharacter);
	}
	function expectHasCharacters(data: MockCharacter[]) {
		expect(data.length).toBe(1);
		expect(data[0]).toMatchObject(mockCharacter);
	}
	function expectCharactersHasBeenScraped(BASE_URL: string, quantity: number) {
		expect(dependencies.scrapers.character.execute).toHaveBeenCalledTimes(
			quantity
		);
		expect(dependencies.scrapers.character.execute).toHaveBeenCalledWith(
			BASE_URL
		);
		expect(dependencies.repository.findByName).toHaveBeenCalled();
		expect(dependencies.repository.create).toHaveBeenCalledTimes(quantity);
		expect(dependencies.repository.create).toHaveBeenCalledWith(
			CHARACTER_WITHOUT_ID
		);
	}
	function expectCharactersHasBeenDB(name: string, quantity: number) {
		expect(dependencies.scrapers.character.execute).not.toHaveBeenCalled();
		expect(dependencies.repository.findByName).toHaveBeenCalledTimes(quantity);
		expect(dependencies.repository.findByName).toHaveBeenCalledWith(name);
		expect(dependencies.repository.create).not.toHaveBeenCalled();
	}

	describe("GetCharacter", () => {
		describe("Success", () => {
			it("should return the character that are saved in the database", async () => {
				dependencies.repository.findByName.mockReturnValue(mockCharacter);
				const sut = await makeSut();

				const data = await sut.getCharacter(NAME_PARAM);

				expectHasCharacter(data);
				expectCharactersHasBeenDB(NAME_PARAM, 1);
			});
			it("should return character scraped from received web address", async () => {
				dependencies.scrapers.character.execute.mockReturnValue(
					CHARACTER_WITHOUT_ID
				);
				dependencies.repository.create.mockReturnValue(mockCharacter);
				const sut = await makeSut();

				const data = await sut.getCharacter(NAME_PARAM);
				const url = `${BASE_URL}/${createPathname(NAME_PARAM)}`;

				expectHasCharacter(data);
				expectCharactersHasBeenScraped(url, 1);
			});
		});
		describe("Errors", () => {
			it("should throw an error when character name param are empty", async () => {
				try {
					const sut = await makeSut();
					await sut.getCharacter("");
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
			it("should throw an error when character-scraper return is empty", async () => {
				dependencies.scrapers.character.execute.mockReturnValue(undefined);
				try {
					const sut = await makeSut();
					await sut.getCharacter(NAME_PARAM);
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
			it("should throw an error when creating a character in db", async () => {
				dependencies.repository.create.mockReturnValue(null);
				try {
					const sut = await makeSut();
					await sut.getCharacter(NAME_PARAM);
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
		});
	});
	describe("GetCharacters", () => {
		const CHARACTER_QUANTITY = CHARACTER_NAMES.length;
		describe("Success", () => {
			it("should return the characters that are saved in the database", async () => {
				dependencies.scrapers.names.execute.mockReturnValue(CHARACTER_NAMES);
				dependencies.repository.findByName.mockReturnValue(mockCharacter);
				const sut = await makeSut();

				const data = await sut.getCharacters();

				expectHasCharacters(data);
				expectCharactersHasBeenDB(CHARACTER_NAMES[0], CHARACTER_QUANTITY);
			});
			it("should return characters scraped from received web address", async () => {
				dependencies.scrapers.names.execute.mockReturnValue(CHARACTER_NAMES);
				dependencies.scrapers.character.execute.mockReturnValue(
					CHARACTER_WITHOUT_ID
				);
				dependencies.repository.create.mockReturnValue(mockCharacter);
				const sut = await makeSut();

				const data = await sut.getCharacters();
				const url = `${BASE_URL}/${createPathname(CHARACTER_NAMES[0])}`;

				expectHasCharacters(data);
				expectCharactersHasBeenScraped(url, CHARACTER_QUANTITY);
				expect(dependencies.scrapers.names.execute).toBeCalledTimes(1);
				expect(dependencies.scrapers.names.execute).toBeCalledWith(
					`${url}/Category:Characters`
				);
			});
			it("should remove duplicate characters", async () => {
				dependencies.scrapers.names.execute.mockReturnValue(CHARACTER_NAMES);
				dependencies.repository.findByName.mockReturnValue(mockCharacter);
				const sut = await makeSut();

				const data = await sut.getCharacters();

				expectHasCharacters(data);
				expect(dependencies.scrapers.character.execute).not.toHaveBeenCalled();
				expect(dependencies.repository.findByName).toHaveBeenCalled();
			});
		});
		describe("Errors", () => {
			it("should throw an error when name-scraper return is empty", async () => {
				dependencies.scrapers.names.execute.mockReturnValue(undefined);
				try {
					const sut = await makeSut();
					await sut.getCharacters();
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
		});
	});
});
