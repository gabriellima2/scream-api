import { formatOverviewTitle } from "./format-overview-title";

const BASE_RETURN_VALUE = "any_value";
const BASE_RETURN_VALUE_IN_PLURAL = "any_values";

describe("FormatOverviewTitle function", () => {
	it("should replace blank spaces with underscores", () => {
		const returnedValue = formatOverviewTitle("any value");
		expect(returnedValue).toBe(BASE_RETURN_VALUE);
	});
	it("should remove the parentheses by changing them to 's'", () => {
		const returnedValue = formatOverviewTitle("any_value(s)");
		expect(returnedValue).toBe(BASE_RETURN_VALUE_IN_PLURAL);
	});
	it("should change the chars to lower case", () => {
		const returnedValue = formatOverviewTitle("ANY_VALUE");
		expect(returnedValue).toBe(BASE_RETURN_VALUE);
	});
	it("should format correctly", () => {
		const returnedValue = formatOverviewTitle("ANY VALUE(S)");
		expect(returnedValue).toBe(BASE_RETURN_VALUE_IN_PLURAL);
	});
});
