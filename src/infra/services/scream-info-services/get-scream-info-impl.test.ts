import { Test } from "@nestjs/testing";

import { GetScreamInfoImpl } from "./get-scream-info-impl";
import type { GetScreamInfo } from "@/domain/services";

import { dependecies } from "@/__mocks__/service-deps";
import { ScreamData, mockScreamData } from "@/__mocks__/scream-data";

const BASE_URL = "any_url";
const NAME_PARAM = "any_name";

const makeSut = async () => {
	const app = await Test.createTestingModule({
		providers: [GetScreamInfoImpl],
	})
		.overrideProvider(GetScreamInfoImpl)
		.useValue(
			new GetScreamInfoImpl(dependecies.repository, dependecies.scraping)
		)
		.compile();
	return app.get<GetScreamInfo<ScreamData>>(GetScreamInfoImpl);
};

describe("GetScreamInfoImpl", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	describe("Success", () => {
		function expectDataCorrectly(data: ScreamData) {
			expect(data).toMatchObject(mockScreamData);
		}

		it("should return the data that are saved in the database", async () => {
			dependecies.repository.getByName.mockReturnValue(mockScreamData);
			const sut = await makeSut();

			const data = await sut.execute(BASE_URL, NAME_PARAM);

			expectDataCorrectly(data);
			expect(dependecies.scraping.execute).not.toHaveBeenCalled();
			expect(dependecies.repository.getByName).toHaveBeenCalledTimes(1);
			expect(dependecies.repository.getByName).toHaveBeenCalledWith(NAME_PARAM);
			expect(dependecies.repository.insert).not.toHaveBeenCalled();
		});
		it("should return data scraped from received web address", async () => {
			const dataWithoutId = { name: mockScreamData.name };
			dependecies.scraping.execute.mockReturnValue(dataWithoutId);
			dependecies.repository.insert.mockReturnValue(mockScreamData);
			const sut = await makeSut();

			const data = await sut.execute(BASE_URL, NAME_PARAM);
			const url = encodeURIComponent(`${BASE_URL}/${NAME_PARAM}`);

			expectDataCorrectly(data);
			expect(dependecies.scraping.execute).toHaveBeenCalledTimes(1);
			expect(dependecies.scraping.execute).toHaveBeenCalledWith(url);
			expect(dependecies.repository.getByName).toHaveBeenCalled();
			expect(dependecies.repository.insert).toHaveBeenCalledTimes(1);
			expect(dependecies.repository.insert).toHaveBeenCalledWith(dataWithoutId);
		});
	});
	describe("Errors", () => {
		it("should throw an error when name param are empty", async () => {
			try {
				const sut = await makeSut();
				await sut.execute(BASE_URL, "");
			} catch (err) {
				expect(err).toBeInstanceOf(Error);
			}
		});
		it("should throw an error when scraping return is empty", async () => {
			dependecies.scraping.execute.mockReturnValue(undefined);
			try {
				const sut = await makeSut();
				await sut.execute(BASE_URL, NAME_PARAM);
			} catch (err) {
				expect(err).toBeInstanceOf(Error);
			}
		});
	});
});
