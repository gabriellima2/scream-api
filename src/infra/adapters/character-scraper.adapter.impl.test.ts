import { CharacterScraperAdapterImpl } from "./character-scraper.adapter.impl";

import { createApiUrl } from "@/domain/helpers/functions/create-api-url";
import { characterHtml } from "@/__mocks__/character-html";
import { invalidHtml } from "@/__mocks__/invalid-html";
import { Character } from "@/domain/entities";

const makeSut = () => new CharacterScraperAdapterImpl();

describe("CharacterScraperAdapterImpl", () => {
	const CHARACTER: Omit<Character, "id"> = {
		name: "any_name",
		image: "any_src",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		appearances: [createApiUrl("movies", "Any_Movie")],
		born: "any_value",
		status: "Unknown",
		personality: ["any_value"],
		portrayed_by: ["any_value"],
	};

	describe("Public Methods", () => {
		it("should return correctly with all character data", () => {
			const sut = makeSut();
			const response = sut.execute(characterHtml.all);

			expect(response).toMatchObject(CHARACTER);
		});
		it("should return correctly when character data is not found", () => {
			const sut = makeSut();
			const response = sut.execute(invalidHtml);

			expect(response).toMatchObject({
				name: undefined,
				image: undefined,
				description: undefined,
				appearances: undefined,
				born: undefined,
				status: undefined,
				personality: undefined,
				portrayed_by: undefined,
			});
		});
	});
	describe("Private Methods", () => {
		describe("GetName", () => {
			it("should return character name", () => {
				const sut = makeSut();
				const response = sut.execute(characterHtml.onlyName);

				expect(response.name).toBe(CHARACTER.name);
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

				expect(response.image).toBe(CHARACTER.image);
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

				expect(response.description).toBe(CHARACTER.description);
			});
			it("should return undefined if character description is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.description).toBeUndefined();
			});
		});
		describe("GetAppearances", () => {
			it("should return character appearances", () => {
				const sut = makeSut();
				const response = sut.execute(characterHtml.onlyAppearances);

				expect(response.appearances).toMatchObject(CHARACTER.appearances);
			});
			it("should return undefined if character appearances is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.appearances).toBeUndefined();
			});
		});
		describe("GetBorn", () => {
			it("should return character born", () => {
				const sut = makeSut();
				const response = sut.execute(characterHtml.onlyBorn);

				expect(response.born).toBe(CHARACTER.born);
			});
			it("should return undefined if character born is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.born).toBeUndefined();
			});
		});
		describe("GetPersonality", () => {
			it("should return character personality", () => {
				const sut = makeSut();
				const response = sut.execute(characterHtml.onlyPersonality);

				expect(response.personality).toMatchObject(CHARACTER.personality);
			});
			it("should return undefined if character appearances is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.personality).toBeUndefined();
			});
		});
		describe("GetStatus", () => {
			it("should return character status", () => {
				const sut = makeSut();
				const response = sut.execute(characterHtml.onlyStatus);

				expect(response.status).toBe(CHARACTER.status);
			});
			it("should return undefined if character status is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.status).toBeUndefined();
			});
		});
		describe("GetPortrayedBy", () => {
			it("should return character portrayed_by", () => {
				const sut = makeSut();
				const response = sut.execute(characterHtml.onlyPortrayedBy);

				expect(response.portrayed_by).toMatchObject(CHARACTER.portrayed_by);
			});
			it("should return undefined if character portrayed_by is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.portrayed_by).toBeUndefined();
			});
		});
	});
});
