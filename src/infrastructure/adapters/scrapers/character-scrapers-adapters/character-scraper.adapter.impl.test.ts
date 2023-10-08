import { CharacterScraperAdapterImpl } from "./character-scraper.adapter.impl";

import { CharacterData } from "@/core/domain/entities/character-entity/character.entity";

import { characterHtml } from "@/__mocks__/html/character-html";
import { invalidHtml } from "@/__mocks__/html/invalid-html";

const makeSut = () => new CharacterScraperAdapterImpl();

describe("CharacterScraperAdapterImpl", () => {
	const VALID_CHARACTER: Omit<CharacterData, "id"> = {
		name: "any_name",
		image: "any_src",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		appearances: ["Any_Movie"],
		born: "any_value",
		status: "Unknown",
		personality: ["any_value"],
		portrayed_by: ["any_value"],
	};
	const CHARACTER_WITH_EMPTY_ATTRS: Omit<CharacterData, "id"> = {
		name: "",
		image: "",
		description: "",
		appearances: [],
		born: "",
		status: "Unknown",
		personality: [],
		portrayed_by: [],
	};

	describe("Execute method", () => {
		describe("Execute method", () => {
			const cases = [
				{
					description: "should return correctly with all character data",
					html: characterHtml.all,
					expected: VALID_CHARACTER,
				},
				{
					description:
						"should return correctly when character data is not found",
					html: invalidHtml,
					expected: CHARACTER_WITH_EMPTY_ATTRS,
				},
			];
			test.each(cases)("%s", ({ html, expected }) => {
				const sut = makeSut();
				const response = sut.execute(html);

				expect(response).toMatchObject(expected);
			});
		});
	});
	describe("Scraper methods", () => {
		const cases = [
			{
				name: "name",
				options: [
					{ html: characterHtml.onlyName, expected: VALID_CHARACTER.name },
					{ html: invalidHtml, expected: "" },
				],
			},
			{
				name: "image",
				options: [
					{ html: characterHtml.onlyImage, expected: VALID_CHARACTER.image },
					{ html: invalidHtml, expected: "" },
				],
			},
			{
				name: "description",
				options: [
					{
						html: characterHtml.onlyDescription,
						expected: VALID_CHARACTER.description,
					},
					{ html: invalidHtml, expected: "" },
				],
			},
			{
				name: "appearances",
				options: [
					{
						html: characterHtml.onlyAppearances,
						expected: VALID_CHARACTER.appearances,
					},
					{ html: invalidHtml, expected: [] },
				],
			},
			{
				name: "born",
				options: [
					{ html: characterHtml.onlyBorn, expected: VALID_CHARACTER.born },
					{ html: invalidHtml, expected: "" },
				],
			},
			{
				name: "personality",
				options: [
					{
						html: characterHtml.onlyPersonality,
						expected: VALID_CHARACTER.personality,
					},
					{ html: invalidHtml, expected: [] },
				],
			},
			{
				name: "status",
				options: [
					{ html: characterHtml.onlyStatus, expected: VALID_CHARACTER.status },
					{ html: invalidHtml, expected: "Unknown" },
				],
			},
			{
				name: "portrayed_by",
				options: [
					{
						html: characterHtml.onlyPortrayedBy,
						expected: VALID_CHARACTER.portrayed_by,
					},
					{ html: invalidHtml, expected: [] },
				],
			},
		];
		test.each(cases)("should return correctly %s", ({ name, options }) => {
			const sut = makeSut();
			options.forEach((option) => {
				const response = sut.execute(option.html);

				if (typeof option.expected === "object") {
					expect(response[name]).toMatchObject(option.expected);
				} else {
					expect(response[name]).toBe(option.expected);
				}
			});
		});
	});
});
