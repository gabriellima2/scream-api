import { RunningTimeEntity } from "./running-time.entity";

describe("RunningTimeEntity", () => {
	it("should create correctly when passed an valid values", () => {
		const validValue = "any_value";
		const time = RunningTimeEntity.create(validValue);

		expect(time.value).toBe(validValue);
	});

	it("should return undefined when passed a invalid value", () => {
		const time = RunningTimeEntity.create("");

		expect(time).toBeUndefined();
	});
});
