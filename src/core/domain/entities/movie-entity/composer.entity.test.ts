import { ComposerEntity } from "./composer.entity";

describe("ComposerEntity", () => {
	it("should create correctly when passed an valid values", () => {
		const validValues = ["any_value"];
		const composer = ComposerEntity.create(validValues);

		expect(composer.value).toMatchObject(validValues);
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
			const composer = ComposerEntity.create(value);

			expect(composer).toBeUndefined();
		}
	);
});
