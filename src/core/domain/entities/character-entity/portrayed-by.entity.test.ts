import { PortrayedByEntity } from "./portrayed-by.entity";

describe("PortrayedByEntity", () => {
	it("should create correctly when passed an valid values", () => {
		const validValues = ["any_value"];
		const portrayedBy = PortrayedByEntity.create(validValues);

		expect(portrayedBy.value).toMatchObject(validValues);
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
			const appearances = PortrayedByEntity.create(value);

			expect(appearances).toBeUndefined();
		}
	);
});
