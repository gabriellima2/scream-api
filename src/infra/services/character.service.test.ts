import { Test } from "@nestjs/testing";

import { CharacterService } from "./character.service";

import { MockCharacter, mockCharacter } from "@/__mocks__/mock-character";
import { CHARACTER_NAMES } from "@/domain/constants/character-names";

const URI = "any_uri";
const NAME_PARAM = CHARACTER_NAMES[0];
const CHARACTER_WITHOUT_ID = { name: mockCharacter.name };

export const dependencies = {
	repository: { findByName: jest.fn(), create: jest.fn() },
	scraping: { execute: jest.fn() },
};

const makeSut = async () => {
	const app = await Test.createTestingModule({
		providers: [CharacterService],
	})
		.overrideProvider(CharacterService)
		.useValue(
			new CharacterService(dependencies.repository, dependencies.scraping, URI)
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
	function expectCharactersHasBeenScraped(uri: string, quantity: number) {
		expect(dependencies.scraping.execute).toHaveBeenCalledTimes(quantity);
		expect(dependencies.scraping.execute).toHaveBeenCalledWith(uri);
		expect(dependencies.repository.findByName).toHaveBeenCalled();
		expect(dependencies.repository.create).toHaveBeenCalledTimes(quantity);
		expect(dependencies.repository.create).toHaveBeenCalledWith(
			CHARACTER_WITHOUT_ID
		);
	}
	function expectCharactersHasBeenDB(characterName: string, quantity: number) {
		expect(dependencies.scraping.execute).not.toHaveBeenCalled();
		expect(dependencies.repository.findByName).toHaveBeenCalledTimes(quantity);
		expect(dependencies.repository.findByName).toHaveBeenCalledWith(
			characterName.toLowerCase()
		);
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
				dependencies.scraping.execute.mockReturnValue(CHARACTER_WITHOUT_ID);
				dependencies.repository.create.mockReturnValue(mockCharacter);
				const sut = await makeSut();

				const data = await sut.getCharacter(NAME_PARAM);
				const uri = `${URI}/${NAME_PARAM}`;

				expectHasCharacter(data);
				expectCharactersHasBeenScraped(uri, 1);
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
			it("should throw an error when scraping return is empty", async () => {
				dependencies.scraping.execute.mockReturnValue(undefined);
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
				dependencies.repository.findByName.mockReturnValue(mockCharacter);
				const sut = await makeSut();

				const data = await sut.getCharacters();

				expectHasCharacters(data);
				expectCharactersHasBeenDB(CHARACTER_NAMES[0], CHARACTER_QUANTITY);
			});
			it("should return characters scraped from received web address", async () => {
				dependencies.scraping.execute.mockReturnValue(CHARACTER_WITHOUT_ID);
				dependencies.repository.create.mockReturnValue(mockCharacter);
				const sut = await makeSut();

				const data = await sut.getCharacters();
				const uri = `${URI}/${CHARACTER_NAMES[0]}`;

				expectHasCharacters(data);
				expectCharactersHasBeenScraped(uri, CHARACTER_QUANTITY);
			});
			it("should remove duplicate characters", async () => {
				dependencies.repository.findByName.mockReturnValue(mockCharacter);
				const sut = await makeSut();

				const data = await sut.getCharacters();

				expectHasCharacters(data);
				expect(dependencies.scraping.execute).not.toHaveBeenCalled();
				expect(dependencies.repository.findByName).toHaveBeenCalled();
			});
		});
	});
});
