import { BornEntity } from "./born.entity";

describe("BornEntity", () => {
	it("should return the created value when passed an valid value", () => {
		const validValue = "any_value";
		const born = BornEntity.create(validValue);

		expect(born.value).toBe(validValue);
	});
	it("should return undefined when passed an invalid value", () => {
		const born = BornEntity.create(undefined);

		expect(born).toBeUndefined();
	});
});
