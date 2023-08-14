import { formatObjectKey } from "./format-object-key";

const BASE_VALUE = "any_value";
const BASE_VALUE_IN_PLURAL = "any_values";

describe("FormatObjectKey function", () => {
	it("should replace blank spaces with underscores", () => {
		const returnedValue = formatObjectKey("any value");
		expect(returnedValue).toBe(BASE_VALUE);
	});
	it("should remove the parentheses by changing them to 's'", () => {
		const returnedValue = formatObjectKey("any_value(s)");
		expect(returnedValue).toBe(BASE_VALUE_IN_PLURAL);
	});
	it("should change the chars to lower case", () => {
		const returnedValue = formatObjectKey("ANY_VALUE");
		expect(returnedValue).toBe(BASE_VALUE);
	});
	it("should format correctly", () => {
		const returnedValue = formatObjectKey("ANY VALUE(S)");
		expect(returnedValue).toBe(BASE_VALUE_IN_PLURAL);
	});
});
