import { ReleaseDateEntity } from "./release-date.entity";

describe("ReleaseDateEntity", () => {
	it("should create correctly when passed an valid values", () => {
		const validValue = "any_value";
		const date = ReleaseDateEntity.create(validValue);

		expect(date.value).toBe(validValue);
	});

	it("should return undefined when passed a invalid value", () => {
		const date = ReleaseDateEntity.create("");

		expect(date).toBeUndefined();
	});
});
