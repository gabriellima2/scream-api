import { AppearancesEntity } from "./appearences.entity";
import { API_URL } from "../../constants/api-url";

describe("AppearancesEntity", () => {
	it("should format the appearances when passed a valid value", () => {
		const validValues = [`${API_URL}/movies/Any_Value`];
		const unformattedValues = [" any val.ue   "];
		const appearances = AppearancesEntity.create(unformattedValues);

		expect(appearances.value).toMatchObject(validValues);
	});
	const cases = [
		{
			value: ["Any", undefined],
		},
		{ value: undefined },
		{ value: [] },
	];
	test.each(cases)(
		"should return undefined when passed a invalid value",
		async ({ value }) => {
			const appearances = AppearancesEntity.create(value);

			expect(appearances).toBeUndefined();
		}
	);
});
