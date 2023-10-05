import { NameEntity } from "./name.entity";

describe("NameEntity", () => {
	it("should format the name when passed a valid value", () => {
		const validValue = "any_value";
		const name = NameEntity.create(`  ${validValue}\n`);

		expect(name.value).toBe(validValue);
	});
	it("should return undefined when passed a invalid value", () => {
		const name = NameEntity.create(undefined);

		expect(name).toBeUndefined();
	});
});
