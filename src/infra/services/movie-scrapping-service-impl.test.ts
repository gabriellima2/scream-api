import { movieHtml } from "@/__mocks__/movie-html";
import { MovieScrappingServiceImpl } from "./movie-scrapping-service-impl";

const expectedScrapedData = {
	name: "any_name",
};

const dependencies = {
	httpClient: {
		getHtmlPage: jest.fn().mockResolvedValueOnce(movieHtml.onlyName),
	},
	scrapping: {
		execute: jest.fn().mockReturnValue(expectedScrapedData),
	},
};
const makeSut = () =>
	new MovieScrappingServiceImpl(
		dependencies.httpClient,
		dependencies.scrapping
	);

describe("MovieScrappingServiceImpl", () => {
	describe("Methods", () => {
		describe("Execute", () => {
			describe("Success", () => {
				it("should return data correctly from scraped page", async () => {
					const url = "any_url";
					const sut = makeSut();

					const result = await sut.execute(url);
					const { httpClient, scrapping } = dependencies;

					expect(result).toMatchObject(expectedScrapedData);
					expect(httpClient.getHtmlPage).toHaveBeenCalledWith(url);
					expect(httpClient.getHtmlPage).toHaveBeenCalledTimes(1);
					expect(scrapping.execute).toHaveBeenCalledWith(movieHtml.onlyName);
					expect(scrapping.execute).toHaveBeenCalledTimes(1);
				});
			});
		});
	});
});
