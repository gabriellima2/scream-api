import { Test } from "@nestjs/testing";

import { MovieServiceImpl } from "./movie.service.impl";

import { MockMovie, mockMovie } from "@/__mocks__/mock-movie";
import { MOVIE_NAMES } from "@/__mocks__/movie-names";

const BASE_URL = "any_url";
const NAME_PARAM = MOVIE_NAMES[0];
const MOVIE_WITHOUT_ID = { name: mockMovie.name };

export const dependencies = {
	repository: { getByName: jest.fn(), create: jest.fn(), getAll: jest.fn() },
	scrapers: { names: { execute: jest.fn() }, movie: { execute: jest.fn() } },
};

const makeSut = async () => {
	const app = await Test.createTestingModule({
		providers: [MovieServiceImpl],
	})
		.overrideProvider(MovieServiceImpl)
		.useValue(
			new MovieServiceImpl(
				dependencies.repository,
				dependencies.scrapers,
				BASE_URL
			)
		)
		.compile();
	return app.get<MovieServiceImpl>(MovieServiceImpl);
};

describe("MovieServiceImpl", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	function expectHasMovie(data: MockMovie) {
		expect(data).toMatchObject(mockMovie);
	}
	function expectHasMovies(data: MockMovie[]) {
		expect(data.length).toBe(1);
		expect(data[0]).toMatchObject(mockMovie);
	}
	function expectMoviesHasBeenScraped(BASE_URL: string, quantity: number) {
		expect(dependencies.scrapers.movie.execute).toHaveBeenCalledTimes(quantity);
		expect(dependencies.scrapers.movie.execute).toHaveBeenCalledWith(BASE_URL);
		expect(dependencies.repository.getByName).toHaveBeenCalled();
		expect(dependencies.repository.create).toHaveBeenCalledTimes(quantity);
		expect(dependencies.repository.create).toHaveBeenCalledWith(
			MOVIE_WITHOUT_ID
		);
	}
	function expectMoviesHasBeenDB(movieName: string, quantity: number) {
		expect(dependencies.scrapers.movie.execute).not.toHaveBeenCalled();
		expect(dependencies.repository.getByName).toHaveBeenCalledTimes(quantity);
		expect(dependencies.repository.getByName).toHaveBeenCalledWith(movieName);
		expect(dependencies.repository.create).not.toHaveBeenCalled();
	}

	describe("GetMovie", () => {
		describe("Success", () => {
			it("should return the movie that are saved in the database", async () => {
				dependencies.repository.getByName.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovie(NAME_PARAM);

				expectHasMovie(data);
				expectMoviesHasBeenDB(NAME_PARAM, 1);
			});
			it("should return movie scraped from received web address", async () => {
				dependencies.scrapers.movie.execute.mockReturnValue(MOVIE_WITHOUT_ID);
				dependencies.repository.create.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovie(NAME_PARAM);
				const url = `${BASE_URL}/${NAME_PARAM}`;

				expectHasMovie(data);
				expectMoviesHasBeenScraped(url, 1);
			});
		});
		describe("Errors", () => {
			it("should throw an error when movie name param are empty", async () => {
				try {
					const sut = await makeSut();
					await sut.getMovie("");
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
			it("should throw an error when movie-scraper return is empty", async () => {
				dependencies.scrapers.movie.execute.mockReturnValue(undefined);
				try {
					const sut = await makeSut();
					await sut.getMovie(NAME_PARAM);
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
			it("should throw an error when has error when creating a movie in db", async () => {
				dependencies.repository.create.mockReturnValue(null);
				try {
					const sut = await makeSut();
					await sut.getMovie(NAME_PARAM);
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
		});
	});
	describe("GetMovies", () => {
		const MOVIES_QUANTITY = MOVIE_NAMES.length;
		describe("Success", () => {
			it("should return the movies that are saved in the database", async () => {
				const movies = [mockMovie];
				dependencies.repository.getAll.mockReturnValue(movies);
				const sut = await makeSut();

				const data = await sut.getMovies();

				expect(data).toMatchObject(movies);
				expect(dependencies.repository.getAll).toHaveBeenCalledTimes(1);
			});
			it("should return movies scraped from received web address", async () => {
				dependencies.scrapers.names.execute.mockReturnValue(MOVIE_NAMES);
				dependencies.scrapers.movie.execute.mockReturnValue(MOVIE_WITHOUT_ID);
				dependencies.repository.create.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovies();
				const url = `${BASE_URL}/${MOVIE_NAMES[0]}`;

				expectHasMovies(data);
				expectMoviesHasBeenScraped(url, MOVIES_QUANTITY);
				expect(dependencies.scrapers.names.execute).toBeCalledTimes(1);
				expect(dependencies.scrapers.names.execute).toBeCalledWith(
					`${BASE_URL}/Category:Film`
				);
			});
			it("should remove duplicate movies", async () => {
				dependencies.scrapers.names.execute.mockReturnValue(MOVIE_NAMES);
				dependencies.repository.getByName.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovies();

				expectHasMovies(data);
				expect(dependencies.scrapers.movie.execute).not.toHaveBeenCalled();
				expect(dependencies.repository.getByName).toHaveBeenCalled();
			});
		});
		describe("Errors", () => {
			it("should throw an error when name-scraper return is empty", async () => {
				dependencies.scrapers.names.execute.mockReturnValue(undefined);
				try {
					const sut = await makeSut();
					await sut.getMovies();
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
		});
	});
});
