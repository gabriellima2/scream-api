import { MovieScrapingAdapterImpl } from "./movie-scraping-adapter-impl";

import { createApiUrl } from "@/domain/helpers/create-api-url";
import { invalidHtml } from "@/__mocks__/invalid-html";
import { movieHtml } from "@/__mocks__/movie-html";

const makeSut = () => new MovieScrapingAdapterImpl();

describe("MovieScrapingAdapterImpl", () => {
	const NAME = "any_name";
	const IMAGE = "any_src";
	const SYNOPSIS = "any_synopsis";
	const OVERVIEW = { any_title: "any_content" };
	const CHARACTER = createApiUrl("characters", "any_character");

	describe("Public Methods", () => {
		it("should return correctly with all movie data", () => {
			const sut = makeSut();
			const response = sut.execute(movieHtml.all);

			expect(response).toMatchObject({
				name: NAME,
				image: IMAGE,
				synopsis: SYNOPSIS,
				overview: OVERVIEW,
				characters: [CHARACTER],
			});
		});
		it("should return correctly when movie data is not found", () => {
			const sut = makeSut();
			const response = sut.execute(invalidHtml);

			expect(response).toMatchObject({
				name: undefined,
				image: undefined,
				synopsis: undefined,
				overview: undefined,
				characters: undefined,
			});
		});
	});
	describe("Private Methods", () => {
		describe("GetName", () => {
			it("should return movie name", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyName);

				expect(response.name).toBe(NAME);
			});
			it("should return undefined if movie name is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.name).toBeUndefined();
			});
		});
		describe("GetImage", () => {
			it("should return movie image", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyImage);

				expect(response.image).toBe(IMAGE);
			});
			it("should return undefined if movie image is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.image).toBeUndefined();
			});
		});
		describe("GetSynopsis", () => {
			it("should return movie synopsis", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlySynopsis);

				expect(response.synopsis).toBe(SYNOPSIS);
			});
			it("should return undefined if movie synopsis is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.synopsis).toBeUndefined();
			});
		});
		describe("GetCharacters", () => {
			it("should return movie characters", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyCharacters);

				expect(response.characters).toMatchObject([CHARACTER]);
			});
			it("should return undefined if movie characters is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.characters).toBeUndefined();
			});
		});
		describe("GetOverview", () => {
			it("should return movie overview", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyOverview);

				expect(response.overview).toMatchObject(OVERVIEW);
			});
			it("should return undefined if movie overview is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.overview).toBeUndefined();
			});
		});
	});
});
