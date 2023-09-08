import { MoviesNameScraperAdapterImpl } from "./movies-name-scraper.adapter.impl";

import { moviesNameHtml } from "@/__mocks__/movies-name-html";
import { invalidHtml } from "@/__mocks__/invalid-html";

const makeSut = () => new MoviesNameScraperAdapterImpl();

describe("MoviesNameScraperAdapterImpl", () => {
	it("should return correctly with movies name", () => {
		const sut = makeSut();
		const response = sut.execute(moviesNameHtml);

		expect(response).toMatchObject(["any_name"]);
	});
	it("should return correctly when movies name is not found", () => {
		const sut = makeSut();
		const response = sut.execute(invalidHtml);

		expect(response).toBeUndefined();
	});
});
