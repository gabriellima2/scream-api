import { MovieScraperAdapterImpl } from "./movie-scraper.adapter.impl";

import { MovieData } from "@/core/domain/entities/movie-entity/movie.entity";

import { invalidHtml } from "@/__mocks__/html/invalid-html";
import { movieHtml } from "@/__mocks__/html/movie-html";

const makeSut = () => new MovieScraperAdapterImpl();

describe("MovieScraperAdapterImpl", () => {
	const VALID_MOVIE: Omit<MovieData, "id"> = {
		name: "any_name",
		image: "any_src",
		synopsis: "any_synopsis",
		box_office: "any_value",
		composer: ["any_value"],
		directors: ["any_value"],
		producers: ["any_value"],
		writers: ["any_value"],
		release_date: "any_value",
		running_time: "any_value",
		characters: ["any_character"],
	};
	const MOVIE_WITH_EMPTY_ATTRS: Omit<MovieData, "id"> = {
		name: "",
		image: "",
		synopsis: "",
		box_office: "",
		composer: [],
		directors: [],
		producers: [],
		writers: [],
		release_date: "",
		running_time: "",
		characters: [],
	};

	describe("Execute method", () => {
		const cases = [
			{
				description: "should return correctly with all movie data",
				html: movieHtml.all,
				expected: VALID_MOVIE,
			},
			{
				description: "should return correctly when movie data is not found",
				html: invalidHtml,
				expected: MOVIE_WITH_EMPTY_ATTRS,
			},
		];
		test.each(cases)("%s", ({ html, expected }) => {
			const sut = makeSut();
			const response = sut.execute(html);

			expect(response).toMatchObject(expected);
		});
	});
	describe("Scraper methods", () => {
		const cases = [
			{
				name: "name",
				options: [
					{ html: movieHtml.onlyName, expected: VALID_MOVIE.name },
					{ html: invalidHtml, expected: "" },
				],
			},
			{
				name: "image",
				options: [
					{ html: movieHtml.onlyImage, expected: VALID_MOVIE.image },
					{ html: invalidHtml, expected: "" },
				],
			},
			{
				name: "synopsis",
				options: [
					{ html: movieHtml.onlySynopsis, expected: VALID_MOVIE.synopsis },
					{ html: invalidHtml, expected: "" },
				],
			},
			{
				name: "characters",
				options: [
					{ html: movieHtml.onlyCharacters, expected: VALID_MOVIE.characters },
					{ html: invalidHtml, expected: [] },
				],
			},
			{
				name: "directors",
				options: [
					{ html: movieHtml.onlyDirectors, expected: VALID_MOVIE.directors },
					{ html: invalidHtml, expected: [] },
				],
			},
			{
				name: "writers",
				options: [
					{ html: movieHtml.onlyWriters, expected: VALID_MOVIE.writers },
					{ html: invalidHtml, expected: [] },
				],
			},
			{
				name: "producers",
				options: [
					{ html: movieHtml.onlyProducers, expected: VALID_MOVIE.producers },
					{ html: invalidHtml, expected: [] },
				],
			},
			{
				name: "composer",
				options: [
					{ html: movieHtml.onlyComposer, expected: VALID_MOVIE.composer },
					{ html: invalidHtml, expected: [] },
				],
			},
			{
				name: "release_date",
				options: [
					{
						html: movieHtml.onlyReleaseDate,
						expected: VALID_MOVIE.release_date,
					},
					{ html: invalidHtml, expected: "" },
				],
			},
			{
				name: "running_time",
				options: [
					{
						html: movieHtml.onlyRunningTime,
						expected: VALID_MOVIE.running_time,
					},
					{ html: invalidHtml, expected: "" },
				],
			},
			{
				name: "box_office",
				options: [
					{ html: movieHtml.onlyBoxOffice, expected: VALID_MOVIE.box_office },
					{ html: invalidHtml, expected: "" },
				],
			},
		];
		test.each(cases)("should return correct %s", ({ name, options }) => {
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
