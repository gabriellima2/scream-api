import { DescriptionEntity } from "./description.entity";

describe("DescriptionEntity", () => {
	it("should format the description when passed an valid value", () => {
		const validValue = "any_value";
		const description = DescriptionEntity.create(`  ${validValue}\n`);

		expect(description.value).toBe(validValue);
	});
	it("should return undefined when passed an invalid value", () => {
		const description = DescriptionEntity.create(undefined);

		expect(description).toBeUndefined();
	});
});
