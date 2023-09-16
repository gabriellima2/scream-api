import { Test } from "@nestjs/testing";

import { CharacterService } from "./character.service";

import { createPathname } from "@/domain/helpers/functions/create-pathname";
import { MockCharacter, mockCharacter } from "@/__mocks__/mock-character";
import { charactersName } from "@/__mocks__/characters-name";

const BASE_URL = "any_url";
const NAME_PARAM = charactersName[0];
const CHARACTER_WITHOUT_ID = { name: mockCharacter.name };

export const dependencies = {
	repository: {
		findByName: jest.fn(),
		create: jest.fn(),
		getAll: jest.fn(),
		insertMany: jest.fn(),
	},
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
	const { repository, scrapers } = dependencies;
	const characters = [mockCharacter];

	beforeEach(() => {
		jest.resetAllMocks();
	});

	function expectHasCharacter(data: MockCharacter) {
		expect(data).toMatchObject(mockCharacter);
	}
	function expectHasCharacters(data: MockCharacter[], length?: number) {
		expect(data.length).toBe(length ?? 1);
		expect(data[0]).toMatchObject(mockCharacter);
	}

	describe("GetCharacter", () => {
		describe("Success", () => {
			it("should return the character that are saved in the database", async () => {
				repository.findByName.mockReturnValue(mockCharacter);

				const sut = await makeSut();
				const data = await sut.getCharacter(NAME_PARAM);

				expectHasCharacter(data);
				expect(scrapers.character.execute).not.toHaveBeenCalled();
				expect(repository.findByName).toHaveBeenCalledWith(NAME_PARAM);
				expect(repository.findByName).toHaveBeenCalledTimes(1);
				expect(repository.create).not.toHaveBeenCalled();
			});
			it("should return character scraped from received web address", async () => {
				scrapers.character.execute.mockReturnValue(CHARACTER_WITHOUT_ID);
				repository.create.mockReturnValue(mockCharacter);

				const sut = await makeSut();
				const data = await sut.getCharacter(NAME_PARAM);
				const url = `${BASE_URL}/${createPathname(NAME_PARAM)}`;

				expectHasCharacter(data);
				expect(scrapers.character.execute).toHaveBeenCalledWith(url);
				expect(scrapers.character.execute).toHaveBeenCalledTimes(1);
				expect(repository.create).toHaveBeenCalledTimes(1);
				expect(repository.findByName).toHaveBeenCalled();
				expect(repository.create).toHaveBeenCalledWith(CHARACTER_WITHOUT_ID);
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
				scrapers.character.execute.mockReturnValue(undefined);
				try {
					const sut = await makeSut();
					await sut.getCharacter(NAME_PARAM);
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
			it("should throw an error when creating a character in db", async () => {
				repository.create.mockReturnValue(null);
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
		function expectResponseToBeCorrect(response: {
			items: MockCharacter[];
			total: number;
		}) {
			expectHasCharacters(response.items);
			expect(response.total).toBe(response.items.length);
		}
		describe("Success", () => {
			describe("With data in DB", () => {
				beforeEach(() => {
					repository.getAll.mockReturnValue(characters);
				});
				it("should return the characters without pagination that are saved in the database", async () => {
					const sut = await makeSut();
					const response = await sut.getCharacters();

					expectHasCharacters(response.items);
					expect(response.total).toBe(response.items.length);
					expect(repository.getAll).toHaveBeenCalledTimes(1);
				});
				it("should return the characters with pagination that are saved in the database", async () => {
					const page = 1;
					const limit = 2;

					const sut = await makeSut();
					const response = await sut.getCharacters(
						page.toString(),
						limit.toString()
					);

					expectResponseToBeCorrect(response);
					expect(repository.getAll).toHaveBeenCalledTimes(2);
					expect(repository.getAll).toHaveBeenCalledWith({ page, limit });
				});
			});
			describe("Without data in DB", () => {
				beforeEach(() => {
					scrapers.character.execute.mockReturnValue(charactersWithoutID[0]);
					scrapers.names.execute.mockReturnValue(charactersName);
					repository.insertMany.mockReturnValue(characters);
					repository.create.mockReturnValue(mockCharacter);
					repository.getAll.mockReturnValue(undefined);
				});

				const charactersWithoutID = [
					CHARACTER_WITHOUT_ID,
					CHARACTER_WITHOUT_ID,
					CHARACTER_WITHOUT_ID,
				];

				function expectToHandleCharactersCreation() {
					expect(scrapers.character.execute).toHaveBeenCalledWith(
						`${BASE_URL}/${createPathname(charactersName[0])}`
					);
					expect(scrapers.names.execute).toHaveBeenCalledWith(
						`${BASE_URL}/Category:Characters`
					);
					expect(scrapers.names.execute).toHaveBeenCalledTimes(1);
					expect(repository.insertMany).toHaveBeenCalledWith(
						charactersWithoutID
					);
					expect(repository.insertMany).toHaveBeenCalledTimes(1);
				}

				it("should return characters scraped without pagination from the received web address when there is no data in the db", async () => {
					const sut = await makeSut();
					const response = await sut.getCharacters();

					expectResponseToBeCorrect(response);
					expectToHandleCharactersCreation();
				});
				it("should return characters scraped with pagination from the received web address when there is no data in the db", async () => {
					const sut = await makeSut();
					const response = await sut.getCharacters("1", "2");

					expectHasCharacters([response.items[0], response.items[1]], 2);
					expectToHandleCharactersCreation();
				});
			});
		});
		describe("Errors", () => {
			it("should throw an error when name-scraper return is empty", async () => {
				scrapers.names.execute.mockReturnValue(undefined);
				try {
					const sut = await makeSut();
					await sut.getCharacters();
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
			it("should throw an error when insert-many return is empty", async () => {
				scrapers.names.execute.mockReturnValue(undefined);
				repository.insertMany.mockReturnValue(undefined);
				repository.getAll.mockReturnValue(undefined);
				try {
					const sut = await makeSut();
					await sut.getCharacters();
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
			it("should throw an error when get-with-pagination return is empty", async () => {
				repository.getAll.mockReturnValueOnce(characters);
				repository.getAll.mockReturnValueOnce(undefined);
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
