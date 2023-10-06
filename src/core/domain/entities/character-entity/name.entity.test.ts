import { NameEntity } from "./name.entity";

describe("NameEntity", () => {
	describe("Success", () => {
		const cases = [
			{ unformatted: "  any_value\n", result: "any_value" },
			{ unformatted: "any another value", result: "any value" },
		];
		test.each(cases)(
			"should format the name when passed an valid value",
			({ unformatted, result }) => {
				const name = NameEntity.create(unformatted);

				expect(name.value).toBe(result);
			}
		);
	});
	describe("Error", () => {
		const cases = [
			{ unformatted: undefined },
			{ unformatted: "any:any" },
			{ unformatted: "any(any)" },
		];
		test.each(cases)(
			"should return undefined when passed an invalid value",
			({ unformatted }) => {
				const name = NameEntity.create(unformatted);

				expect(name).toBeUndefined();
			}
		);
	});
});
