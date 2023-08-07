import { movieHtml } from "@/__mocks__/movie-html";
import { MovieScrapingServiceImpl } from "./movie-scraping-service-impl";

const expectedScrapedData = {
	name: "any_name",
};

const dependencies = {
	httpClient: {
		getHtmlPage: jest.fn().mockResolvedValueOnce(movieHtml.onlyName),
	},
	scraper: {
		execute: jest.fn().mockReturnValue(expectedScrapedData),
	},
};
const makeSut = () =>
	new MovieScrapingServiceImpl(dependencies.httpClient, dependencies.scraper);

describe("MovieScrapingServiceImpl", () => {
	describe("Methods", () => {
		describe("Execute", () => {
			describe("Success", () => {
				it("should return data correctly from scraped page", async () => {
					const url = "any_url";
					const sut = makeSut();

					const result = await sut.execute(url);
					const { httpClient, scraper } = dependencies;

					expect(result).toMatchObject(expectedScrapedData);
					expect(httpClient.getHtmlPage).toHaveBeenCalledWith(url);
					expect(httpClient.getHtmlPage).toHaveBeenCalledTimes(1);
					expect(scraper.execute).toHaveBeenCalledWith(movieHtml.onlyName);
					expect(scraper.execute).toHaveBeenCalledTimes(1);
				});
			});
		});
	});
});
