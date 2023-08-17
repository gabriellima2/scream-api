import { Test } from "@nestjs/testing";

import { GetMoviesServiceImpl } from "./get-movies-service-impl";
import type { GetMoviesService } from "@/domain/services";
import type { Movie } from "@/domain/entities";

const BASE_URL = "any_url";
const MOVIE_NAMES = ["any_name"];

const movie = { id: 1, name: "any_name" };
const dependecies = {
	repository: { findByName: jest.fn(), insert: jest.fn() },
	scraping: { execute: jest.fn() },
};

const makeSut = async () => {
	const app = await Test.createTestingModule({
		providers: [GetMoviesServiceImpl],
	})
		.overrideProvider(GetMoviesServiceImpl)
		.useValue(
			new GetMoviesServiceImpl(dependecies.repository, dependecies.scraping)
		)
		.compile();
	return app.get<GetMoviesService>(GetMoviesServiceImpl);
};

describe("GetMoviesServiceImpl", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	describe("Success", () => {
		function expectMoviesCorrectly(movies: Movie[]) {
			expect(movies.length).toBe(1);
			expect(movies[0]).toMatchObject(movie);
		}

		it("should return the movies that are saved in the database", async () => {
			dependecies.repository.findByName.mockReturnValue(movie);
			const sut = await makeSut();

			const movies = await sut.execute(BASE_URL, MOVIE_NAMES);

			expectMoviesCorrectly(movies);
			expect(dependecies.scraping.execute).not.toHaveBeenCalled();
			expect(dependecies.repository.findByName).toHaveBeenCalledTimes(1);
			expect(dependecies.repository.findByName).toHaveBeenCalledWith(
				MOVIE_NAMES[0]
			);
			expect(dependecies.repository.insert).not.toHaveBeenCalled();
		});
		it("should return movies scraped from received web address", async () => {
			const movieWithoutId = { name: movie.name };
			dependecies.scraping.execute.mockReturnValue(movieWithoutId);
			dependecies.repository.insert.mockReturnValue(movie);
			const sut = await makeSut();

			const movies = await sut.execute(BASE_URL, MOVIE_NAMES);
			const endpoint = `${BASE_URL}/${MOVIE_NAMES[0]}`;

			expectMoviesCorrectly(movies);
			expect(dependecies.scraping.execute).toHaveBeenCalledTimes(1);
			expect(dependecies.scraping.execute).toHaveBeenCalledWith(endpoint);
			expect(dependecies.repository.findByName).toHaveBeenCalled();
			expect(dependecies.repository.insert).toHaveBeenCalledTimes(1);
			expect(dependecies.repository.insert).toHaveBeenCalledWith(
				movieWithoutId
			);
		});
		it("should remove duplicate movies", async () => {
			dependecies.repository.findByName.mockReturnValue(movie);
			const sut = await makeSut();

			const movies = await sut.execute(BASE_URL, [
				MOVIE_NAMES[0],
				MOVIE_NAMES[0],
			]);

			expectMoviesCorrectly(movies);
			expect(dependecies.scraping.execute).not.toHaveBeenCalled();
			expect(dependecies.repository.findByName).toHaveBeenCalled();
		});
	});
});
