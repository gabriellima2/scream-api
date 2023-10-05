import { PortrayedByEntity } from "./portrayed-by.entity";

describe("PortrayedByEntity", () => {
	const cases = [
		{
			unformatted: "Any_valueAny_value_1",
			result: ["Any_value", "Any_value_1"],
		},
		{ unformatted: "Any_value", result: ["Any_value"] },
	];
	test.each(cases)(
		"should format the portrayed_by when passed an unformatted value",
		async ({ unformatted, result }) => {
			const portrayedBy = PortrayedByEntity.create(unformatted);

			expect(portrayedBy.value).toMatchObject(result);
		}
	);

	it("should return undefined when passed a invalid value", () => {
		const appearances = PortrayedByEntity.create(undefined);

		expect(appearances).toBeUndefined();
	});
});
