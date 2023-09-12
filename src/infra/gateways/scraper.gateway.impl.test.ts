import type { GenericScraperAdapter } from "@/domain/adapters";
import { type HttpClientGateway } from "@/domain/gateways";
import { EmptyDataError } from "@/domain/errors";

import { characterHtml } from "@/__mocks__/character-html";
import { ScraperGatewayImpl } from ".";

type ExpectedScrapedData = { name: string };

type Dependencies = {
	httpClient: HttpClientGateway;
	scraper: GenericScraperAdapter<ExpectedScrapedData>;
};

const BASE_URL = "any_url";
const EXPECTED_SCRAPED_DATA: ExpectedScrapedData = {
	name: "any_name",
};

const makeSut = (dependencies: Dependencies) => {
	return new ScraperGatewayImpl(dependencies.httpClient, dependencies.scraper);
};

const mockDependenciesReturnValue = (
	values: Record<keyof Dependencies, unknown>
) => {
	return {
		httpClient: {
			getHtml: jest.fn().mockResolvedValueOnce(values.httpClient),
		},
		scraper: {
			execute: jest.fn().mockReturnValue(values.scraper),
		},
	};
};

describe("ScraperGatewayImpl", () => {
	describe("Methods", () => {
		describe("Execute", () => {
			describe("Success", () => {
				it("should return the correct data from the scraped page", async () => {
					const { httpClient, scraper } = mockDependenciesReturnValue({
						httpClient: characterHtml.onlyName,
						scraper: EXPECTED_SCRAPED_DATA,
					});
					const sut = makeSut({ httpClient, scraper });

					const result = await sut.execute(BASE_URL);

					expect(result).toMatchObject(EXPECTED_SCRAPED_DATA);
					expect(httpClient.getHtml).toHaveBeenCalledWith(BASE_URL);
					expect(httpClient.getHtml).toHaveBeenCalledTimes(1);
					expect(scraper.execute).toHaveBeenCalledWith(characterHtml.onlyName);
					expect(scraper.execute).toHaveBeenCalledTimes(1);
				});
			});
			describe("Errors", () => {
				it("should throw an error when scraper return invalid value", async () => {
					try {
						const { httpClient, scraper } = mockDependenciesReturnValue({
							httpClient: undefined,
							scraper: EXPECTED_SCRAPED_DATA,
						});
						const sut = makeSut({ httpClient, scraper });

						await sut.execute(BASE_URL);
					} catch (err) {
						expect(err).toBeInstanceOf(Error);
					}
				});
				it("should throw an error when scraper return invalid value", async () => {
					try {
						const { httpClient, scraper } = mockDependenciesReturnValue({
							httpClient: characterHtml.onlyName,
							scraper: { name: undefined },
						});
						const sut = makeSut({ httpClient, scraper });

						await sut.execute(BASE_URL);
					} catch (err) {
						expect(err).toBeInstanceOf(EmptyDataError);
					}
				});
			});
		});
	});
});
