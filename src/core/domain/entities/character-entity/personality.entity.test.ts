import { PersonalityEntity } from "./personality.entity";

describe("PersonalityEntity", () => {
	const cases = [
		{
			unformatted: "Any_valueAny_value_1",
			result: ["Any_value", "Any_value_1"],
		},
		{ unformatted: "Any_value", result: ["Any_value"] },
	];
	test.each(cases)(
		"should format the personality when passed an unformatted value",
		async ({ unformatted, result }) => {
			const personality = PersonalityEntity.create(unformatted);

			expect(personality.value).toMatchObject(result);
		}
	);

	it("should return undefined when passed a invalid value", () => {
		const appearances = PersonalityEntity.create(undefined);

		expect(appearances).toBeUndefined();
	});
});
