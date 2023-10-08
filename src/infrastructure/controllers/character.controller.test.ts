import { Test } from "@nestjs/testing";

import { CharacterControllerImpl } from "./character.controller";

import { CharacterServiceImpl } from "../services/character.service.impl";

import { CharacterData } from "@/core/domain/entities/character-entity/character.entity";
import { BaseException } from "@/core/domain/exceptions/base.exception";

import { mockCharacter, type MockCharacter } from "@/__mocks__/mock-character";
import { dependencies } from "../services/character.service.impl.test";
import { mockError } from "@/__mocks__/mock-error";
import { API_URL } from "@/core/domain/constants/api-url";

const spyGetCharacter = jest.spyOn(
	CharacterServiceImpl.prototype,
	"getCharacter"
);
const spyGetCharacters = jest.spyOn(
	CharacterServiceImpl.prototype,
	"getCharacters"
);

const makeSut = async () => {
	const app = await Test.createTestingModule({
		controllers: [CharacterControllerImpl],
		providers: [CharacterServiceImpl],
	})
		.overrideProvider(CharacterServiceImpl)
		.useValue(
			new CharacterServiceImpl(
				dependencies.repository,
				dependencies.scrapers,
				dependencies.paginate,
				"any_url"
			)
		)
		.compile();
	return app.get<CharacterControllerImpl>(CharacterControllerImpl);
};

describe("CharacterControllerImpl", () => {
	function expectReturnedDataCorrectly(
		data: CharacterData | CharacterData[],
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
				spyGetCharacter.mockResolvedValue(mockCharacter);
				const sut = await makeSut();

				const data = await sut.getCharacter(mockCharacter.name);

				expectReturnedDataCorrectly(data, mockCharacter);
			});
		});
		describe("Error", () => {
			it("should handle exceptions correctly", async () => {
				spyGetCharacter.mockRejectedValue(
					new BaseException(mockError.message, 500)
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
		const characters = [mockCharacter, mockCharacter];

		describe("Success", () => {
			const cases = [
				{
					description:
						"should return the data correctly when on the first page",
					items: characters,
					page: 1,
				},
				{
					description:
						"should return the data correctly when on the middle page",
					items: [...characters, ...characters],
					page: 2,
				},
				{
					description: "should return the data correctly when on the last page",
					items: characters,
					page: 2,
				},
			];
			function createPaginationUrl(currentPage: number, total: number) {
				const BASE_URL = `${API_URL}/characters`;
				return {
					next: `${BASE_URL}?page=${currentPage + 1}&limit=${total}`,
					last: `${BASE_URL}?page=${currentPage - 1}&limit=${total}`,
				};
			}
			function createResolvedValue(
				items: Required<CharacterData>[],
				initialPage: number
			) {
				const total = items.length;
				return {
					items,
					total,
					totalPages: total,
					currentPage: initialPage,
				};
			}
			test.each(cases)("%s", async ({ items, page }) => {
				const GET_CHARACTERS_RESOLVED_VALUE = createResolvedValue(items, page);
				spyGetCharacters.mockResolvedValue(GET_CHARACTERS_RESOLVED_VALUE);
				const sut = await makeSut();

				const response = await sut.getCharacters();
				const { currentPage, total, totalPages } =
					GET_CHARACTERS_RESOLVED_VALUE;
				const { next, last } = createPaginationUrl(currentPage, total);

				expectReturnedDataCorrectly(response.items, items);
				expect(response.next).toBe(
					currentPage === totalPages ? undefined : next
				);
				expect(response.last).toBe(page !== 1 ? last : undefined);
			});
		});
		describe("Error", () => {
			it("should handle exceptions correctly", async () => {
				spyGetCharacters.mockRejectedValue(
					new BaseException(mockError.message, 500)
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
