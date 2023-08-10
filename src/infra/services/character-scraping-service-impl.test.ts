import { Test } from "@nestjs/testing";

import { CharacterScrapingServiceImpl } from "./character-scraping-service-impl";
import { EmptyDataError } from "@/domain/errors";

import type { CharacterScrapingService } from "@/domain/services";
import type { CharacterScrapingAdapter } from "@/domain/adapters";
import type { HttpClient } from "@/domain/gateways";

import { characterHtml } from "@/__mocks__/character-html";

type Dependencies = {
	httpClient: HttpClient;
	scraper: CharacterScrapingAdapter;
};

const BASE_URL = "any_url";
const EXPECTED_SCRAPED_DATA = {
	name: "any_name",
};

const makeSut = async (dependencies: Dependencies) => {
	const app = await Test.createTestingModule({
		providers: [CharacterScrapingServiceImpl],
	})
		.overrideProvider(CharacterScrapingServiceImpl)
		.useValue(
			new CharacterScrapingServiceImpl(
				dependencies.httpClient,
				dependencies.scraper
			)
		)
		.compile();

	return app.get<CharacterScrapingService>(CharacterScrapingServiceImpl);
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

describe("CharacterScrapingServiceImpl", () => {
	describe("Methods", () => {
		describe("Execute", () => {
			describe("Success", () => {
				it("should return the correct data from the scraped page", async () => {
					const { httpClient, scraper } = MockDependenciesReturnValue({
						httpClient: characterHtml.onlyName,
						scraper: EXPECTED_SCRAPED_DATA,
					});
					const sut = await makeSut({ httpClient, scraper });

					const result = await sut.execute(BASE_URL);

					expect(result).toMatchObject(EXPECTED_SCRAPED_DATA);
					expect(httpClient.getHtmlPage).toHaveBeenCalledWith(BASE_URL);
					expect(httpClient.getHtmlPage).toHaveBeenCalledTimes(1);
					expect(scraper.execute).toHaveBeenCalledWith(characterHtml.onlyName);
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
							httpClient: characterHtml.onlyName,
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
