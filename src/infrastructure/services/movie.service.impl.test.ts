import { Test } from "@nestjs/testing";

import { MovieServiceImpl } from "./movie.service.impl";

import { expectExceptionsToBeHandled } from "@/__mocks__/expect-exceptions-to-be-handled";
import { MockMovie, mockMovie } from "@/__mocks__/mock-movie";

const BASE_URL = "any_url";
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
	const NAME_PARAM = "Any_Name";
	const MOVIE_NAMES = ["AnyName", "Another_Name"];
	const MOVIE_WITHOUT_ID = { name: mockMovie.name } as MockMovie;
	const { repository, scrapers } = dependencies;

	beforeEach(() => {
		jest.resetAllMocks();
	});

	function expectMoviesHasBeenScraped(BASE_URL: string, quantity: number) {
		expect(scrapers.movie.execute).toHaveBeenCalledTimes(quantity);
		expect(scrapers.movie.execute).toHaveBeenCalledWith(BASE_URL);
		expect(repository.getByName).toHaveBeenCalled();
		expect(repository.create).toHaveBeenCalledTimes(quantity);
	}
	function expectMoviesHasBeenDB(movieName: string, quantity: number) {
		expect(scrapers.movie.execute).not.toHaveBeenCalled();
		expect(repository.getByName).toHaveBeenCalledTimes(quantity);
		expect(repository.getByName).toHaveBeenCalledWith(movieName);
		expect(repository.create).not.toHaveBeenCalled();
	}

	describe("GetMovie", () => {
		function expectHasMovie(data: Required<MockMovie>) {
			expect(data).toMatchObject(mockMovie);
		}

		describe("Success", () => {
			it("should return the movie that are saved in the database", async () => {
				repository.getByName.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovie(NAME_PARAM);

				expectHasMovie(data);
				expectMoviesHasBeenDB(NAME_PARAM, 1);
			});
			it("should return movie scraped from received web address", async () => {
				scrapers.movie.execute.mockReturnValue(MOVIE_WITHOUT_ID);
				repository.create.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovie(NAME_PARAM);
				const url = `${BASE_URL}/${NAME_PARAM}`;

				expectHasMovie(data);
				expectMoviesHasBeenScraped(url, 1);
			});
		});
		describe("Errors", () => {
			const cases = [
				{
					description: "should throw an error when movie name param are empty",
					param: "",
				},
				{
					description:
						"should throw an error when movie-scraper return is empty",
					param: NAME_PARAM,
					mockValues: () => scrapers.movie.execute.mockReturnValue(undefined),
				},
				{
					description:
						"should throw an error when has error when creating a movie in db",
					param: NAME_PARAM,
					mockValues: () => repository.create.mockReturnValue(null),
				},
			];
			test.each(cases)("%s", async ({ param, mockValues }) => {
				mockValues && mockValues();
				try {
					const sut = await makeSut();
					await sut.getMovie(param);
				} catch (err) {
					expectExceptionsToBeHandled(err);
				}
			});
		});
	});
	describe("GetMovies", () => {
		function expectHasMovies(data: Required<MockMovie>[]) {
			expect(data.length).toBe(1);
			expect(data[0]).toMatchObject(mockMovie);
		}

		const MOVIES_QUANTITY = MOVIE_NAMES.length;

		describe("Success", () => {
			it("should return the movies that are saved in the database", async () => {
				const movies = [mockMovie];
				repository.getAll.mockReturnValue(movies);
				const sut = await makeSut();

				const data = await sut.getMovies();

				expect(data).toMatchObject(movies);
				expect(repository.getAll).toHaveBeenCalledTimes(1);
			});
			it("should return movies scraped from received web address", async () => {
				scrapers.names.execute.mockReturnValue(MOVIE_NAMES);
				scrapers.movie.execute.mockReturnValue(MOVIE_WITHOUT_ID);
				repository.create.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovies();
				const url = `${BASE_URL}/${MOVIE_NAMES[0]}`;

				expectHasMovies(data);
				expectMoviesHasBeenScraped(url, MOVIES_QUANTITY);
				expect(scrapers.names.execute).toBeCalledTimes(1);
				expect(scrapers.names.execute).toBeCalledWith(
					`${BASE_URL}/Category:Film`
				);
			});
			it("should remove duplicate movies", async () => {
				scrapers.names.execute.mockReturnValue(MOVIE_NAMES);
				repository.getByName.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovies();

				expectHasMovies(data);
				expect(scrapers.movie.execute).not.toHaveBeenCalled();
				expect(repository.getByName).toHaveBeenCalled();
			});
		});
		describe("Errors", () => {
			it("should throw an error when name-scraper return is empty", async () => {
				scrapers.names.execute.mockReturnValue(undefined);
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
