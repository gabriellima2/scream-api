import { ScraperGatewayAdapterImpl } from "./scraper-gateway.adapter.impl";

import { HttpGatewayAdapter } from "@/adapters/gateways/http-gateway.adapter";
import { BaseScraperAdapter } from "@/adapters/scrapers/base-scraper.adapter";

import { characterHtml } from "@/__mocks__/character-html";

type ExpectedScrapedData = { name: string };
type Dependencies = {
	http: HttpGatewayAdapter;
	scraper: BaseScraperAdapter<ExpectedScrapedData>;
};

const makeSut = (dependencies: Dependencies) => {
	return new ScraperGatewayAdapterImpl(dependencies.http, dependencies.scraper);
};

const mockDependenciesReturnValue = (
	values: Record<keyof Dependencies, unknown>
) => {
	return {
		http: {
			getHtml: jest.fn().mockResolvedValueOnce(values.http),
		},
		scraper: {
			execute: jest.fn().mockReturnValue(values.scraper),
		},
	};
};

describe("ScraperGatewayAdapterImpl", () => {
	const BASE_URL = "any_url";
	const EXPECTED_SCRAPED_DATA: ExpectedScrapedData = {
		name: "any_name",
	};

	describe("Success", () => {
		it("should return the correct data from the scraped page", async () => {
			const { http, scraper } = mockDependenciesReturnValue({
				http: characterHtml.onlyName,
				scraper: EXPECTED_SCRAPED_DATA,
			});
			const sut = makeSut({ http, scraper });

			const result = await sut.execute(BASE_URL);

			expect(result).toMatchObject(EXPECTED_SCRAPED_DATA);
			expect(http.getHtml).toHaveBeenCalledWith(BASE_URL);
			expect(http.getHtml).toHaveBeenCalledTimes(1);
			expect(scraper.execute).toHaveBeenCalledWith(characterHtml.onlyName);
			expect(scraper.execute).toHaveBeenCalledTimes(1);
		});
	});
	describe("Errors", () => {
		const cases = [
			{
				mockedHttpReturnValue: undefined,
				mockedScraperReturnValue: EXPECTED_SCRAPED_DATA,
			},
			{
				mockedHttpReturnValue: characterHtml.onlyName,
				mockedScraperReturnValue: { name: undefined },
			},
		];
		test.each(cases)(
			"should throw an error when scraper return invalid value",
			async ({ mockedHttpReturnValue, mockedScraperReturnValue }) => {
				try {
					const { http, scraper } = mockDependenciesReturnValue({
						http: mockedHttpReturnValue,
						scraper: mockedScraperReturnValue,
					});
					const sut = makeSut({ http, scraper });

					await sut.execute(BASE_URL);
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			}
		);
	});
});
