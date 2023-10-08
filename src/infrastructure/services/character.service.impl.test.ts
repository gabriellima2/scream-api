import { Test } from "@nestjs/testing";

import { CharacterServiceImpl } from "./character.service.impl";

import { expectExceptionsToBeHandled } from "@/__mocks__/expect-exceptions-to-be-handled";
import { mockCharacter, MockCharacter } from "@/__mocks__/mock-character";

const BASE_URL = "any_url";
export const dependencies = {
	repository: {
		getByName: jest.fn(),
		create: jest.fn(),
		getAll: jest.fn(),
	},
	scrapers: {
		names: { execute: jest.fn() },
		character: { execute: jest.fn() },
	},
	paginate: {
		execute: jest.fn(),
	},
};

const makeSut = async () => {
	const app = await Test.createTestingModule({
		providers: [CharacterServiceImpl],
	})
		.overrideProvider(CharacterServiceImpl)
		.useValue(
			new CharacterServiceImpl(
				dependencies.repository,
				dependencies.scrapers,
				dependencies.paginate,
				BASE_URL
			)
		)
		.compile();
	return app.get<CharacterServiceImpl>(CharacterServiceImpl);
};

describe("CharacterServiceImpl", () => {
	const NAME_PARAM = "Any_Name";
	const CHARACTERS_NAME = ["Any_Name", "Another_Name"];
	const CHARACTER_WITHOUT_ID = { name: mockCharacter.name } as MockCharacter;
	const { repository, scrapers, paginate } = dependencies;

	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe("GetCharacter", () => {
		function expectHasCharacter(data: Required<MockCharacter>) {
			expect(data).toMatchObject(mockCharacter);
		}

		describe("Success", () => {
			it("should return the character that are saved in the database", async () => {
				repository.getByName.mockReturnValue(mockCharacter);

				const sut = await makeSut();
				const data = await sut.getCharacter(NAME_PARAM);

				expectHasCharacter(data);
				expect(scrapers.character.execute).not.toHaveBeenCalled();
				expect(repository.getByName).toHaveBeenCalledWith(NAME_PARAM);
				expect(repository.getByName).toHaveBeenCalledTimes(1);
				expect(repository.create).not.toHaveBeenCalled();
			});
			it("should return character scraped from received web address", async () => {
				scrapers.character.execute.mockReturnValue(CHARACTER_WITHOUT_ID);
				repository.create.mockReturnValue(mockCharacter);

				const sut = await makeSut();
				const data = await sut.getCharacter(NAME_PARAM);
				const url = `${BASE_URL}/${NAME_PARAM}`;

				expectHasCharacter(data);
				expect(scrapers.character.execute).toHaveBeenCalledWith(url);
				expect(scrapers.character.execute).toHaveBeenCalledTimes(1);
				expect(repository.create).toHaveBeenCalledTimes(1);
				expect(repository.getByName).toHaveBeenCalled();
			});
		});
		describe("Errors", () => {
			it("should throw an error when character name param are empty", async () => {
				try {
					const sut = await makeSut();
					await sut.getCharacter("");
				} catch (err) {
					expectExceptionsToBeHandled(err);
				}
			});
			it("should throw an error when character-scraper return is empty", async () => {
				scrapers.character.execute.mockReturnValue(undefined);
				try {
					const sut = await makeSut();
					await sut.getCharacter(NAME_PARAM);
				} catch (err) {
					expectExceptionsToBeHandled(err);
				}
			});
			it("should throw an error when creating a character in db", async () => {
				repository.create.mockReturnValue(null);
				try {
					const sut = await makeSut();
					await sut.getCharacter(NAME_PARAM);
				} catch (err) {
					expectExceptionsToBeHandled(err);
				}
			});
		});
	});
	describe("GetCharacters", () => {
		const mockScrapedCharacters = [
			CHARACTER_WITHOUT_ID,
			CHARACTER_WITHOUT_ID,
			CHARACTER_WITHOUT_ID,
		];

		describe("Success", () => {
			it("should return characters correctly", async () => {
				scrapers.names.execute.mockReturnValue(CHARACTERS_NAME);
				scrapers.character.execute.mockReturnValue(mockScrapedCharacters);
				repository.create.mockReturnValue(mockCharacter);
				paginate.execute.mockReturnValue({
					items: [mockCharacter, mockCharacter, mockCharacter],
				});

				const sut = await makeSut();
				const response = await sut.getCharacters();

				expect(response.items).toBeTruthy();
			});
		});
		describe("Errors", () => {
			it("should throw an error when name-scraper return is empty", async () => {
				scrapers.names.execute.mockReturnValue(undefined);
				try {
					const sut = await makeSut();
					await sut.getCharacters();
				} catch (err) {
					expectExceptionsToBeHandled(err);
				}
			});
			it("should throw an error when characters-scraper return is empty", async () => {
				scrapers.character.execute.mockReturnValue(undefined);
				try {
					const sut = await makeSut();
					await sut.getCharacters();
				} catch (err) {
					expectExceptionsToBeHandled(err);
				}
			});
		});
	});
});
