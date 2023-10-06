import { ProducersEntity } from "./producers.entity";

describe("ProducersEntity", () => {
	it("should create correctly when passed an valid values", () => {
		const validValues = ["any_value"];
		const producers = ProducersEntity.create(validValues);

		expect(producers.value).toMatchObject(validValues);
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
			const producers = ProducersEntity.create(value);

			expect(producers).toBeUndefined();
		}
	);
});
