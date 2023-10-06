import { DirectorsEntity } from "./directors.entity";

describe("DirectorsEntity", () => {
	it("should create correctly when passed an valid values", () => {
		const validValues = ["any_value"];
		const directors = DirectorsEntity.create(validValues);

		expect(directors.value).toMatchObject(validValues);
	});

	const cases = [
		{
			value: ["Any", undefined],
		},
		{ value: undefined },
	];
	test.each(cases)(
		"should return undefined when passed a invalid value",
		async ({ value }) => {
			const directors = DirectorsEntity.create(value);

			expect(directors).toBeUndefined();
		}
	);
});
