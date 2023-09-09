import { Test } from "@nestjs/testing";

import { MovieService } from "./movie.service";

import { MockMovie, mockMovie } from "@/__mocks__/mock-movie";
import { MOVIE_NAMES } from "@/__mocks__/movie-names";

const URI = "any_uri";
const NAME_PARAM = MOVIE_NAMES[0];
const MOVIE_WITHOUT_ID = { name: mockMovie.name };

export const dependencies = {
	repository: { findByName: jest.fn(), create: jest.fn() },
	scrapers: { names: { execute: jest.fn() }, movie: { execute: jest.fn() } },
};

const makeSut = async () => {
	const app = await Test.createTestingModule({
		providers: [MovieService],
	})
		.overrideProvider(MovieService)
		.useValue(
			new MovieService(dependencies.repository, dependencies.scrapers, URI)
		)
		.compile();
	return app.get<MovieService>(MovieService);
};

describe("MovieService", () => {
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
	function expectMoviesHasBeenScraped(uri: string, quantity: number) {
		expect(dependencies.scrapers.movie.execute).toHaveBeenCalledTimes(quantity);
		expect(dependencies.scrapers.movie.execute).toHaveBeenCalledWith(uri);
		expect(dependencies.repository.findByName).toHaveBeenCalled();
		expect(dependencies.repository.create).toHaveBeenCalledTimes(quantity);
		expect(dependencies.repository.create).toHaveBeenCalledWith(
			MOVIE_WITHOUT_ID
		);
	}
	function expectMoviesHasBeenDB(movieName: string, quantity: number) {
		expect(dependencies.scrapers.movie.execute).not.toHaveBeenCalled();
		expect(dependencies.repository.findByName).toHaveBeenCalledTimes(quantity);
		expect(dependencies.repository.findByName).toHaveBeenCalledWith(movieName);
		expect(dependencies.repository.create).not.toHaveBeenCalled();
	}

	describe("GetMovie", () => {
		describe("Success", () => {
			it("should return the movie that are saved in the database", async () => {
				dependencies.repository.findByName.mockReturnValue(mockMovie);
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
				const uri = `${URI}/${NAME_PARAM}`;

				expectHasMovie(data);
				expectMoviesHasBeenScraped(uri, 1);
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
				dependencies.scrapers.names.execute.mockReturnValue(MOVIE_NAMES);
				dependencies.repository.findByName.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovies();

				expectHasMovies(data);
				expectMoviesHasBeenDB(MOVIE_NAMES[0], MOVIES_QUANTITY);
			});
			it("should return movies scraped from received web address", async () => {
				dependencies.scrapers.names.execute.mockReturnValue(MOVIE_NAMES);
				dependencies.scrapers.movie.execute.mockReturnValue(MOVIE_WITHOUT_ID);
				dependencies.repository.create.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovies();
				const uri = `${URI}/${MOVIE_NAMES[0]}`;

				expectHasMovies(data);
				expectMoviesHasBeenScraped(uri, MOVIES_QUANTITY);
				expect(dependencies.scrapers.names.execute).toBeCalledTimes(1);
				expect(dependencies.scrapers.names.execute).toBeCalledWith(
					`${URI}/Category:Film`
				);
			});
			it("should remove duplicate movies", async () => {
				dependencies.scrapers.names.execute.mockReturnValue(MOVIE_NAMES);
				dependencies.repository.findByName.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovies();

				expectHasMovies(data);
				expect(dependencies.scrapers.movie.execute).not.toHaveBeenCalled();
				expect(dependencies.repository.findByName).toHaveBeenCalled();
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
