import { CharacterScraperAdapterImpl } from "./character-scraper.adapter.impl";

import { createApiUrl } from "@/domain/helpers/functions/create-api-url";
import { characterHtml } from "@/__mocks__/character-html";
import { invalidHtml } from "@/__mocks__/invalid-html";

const makeSut = () => new CharacterScraperAdapterImpl();

describe("CharacterScraperAdapterImpl", () => {
	const NAME = "any_name";
	const IMAGE = "any_src";
	const DESCRIPTION = "any_description";
	const OVERVIEW = { any_title: "any_content" };
	const APPEARANCES = [createApiUrl("movies", "any_movie")];

	describe("Public Methods", () => {
		it("should return correctly with all character data", () => {
			const sut = makeSut();
			const response = sut.execute(characterHtml.all);

			expect(response).toMatchObject({
				name: NAME,
				image: IMAGE,
				description: DESCRIPTION,
				overview: OVERVIEW,
				appearances: APPEARANCES,
			});
		});
		it("should return correctly when character data is not found", () => {
			const sut = makeSut();
			const response = sut.execute(invalidHtml);

			expect(response).toMatchObject({
				name: undefined,
				image: undefined,
				description: undefined,
				overview: undefined,
				appearances: undefined,
			});
		});
	});
	describe("Private Methods", () => {
		describe("GetName", () => {
			it("should return character name", () => {
				const sut = makeSut();
				const response = sut.execute(characterHtml.onlyName);

				expect(response.name).toBe(NAME);
			});
			it("should return undefined if character name is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.name).toBeUndefined();
			});
		});
		describe("GetImage", () => {
			it("should return character image", () => {
				const sut = makeSut();
				const response = sut.execute(characterHtml.onlyImage);

				expect(response.image).toBe(IMAGE);
			});
			it("should return undefined if character image is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.image).toBeUndefined();
			});
		});
		describe("GetDescription", () => {
			it("should return character description", () => {
				const sut = makeSut();
				const response = sut.execute(characterHtml.onlyDescription);

				expect(response.description).toBe(DESCRIPTION);
			});
			it("should return undefined if character description is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.overview).toBeUndefined();
			});
		});
		describe("GetOverview", () => {
			it("should return character overview", () => {
				const sut = makeSut();
				const response = sut.execute(characterHtml.onlyOverview);

				expect(response.overview).toMatchObject(OVERVIEW);
			});
			it("should return undefined if character overview is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.overview).toBeUndefined();
			});
		});
		describe("getAppearances", () => {
			it("should return character appearances", () => {
				const sut = makeSut();
				const response = sut.execute(characterHtml.onlyAppearances);

				expect(response.appearances).toMatchObject(APPEARANCES);
			});
			it("should return undefined if character appearances is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.overview).toBeUndefined();
			});
		});
	});
});
