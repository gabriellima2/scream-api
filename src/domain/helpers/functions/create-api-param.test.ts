import { createApiParam } from "./create-api-param";

const BASE_VALUE = "Any_Value";

describe("CreateApiParam function", () => {
	it("should replace blank spaces with underscores", () => {
		const returnedValue = createApiParam("any value");
		expect(returnedValue).toBe(BASE_VALUE);
	});
	it("should remove invalid characters", () => {
		const returnedValue = createApiParam("  any.value ");
		expect(returnedValue).toBe("Anyvalue");
	});
	it("should capitalize the word", () => {
		const returnedValue = createApiParam("any value");
		expect(returnedValue).toBe(BASE_VALUE);
	});
	it("should return the formatted value", () => {
		const returnedValue = createApiParam(" any val.ue   ");
		expect(returnedValue).toBe(BASE_VALUE);
	});
});
