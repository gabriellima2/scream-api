import { WritersEntity } from "./writers.entity";

describe("WritersEntity", () => {
	it("should create correctly when passed an valid values", () => {
		const validValues = ["any_value"];
		const writers = WritersEntity.create(validValues);

		expect(writers.value).toMatchObject(validValues);
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
			const writers = WritersEntity.create(value);

			expect(writers).toBeUndefined();
		}
	);
});
