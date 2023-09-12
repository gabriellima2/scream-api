import { createPathname } from "./create-pathname";

const BASE_VALUE = "Any_Value";

describe("DreatePathname function", () => {
	it("should replace blank spaces with underscores", () => {
		const returnedValue = createPathname("any value");
		expect(returnedValue).toBe(BASE_VALUE);
	});
	it("should remove invalid characters", () => {
		const returnedValue = createPathname("  any.value ");
		expect(returnedValue).toBe("Anyvalue");
	});
	it("should capitalize the word", () => {
		const returnedValue = createPathname("any value");
		expect(returnedValue).toBe(BASE_VALUE);
	});
	it("should return the formatted value", () => {
		const returnedValue = createPathname(" any val.ue   ");
		expect(returnedValue).toBe(BASE_VALUE);
	});
});
