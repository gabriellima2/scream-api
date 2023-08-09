import { Test } from "@nestjs/testing";

import { MovieScrapingServiceImpl } from "./movie-scraping-service-impl";
import { EmptyDataError } from "@/domain/errors";

import type { MovieScrapingService } from "@/domain/services";
import type { MovieScrapingAdapter } from "@/domain/adapters";
import type { HttpClient } from "@/domain/gateways";

import { movieHtml } from "@/__mocks__/movie-html";

type Dependencies = { httpClient: HttpClient; scraper: MovieScrapingAdapter };

const BASE_URL = "any_url";
const EXPECTED_SCRAPED_DATA = {
	name: "any_name",
};

const makeSut = async (dependencies: Dependencies) => {
	const app = await Test.createTestingModule({
		providers: [MovieScrapingServiceImpl],
	})
		.overrideProvider(MovieScrapingServiceImpl)
		.useValue(
			new MovieScrapingServiceImpl(
				dependencies.httpClient,
				dependencies.scraper
			)
		)
		.compile();

	return app.get<MovieScrapingService>(MovieScrapingServiceImpl);
};

const MockDependenciesReturnValue = (
	values: Record<keyof Dependencies, unknown>
) => {
	return {
		httpClient: {
			getHtmlPage: jest.fn().mockResolvedValueOnce(values.httpClient),
		},
		scraper: {
			execute: jest.fn().mockReturnValue(values.scraper),
		},
	};
};

describe("MovieScrapingServiceImpl", () => {
	describe("Methods", () => {
		describe("Execute", () => {
			describe("Success", () => {
				it("should return data correctly from scraped page", async () => {
					const { httpClient, scraper } = MockDependenciesReturnValue({
						httpClient: movieHtml.onlyName,
						scraper: EXPECTED_SCRAPED_DATA,
					});
					const sut = await makeSut({ httpClient, scraper });

					const result = await sut.execute(BASE_URL);

					expect(result).toMatchObject(EXPECTED_SCRAPED_DATA);
					expect(httpClient.getHtmlPage).toHaveBeenCalledWith(BASE_URL);
					expect(httpClient.getHtmlPage).toHaveBeenCalledTimes(1);
					expect(scraper.execute).toHaveBeenCalledWith(movieHtml.onlyName);
					expect(scraper.execute).toHaveBeenCalledTimes(1);
				});
			});
			describe("Errors", () => {
				it("should throw an error when getHtmlPage return invalid value", async () => {
					try {
						const { httpClient, scraper } = MockDependenciesReturnValue({
							httpClient: undefined,
							scraper: EXPECTED_SCRAPED_DATA,
						});
						const sut = await makeSut({ httpClient, scraper });

						await sut.execute(BASE_URL);
					} catch (err) {
						expect(err).toBeInstanceOf(Error);
					}
				});
				it("should throw an error when scraper return invalid value", async () => {
					try {
						const { httpClient, scraper } = MockDependenciesReturnValue({
							httpClient: movieHtml.onlyName,
							scraper: { name: undefined },
						});
						const sut = await makeSut({ httpClient, scraper });

						await sut.execute(BASE_URL);
					} catch (err) {
						expect(err).toBeInstanceOf(EmptyDataError);
					}
				});
			});
		});
	});
});
