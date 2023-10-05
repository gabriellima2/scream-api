import { AppearancesEntity } from "./appearences.entity";
import { API_URL } from "../../constants/api-url";

describe("AppearancesEntity", () => {
	it("should format the appearances when passed a valid value", () => {
		const validValues = [`${API_URL}/movies/Any_Value`];
		const unformattedValues = [" any val.ue   "];
		const appearances = AppearancesEntity.create(unformattedValues);

		expect(appearances.value).toMatchObject(validValues);
	});
	it("should return undefined when passed a invalid value", () => {
		const appearances = AppearancesEntity.create(undefined);

		expect(appearances).toBeUndefined();
	});
	it("should return undefined when passed a empty array value", () => {
		const appearances = AppearancesEntity.create([]);

		expect(appearances).toBeUndefined();
	});
});
