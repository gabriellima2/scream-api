import { createApiParam } from "./create-api-param";

const BASE_VALUE = "any_value";

describe("CreateApiParam function", () => {
	it("should replace blank spaces with underscores", () => {
		const returnedValue = createApiParam("any value");
		expect(returnedValue).toBe(BASE_VALUE);
	});
	it("should remove invalid characters", () => {
		const returnedValue = createApiParam("  any.value ");
		expect(returnedValue).toBe("anyvalue");
	});
	it("should change the chars to lower case", () => {
		const returnedValue = createApiParam("ANY_VALUE");
		expect(returnedValue).toBe(BASE_VALUE);
	});
	it("should return the formatted value", () => {
		const returnedValue = createApiParam(" ANY VAL.UE   ");
		expect(returnedValue).toBe(BASE_VALUE);
	});
});
