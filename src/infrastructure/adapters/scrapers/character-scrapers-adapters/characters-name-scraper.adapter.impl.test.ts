import { CharactersNameScraperAdapterImpl } from "./characters-name-scraper.adapter.impl";

import { charactersNameHtml } from "@/__mocks__/html/characters-name-html";
import { invalidHtml } from "@/__mocks__/html/invalid-html";

const makeSut = () => new CharactersNameScraperAdapterImpl();

describe("CharacterNamesScraperAdapterImpl", () => {
	it("should return correctly with characters name", () => {
		const sut = makeSut();
		const response = sut.execute(charactersNameHtml);

		expect(response).toMatchObject(["Any_Name"]);
	});
	it("should return correctly when characters name is not found", () => {
		const sut = makeSut();
		const response = sut.execute(invalidHtml);

		expect(response).toBeUndefined();
	});
});
