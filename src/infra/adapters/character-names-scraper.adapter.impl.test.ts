import { CharacterNamesScraperAdapterImpl } from "./character-names-scraper.adapter.impl";

import { charactersNameHtml } from "@/__mocks__/characters-name-html";
import { invalidHtml } from "@/__mocks__/invalid-html";

const makeSut = () => new CharacterNamesScraperAdapterImpl();

describe("CharacterNamesScraperAdapterImpl", () => {
	it("should return correctly with characters name", () => {
		const sut = makeSut();
		const response = sut.execute(charactersNameHtml);

		expect(response).toMatchObject(["any_name"]);
	});
	it("should return correctly when characters name is not found", () => {
		const sut = makeSut();
		const response = sut.execute(invalidHtml);

		expect(response).toBeUndefined();
	});
});
