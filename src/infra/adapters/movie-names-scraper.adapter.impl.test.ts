import { MovieNamesScraperAdapterImpl } from "./movie-names-scraper.adapter.impl";

import { moviesNameHtml } from "@/__mocks__/movies-name-html";
import { invalidHtml } from "@/__mocks__/invalid-html";

const makeSut = () => new MovieNamesScraperAdapterImpl();

describe("MovieNamesScraperAdapterImpl", () => {
	it("should return correctly with movies name", () => {
		const sut = makeSut();
		const response = sut.execute(moviesNameHtml);

		expect(response).toMatchObject(["Any_Name"]);
	});
	it("should return correctly when movies name is not found", () => {
		const sut = makeSut();
		const response = sut.execute(invalidHtml);

		expect(response).toBeUndefined();
	});
});
