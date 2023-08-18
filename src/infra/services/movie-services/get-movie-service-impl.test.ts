import { Test } from "@nestjs/testing";

import { GetMovieServiceImpl } from "./get-movie-service-impl";
import type { GetMovieService } from "@/domain/services";
import type { Movie } from "@/domain/entities";

import { dependecies } from "@/__mocks__/service-deps";

const BASE_URL = "any_url";
const MOVIE_NAME = "any_name";

const mockMovie = { id: 1, name: "any_name" };

const makeSut = async () => {
	const app = await Test.createTestingModule({
		providers: [GetMovieServiceImpl],
	})
		.overrideProvider(GetMovieServiceImpl)
		.useValue(
			new GetMovieServiceImpl(dependecies.repository, dependecies.scraping)
		)
		.compile();
	return app.get<GetMovieService>(GetMovieServiceImpl);
};

describe("GetMovieServiceImpl", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	describe("Success", () => {
		function expectMovieCorrectly(data: Movie) {
			expect(data).toMatchObject(mockMovie);
		}

		it("should return the movie that are saved in the database", async () => {
			dependecies.repository.getByName.mockReturnValue(mockMovie);
			const sut = await makeSut();

			const movie = await sut.execute(BASE_URL, MOVIE_NAME);

			expectMovieCorrectly(movie);
			expect(dependecies.scraping.execute).not.toHaveBeenCalled();
			expect(dependecies.repository.getByName).toHaveBeenCalledTimes(1);
			expect(dependecies.repository.getByName).toHaveBeenCalledWith(MOVIE_NAME);
			expect(dependecies.repository.insert).not.toHaveBeenCalled();
		});
		it("should return movie scraped from received web address", async () => {
			const movieWithoutId = { name: mockMovie.name };
			dependecies.scraping.execute.mockReturnValue(movieWithoutId);
			dependecies.repository.insert.mockReturnValue(mockMovie);
			const sut = await makeSut();

			const movie = await sut.execute(BASE_URL, MOVIE_NAME);
			const url = encodeURIComponent(`${BASE_URL}/${MOVIE_NAME}`);

			expectMovieCorrectly(movie);
			expect(dependecies.scraping.execute).toHaveBeenCalledTimes(1);
			expect(dependecies.scraping.execute).toHaveBeenCalledWith(url);
			expect(dependecies.repository.getByName).toHaveBeenCalled();
			expect(dependecies.repository.insert).toHaveBeenCalledTimes(1);
			expect(dependecies.repository.insert).toHaveBeenCalledWith(
				movieWithoutId
			);
		});
	});
	describe("Errors", () => {
		it("should throw an error when movie name param are empty", async () => {
			try {
				const sut = await makeSut();
				await sut.execute(BASE_URL, "");
			} catch (err) {
				expect(err).toBeInstanceOf(Error);
			}
		});
		it("should throw an error when scraping return is empty", async () => {
			dependecies.scraping.execute.mockReturnValue(undefined);
			try {
				const sut = await makeSut();
				await sut.execute(BASE_URL, MOVIE_NAME);
			} catch (err) {
				expect(err).toBeInstanceOf(Error);
			}
		});
	});
});
