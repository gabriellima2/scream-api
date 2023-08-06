import { MovieScrappingAdapterImpl } from "./movie-scrapping-adapter-impl";

import { createApiUrl } from "../helpers/create-api-url";
import { invalidHtml } from "@/__mocks__/invalid-html";
import { movieHtml } from "@/__mocks__/movie-html";

const makeSut = () => new MovieScrappingAdapterImpl();

describe("MovieScrappingAdapterImpl", () => {
	describe("Private Methods", () => {
		describe("GetName", () => {
			it("should return movie name", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyName);

				expect(response.name).toBe("any_name");
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

				expect(response.image).toBe("any_src");
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

				expect(response.synopsis).toBe("any_synopsis");
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
				const character = createApiUrl("characters", "any_character");
				const response = sut.execute(movieHtml.onlyCharacters);

				expect(response.characters).toMatchObject([character]);
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

				expect(response.overview).toMatchObject({ any_title: "any_content" });
			});
			it("should return undefined if movie overview is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.overview).toBeUndefined();
			});
		});
	});
});
