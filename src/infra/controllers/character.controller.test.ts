import { Test } from "@nestjs/testing";

import { CharacterController } from "./character.controller";
import { CharacterService } from "../services";
import { BaseError } from "@/domain/errors";

import { mockCharacter, type MockCharacter } from "@/__mocks__/mock-character";
import { dependencies } from "../services/character.service.test";
import { mockError } from "@/__mocks__/mock-error";

import type { Character } from "@/domain/entities";

const spyGetCharacter = jest.spyOn(CharacterService.prototype, "getCharacter");
const spyGetCharacters = jest.spyOn(
	CharacterService.prototype,
	"getCharacters"
);

const makeSut = async () => {
	const app = await Test.createTestingModule({
		controllers: [CharacterController],
		providers: [CharacterService],
	})
		.overrideProvider(CharacterService)
		.useValue(
			new CharacterService(
				dependencies.repository,
				dependencies.scraper,
				"any_uri"
			)
		)
		.compile();
	return app.get<CharacterController>(CharacterController);
};

describe("CharacterController", () => {
	function expectReturnedDataCorrectly(
		data: Character | Character[],
		mock: MockCharacter | MockCharacter[]
	) {
		expect(data).toMatchObject(mock);
	}
	function expectExceptionsToBeHandledCorrectly(err: Error) {
		expect(err).toBeInstanceOf(Error);
		expect(err.message).toBe(mockError.message);
	}

	describe("GetCharacter", () => {
		describe("Success", () => {
			it("should return the data correctly", async () => {
				spyGetCharacter.mockResolvedValue(mockCharacter as Character);
				const sut = await makeSut();

				const data = await sut.getCharacter(mockCharacter.name);

				expectReturnedDataCorrectly(data, mockCharacter);
			});
		});
		describe("Fail", () => {
			it("should handle exceptions correctly", async () => {
				spyGetCharacter.mockRejectedValue(
					new BaseError(mockError.message, 500)
				);
				try {
					const sut = await makeSut();
					await sut.getCharacter("");
				} catch (err) {
					expectExceptionsToBeHandledCorrectly(err);
				}
			});
		});
	});
	describe("GetCharacters", () => {
		describe("Success", () => {
			it("should return the data correctly", async () => {
				const characters = [mockCharacter];
				spyGetCharacters.mockResolvedValue(characters as Character[]);
				const sut = await makeSut();

				const data = await sut.getCharacters();

				expectReturnedDataCorrectly(data, characters);
			});
		});
		describe("Fail", () => {
			it("should handle exceptions correctly", async () => {
				spyGetCharacters.mockRejectedValue(
					new BaseError(mockError.message, 500)
				);
				try {
					const sut = await makeSut();
					await sut.getCharacters();
				} catch (err) {
					expectExceptionsToBeHandledCorrectly(err);
				}
			});
		});
	});
});
