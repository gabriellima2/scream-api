import { Test } from "@nestjs/testing";

import { MovieService } from "./movie.service";

import { MockMovie, mockMovie } from "@/__mocks__/mock-movie";

const URI = "any_uri";
const NAME_PARAMS = ["any_name"];
const NAME_PARAM = "any_name";
const MOVIE_WITHOUT_ID = { name: mockMovie.name };

export const dependencies = {
	repository: { findByName: jest.fn(), create: jest.fn() },
	scraping: { execute: jest.fn() },
};

const makeSut = async () => {
	const app = await Test.createTestingModule({
		providers: [MovieService],
	})
		.overrideProvider(MovieService)
		.useValue(
			new MovieService(dependencies.repository, dependencies.scraping, URI)
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
	function expectMovieHasBeenScraped(uri: string) {
		expect(dependencies.scraping.execute).toHaveBeenCalledTimes(1);
		expect(dependencies.scraping.execute).toHaveBeenCalledWith(uri);
		expect(dependencies.repository.findByName).toHaveBeenCalled();
		expect(dependencies.repository.create).toHaveBeenCalledTimes(1);
		expect(dependencies.repository.create).toHaveBeenCalledWith(
			MOVIE_WITHOUT_ID
		);
	}
	function expectMovieHasBeenDB(movieName: string) {
		expect(dependencies.scraping.execute).not.toHaveBeenCalled();
		expect(dependencies.repository.findByName).toHaveBeenCalledTimes(1);
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
				expectMovieHasBeenDB(NAME_PARAM);
			});
			it("should return movie scraped from received web address", async () => {
				dependencies.scraping.execute.mockReturnValue(MOVIE_WITHOUT_ID);
				dependencies.repository.create.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovie(NAME_PARAM);
				const uri = `${URI}/${NAME_PARAM}`;

				expectHasMovie(data);
				expectMovieHasBeenScraped(uri);
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
			it("should throw an error when scraping return is empty", async () => {
				dependencies.scraping.execute.mockReturnValue(undefined);
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
		describe("Success", () => {
			it("should return the movies that are saved in the database", async () => {
				dependencies.repository.findByName.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovies(NAME_PARAMS);

				expectHasMovies(data);
				expectMovieHasBeenDB(NAME_PARAMS[0]);
			});
			it("should return movies scraped from received web address", async () => {
				dependencies.scraping.execute.mockReturnValue(MOVIE_WITHOUT_ID);
				dependencies.repository.create.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovies(NAME_PARAMS);
				const uri = `${URI}/${NAME_PARAMS[0]}`;

				expectHasMovies(data);
				expectMovieHasBeenScraped(uri);
			});
			it("should remove duplicate movies", async () => {
				dependencies.repository.findByName.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovies([NAME_PARAMS[0], NAME_PARAMS[0]]);

				expectHasMovies(data);
				expect(dependencies.scraping.execute).not.toHaveBeenCalled();
				expect(dependencies.repository.findByName).toHaveBeenCalled();
			});
		});
		describe("Errors", () => {
			it("should throw an error when movies names are empty", async () => {
				try {
					const sut = await makeSut();
					await sut.getMovies([]);
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
			it("should throw an error when scraping return is empty", async () => {
				dependencies.scraping.execute.mockReturnValue(undefined);
				try {
					const sut = await makeSut();
					await sut.getMovies(NAME_PARAMS);
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
			it("should throw an error when has error when creating a movie in db", async () => {
				dependencies.repository.create.mockReturnValue(null);
				try {
					const sut = await makeSut();
					await sut.getMovies(NAME_PARAMS);
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			});
		});
	});
});
