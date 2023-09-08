import { CharactersNameScraperAdapterImpl } from "./characters-name-scraper.adapter.impl";

import { charactersNameHtml } from "@/__mocks__/characters-name-html";
import { invalidHtml } from "@/__mocks__/invalid-html";

const makeSut = () => new CharactersNameScraperAdapterImpl();

describe("CharactersNameScraperAdapterImpl", () => {
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
