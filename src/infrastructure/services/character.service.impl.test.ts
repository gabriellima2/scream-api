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
		function expectCharacterHasBeenReturned(data: Required<MockCharacter>) {
			expect(data).toMatchObject(mockCharacter);
		}

		describe("Success", () => {
			it("should return the character that are saved in the database", async () => {
				repository.getByName.mockReturnValue(mockCharacter);

				const sut = await makeSut();
				const data = await sut.getCharacter(NAME_PARAM);

				expectCharacterHasBeenReturned(data);
				expect(scrapers.character.execute).not.toHaveBeenCalled();
				expect(scrapers.character.execute).not.toHaveBeenCalled();
				expect(repository.getByName).toHaveBeenCalledWith(NAME_PARAM);
			});
			it("should return character scraped from received web address", async () => {
				scrapers.character.execute.mockReturnValue(CHARACTER_WITHOUT_ID);
				repository.create.mockReturnValue(mockCharacter);

				const name = "Any_Scraper_Name";
				const sut = await makeSut();
				const data = await sut.getCharacter(name);
				const url = `${BASE_URL}/${name}`;

				expectCharacterHasBeenReturned(data);
				expect(scrapers.character.execute).toHaveBeenCalledWith(url);
				expect(scrapers.character.execute).toHaveBeenCalledTimes(1);
				expect(repository.getByName).toHaveBeenCalled();
			});
			it("should return cached character", async () => {
				repository.getByName.mockReturnValueOnce(mockCharacter);

				const name = "any_cache_name";
				const sut = await makeSut();
				await sut.getCharacter(name);
				const cachedCharacter = await sut.getCharacter(name);

				expectCharacterHasBeenReturned(cachedCharacter);
				expect(repository.getByName).toHaveBeenCalledTimes(1);
			});
		});
		describe("Errors", () => {
			const cases = [
				{
					description:
						"should throw an error when character name param are empty",
					param: "",
				},
				{
					description:
						"should throw an error when character name is longer than 60 chars",
					param: "Lorem_ipsum_dolor_sit_amet_consectetur_adipiscing",
				},
				{
					description:
						"should throw an error when character-scraper return is empty",
					param: NAME_PARAM,
					mockValues: () =>
						scrapers.character.execute.mockReturnValue(undefined),
				},
				{
					description: "should throw an error when creating a character in db",
					param: NAME_PARAM,
					mockValues: () => repository.create.mockReturnValue(null),
				},
			];
			test.each(cases)("%s", async ({ param, mockValues }) => {
				mockValues && mockValues();
				try {
					const sut = await makeSut();
					await sut.getCharacter(param);
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
			const cases = [
				{
					description:
						"should throw an error when name-scraper return is empty",
					mockValues: () => scrapers.names.execute.mockReturnValue(undefined),
				},
				{
					description:
						"should throw an error when characters-scraper return is empty",
					mockValues: () =>
						scrapers.character.execute.mockReturnValue(undefined),
				},
			];
			test.each(cases)("%s", async ({ mockValues }) => {
				mockValues && mockValues();
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
