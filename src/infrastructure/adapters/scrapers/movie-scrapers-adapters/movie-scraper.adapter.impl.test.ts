import { MovieScraperAdapterImpl } from "./movie-scraper.adapter.impl";

import { MovieData } from "@/core/domain/entities/movie-entity/movie.entity";

import { invalidHtml } from "@/__mocks__/invalid-html";
import { movieHtml } from "@/__mocks__/movie-html";

const makeSut = () => new MovieScraperAdapterImpl();

describe("MovieScraperAdapterImpl", () => {
	const MOVIE: Omit<MovieData, "id"> = {
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

	describe("Public Methods", () => {
		it("should return correctly with all movie data", () => {
			const sut = makeSut();
			const response = sut.execute(movieHtml.all);

			expect(response).toMatchObject(MOVIE);
		});
		it("should return correctly when movie data is not found", () => {
			const sut = makeSut();
			const response = sut.execute(invalidHtml);

			expect(response).toMatchObject({
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
			});
		});
	});
	describe("Private Methods", () => {
		describe("GetName", () => {
			it("should return movie name", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyName);

				expect(response.name).toBe(MOVIE.name);
			});
			it("should return undefined if movie name is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.name).toBe("");
			});
		});
		describe("GetImage", () => {
			it("should return movie image", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyImage);

				expect(response.image).toBe(MOVIE.image);
			});
			it("should return undefined if movie image is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.image).toBe("");
			});
		});
		describe("GetSynopsis", () => {
			it("should return movie synopsis", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlySynopsis);

				expect(response.synopsis).toBe(MOVIE.synopsis);
			});
			it("should return undefined if movie synopsis is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.synopsis).toBe("");
			});
		});
		describe("GetCharacters", () => {
			it("should return movie characters", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyCharacters);

				expect(response.characters).toMatchObject(MOVIE.characters);
			});
			it("should return undefined if movie characters is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.characters).toMatchObject([]);
			});
		});
		describe("GetDirectors", () => {
			it("should return movie directors", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyDirectors);

				expect(response.directors).toMatchObject(MOVIE.directors);
			});
			it("should return undefined if movie directors is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.directors).toMatchObject([]);
			});
		});
		describe("GetWriters", () => {
			it("should return movie writers", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyWriters);

				expect(response.writers).toMatchObject(MOVIE.writers);
			});
			it("should return undefined if movie writers is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.writers).toMatchObject([]);
			});
		});
		describe("GetProducers", () => {
			it("should return movie producers", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyProducers);

				expect(response.producers).toMatchObject(MOVIE.producers);
			});
			it("should return undefined if movie producers is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.producers).toMatchObject([]);
			});
		});

		describe("GetComposer", () => {
			it("should return movie composer", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyComposer);

				expect(response.composer).toMatchObject(MOVIE.composer);
			});
			it("should return undefined if movie composer is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.composer).toMatchObject([]);
			});
		});
		describe("GetRealeaseDate", () => {
			it("should return movie release_date", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyReleaseDate);

				expect(response.release_date).toBe(MOVIE.release_date);
			});
			it("should return undefined if movie release_date is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.release_date).toBe("");
			});
		});
		describe("GetRunningTime", () => {
			it("should return movie running_time", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyRunningTime);

				expect(response.running_time).toBe(MOVIE.running_time);
			});
			it("should return undefined if movie running_time is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.running_time).toBe("");
			});
		});
		describe("GetBoxOffice", () => {
			it("should return movie box_office", () => {
				const sut = makeSut();
				const response = sut.execute(movieHtml.onlyBoxOffice);

				expect(response.box_office).toBe(MOVIE.box_office);
			});
			it("should return undefined if movie box_office is not found", () => {
				const sut = makeSut();
				const response = sut.execute(invalidHtml);

				expect(response.box_office).toBe("");
			});
		});
	});
});
