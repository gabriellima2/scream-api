import { Test } from "@nestjs/testing";

import { MovieServiceImpl } from "./movie.service.impl";

import { expectExceptionsToBeHandled } from "@/__mocks__/expect-exceptions-to-be-handled";
import { MockMovie, mockMovie } from "@/__mocks__/mock-movie";

export const dependencies = {
	repository: { getByName: jest.fn(), create: jest.fn(), getAll: jest.fn() },
	scrapers: { names: { execute: jest.fn() }, movie: { execute: jest.fn() } },
	options: {
		baseUrl: "any_url",
		cache: {
			get: jest.fn(),
			insert: jest.fn(),
			remove: jest.fn(),
			clear: jest.fn(),
		},
	},
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
				dependencies.options
			)
		)
		.compile();
	return app.get<MovieServiceImpl>(MovieServiceImpl);
};

describe("MovieServiceImpl", () => {
	const NAME_PARAM = "Any_Name";
	const MOVIE_NAMES = ["AnyName", "Another_Name"];
	const MOVIE_WITHOUT_ID = { name: mockMovie.name } as MockMovie;
	const {
		repository,
		scrapers,
		options: { baseUrl, cache },
	} = dependencies;

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
		function expectMovieHasBeenReturned(data: Required<MockMovie>) {
			expect(data).toMatchObject(mockMovie);
		}

		describe("Success", () => {
			it("should return the movie that are saved in the database", async () => {
				repository.getByName.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovie(NAME_PARAM);

				expectMovieHasBeenReturned(data);
				expectMoviesHasBeenDB("Any Name", 1);
			});
			it("should return movie scraped from received web address", async () => {
				scrapers.movie.execute.mockReturnValue(MOVIE_WITHOUT_ID);
				repository.create.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovie(NAME_PARAM);
				const url = `${baseUrl}/${NAME_PARAM}`;

				expectMovieHasBeenReturned({
					...data,
					name: data.name.replace(" ", "_"),
				});
				expectMoviesHasBeenScraped(url, 1);
			});
			it("should return cached movie", async () => {
				cache.get.mockReturnValue(mockMovie);

				const name = "any_cache_name";
				const sut = await makeSut();
				const data = await sut.getMovie(name);

				expectMovieHasBeenReturned(data);
				expect(cache.get).toHaveBeenCalledWith(name);
				expect(repository.getByName).not.toHaveBeenCalled();
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
						"should throw an error when movie name is longer than 10 chars",
					param: "Lorem_ipsum_dolor",
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
		describe("Success", () => {
			const items = [mockMovie];
			it("should return movies correctly when not has data in db", async () => {
				repository.getAll.mockReturnValue(items);
				const sut = await makeSut();

				const data = await sut.getMovies();

				expect(data).toBeTruthy();
				expect(repository.getAll).toHaveBeenCalledTimes(1);
			});
			it("should return movies correctly when has data in db", async () => {
				scrapers.names.execute.mockReturnValue(MOVIE_NAMES);
				scrapers.movie.execute.mockReturnValue(MOVIE_WITHOUT_ID);
				repository.create.mockReturnValue(mockMovie);

				const sut = await makeSut();
				const data = await sut.getMovies();
				const url = `${baseUrl}/${MOVIE_NAMES[0]}`;

				expect(data).toBeTruthy();
				expectMoviesHasBeenScraped(url, MOVIE_NAMES.length);
				expect(scrapers.names.execute).toHaveBeenCalled();
			});
			it("should remove duplicate movies", async () => {
				scrapers.names.execute.mockReturnValue(MOVIE_NAMES);
				repository.getByName.mockReturnValue(mockMovie);
				const sut = await makeSut();

				const data = await sut.getMovies();

				expect(data).toBeTruthy();
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
