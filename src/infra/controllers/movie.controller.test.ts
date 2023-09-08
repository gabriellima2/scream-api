import { Test } from "@nestjs/testing";

import { MovieController } from "./movie.controller";
import { BaseError } from "@/domain/errors";
import { MovieService } from "../services";

import { type MockMovie, mockMovie } from "@/__mocks__/mock-movie";
import { dependencies } from "../services/movie.service.test";
import { mockError } from "@/__mocks__/mock-error";

import type { Movie } from "@/domain/entities";

const spyGetMovie = jest.spyOn(MovieService.prototype, "getMovie");
const spyGetMovies = jest.spyOn(MovieService.prototype, "getMovies");

const makeSut = async () => {
	const app = await Test.createTestingModule({
		controllers: [MovieController],
		providers: [MovieService],
	})
		.overrideProvider(MovieService)
		.useValue(
			new MovieService(
				dependencies.repository,
				dependencies.scrapers,
				"any_uri"
			)
		)
		.compile();
	return app.get<MovieController>(MovieController);
};

describe("MovieController", () => {
	function expectReturnedDataCorrectly(
		data: Movie | Movie[],
		mock: MockMovie | MockMovie[]
	) {
		expect(data).toMatchObject(mock);
	}
	function expectExceptionsToBeHandledCorrectly(err: Error) {
		expect(err).toBeInstanceOf(Error);
		expect(err.message).toBe(mockError.message);
	}

	describe("GetMovie", () => {
		describe("Success", () => {
			it("should return the data correctly", async () => {
				spyGetMovie.mockResolvedValue(mockMovie as Movie);
				const sut = await makeSut();

				const data = await sut.getMovie(mockMovie.name);

				expectReturnedDataCorrectly(data, mockMovie);
			});
		});
		describe("Fail", () => {
			it("should handle exceptions correctly", async () => {
				spyGetMovie.mockRejectedValue(new BaseError(mockError.message, 500));
				try {
					const sut = await makeSut();
					await sut.getMovie("");
				} catch (err) {
					expectExceptionsToBeHandledCorrectly(err);
				}
			});
		});
	});
	describe("GetMovies", () => {
		describe("Success", () => {
			it("should return the data correctly", async () => {
				const movies = [mockMovie];
				spyGetMovies.mockResolvedValue(movies as Movie[]);
				const sut = await makeSut();

				const data = await sut.getMovies();

				expectReturnedDataCorrectly(data, movies);
			});
		});
		describe("Fail", () => {
			it("should handle exceptions correctly", async () => {
				spyGetMovies.mockRejectedValue(new BaseError(mockError.message, 500));
				try {
					const sut = await makeSut();
					await sut.getMovies();
				} catch (err) {
					expectExceptionsToBeHandledCorrectly(err);
				}
			});
		});
	});
});
