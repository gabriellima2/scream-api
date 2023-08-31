import { Test } from "@nestjs/testing";

import { MovieController } from "./movie.controller";
import { BaseError } from "@/domain/errors";
import { MovieService } from "../services";

import { dependencies } from "../services/movie.service.test";
import { mockError } from "@/__mocks__/mock-error";
import { mockMovie } from "@/__mocks__/mock-movie";

import type { Movie } from "@/domain/entities";

const spyGetMovie = jest.spyOn(MovieService.prototype, "getMovie");
// const spyGetMovies = jest.spyOn(MovieService.prototype, "getMovies");

const makeSut = async () => {
	const app = await Test.createTestingModule({
		controllers: [MovieController],
		providers: [MovieService],
	})
		.overrideProvider(MovieService)
		.useValue(
			new MovieService(
				dependencies.repository,
				dependencies.scraping,
				"any_uri"
			)
		)
		.compile();
	return app.get<MovieController>(MovieController);
};

describe("Movie Controller", () => {
	describe("GetMovie", () => {
		describe("Success", () => {
			it("should return the data correctly", async () => {
				spyGetMovie.mockResolvedValue(mockMovie as Movie);
				const sut = await makeSut();

				const data = await sut.getMovie(mockMovie.name);

				expect(data).toMatchObject(mockMovie);
			});
		});
		describe("Fail", () => {
			it("should handle exceptions correctly", async () => {
				spyGetMovie.mockRejectedValue(new BaseError(mockError.message, 500));
				try {
					const sut = await makeSut();
					await sut.getMovie("");
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
					expect(err.message).toBe(mockError.message);
				}
			});
		});
	});
});
