import { Test } from "@nestjs/testing";

import { MovieControllerImpl } from "./movie.controller.impl";
import { MovieServiceImpl } from "../services/movie.service.impl";

import { BaseException } from "@/core/domain/exceptions/base.exception";
import { MovieData } from "@/core/domain/entities/movie-entity/movie.entity";

import { dependencies } from "../services/movie.service.impl.test";

import { expectExceptionsToBeHandled } from "@/__mocks__/expect-exceptions-to-be-handled";
import { type MockMovie, mockMovie } from "@/__mocks__/mock-movie";
import { mockError } from "@/__mocks__/mock-error";

const spyGetMovie = jest.spyOn(MovieServiceImpl.prototype, "getMovie");
const spyGetMovies = jest.spyOn(MovieServiceImpl.prototype, "getMovies");

const makeSut = async () => {
	const app = await Test.createTestingModule({
		controllers: [MovieControllerImpl],
		providers: [MovieServiceImpl],
	})
		.overrideProvider(MovieServiceImpl)
		.useValue(
			new MovieServiceImpl(
				dependencies.repository,
				dependencies.scrapers,
				dependencies.options
			)
		)
		.compile();
	return app.get<MovieControllerImpl>(MovieControllerImpl);
};

describe("MovieControllerImpl", () => {
	function expectReturnedDataCorrectly(
		data: MovieData | MovieData[],
		mock: MockMovie | MockMovie[]
	) {
		expect(data).toMatchObject(mock);
	}

	describe("GetMovie", () => {
		describe("Success", () => {
			it("should return the data correctly", async () => {
				spyGetMovie.mockResolvedValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovie(mockMovie.name);

				expectReturnedDataCorrectly(data, mockMovie);
			});
		});
		describe("Fail", () => {
			it("should handle exceptions correctly", async () => {
				spyGetMovie.mockRejectedValue(
					new BaseException(mockError.message, 500)
				);
				try {
					const sut = await makeSut();
					await sut.getMovie("");
				} catch (err) {
					expectExceptionsToBeHandled(err);
				}
			});
		});
	});
	describe("GetMovies", () => {
		describe("Success", () => {
			it("should return the data correctly", async () => {
				const movies = [mockMovie];
				spyGetMovies.mockResolvedValue(movies);
				const sut = await makeSut();

				const data = await sut.getMovies();

				expectReturnedDataCorrectly(data, movies);
			});
		});
		describe("Fail", () => {
			it("should handle exceptions correctly", async () => {
				spyGetMovies.mockRejectedValue(
					new BaseException(mockError.message, 500)
				);
				try {
					const sut = await makeSut();
					await sut.getMovies();
				} catch (err) {
					expectExceptionsToBeHandled(err);
				}
			});
		});
	});
});
