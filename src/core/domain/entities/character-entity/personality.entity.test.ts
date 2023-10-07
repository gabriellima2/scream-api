import { PersonalityEntity } from "./personality.entity";

describe("PersonalityEntity", () => {
	it("should create correctly when passed an valid values", () => {
		const validValues = ["any_value"];
		const personality = PersonalityEntity.create(validValues);

		expect(personality.value).toMatchObject(validValues);
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
			const appearances = PersonalityEntity.create(value);

			expect(appearances).toBeUndefined();
		}
	);
});
