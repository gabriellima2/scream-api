import { formatCharacterName } from "./format-character-name";

const BASE_VALUE = "any_value";

describe("FormatCharacterName function", () => {
	it("should replace blank spaces with underscores", () => {
		const returnedValue = formatCharacterName("any value");
		expect(returnedValue).toBe(BASE_VALUE);
	});
	it("should remove invalid characters", () => {
		const returnedValue = formatCharacterName("  any.value ");
		expect(returnedValue).toBe("anyvalue");
	});
	it("should change the chars to lower case", () => {
		const returnedValue = formatCharacterName("ANY_VALUE");
		expect(returnedValue).toBe(BASE_VALUE);
	});
	it("should return the formatted value", () => {
		const returnedValue = formatCharacterName(" ANY VAL.UE   ");
		expect(returnedValue).toBe(BASE_VALUE);
	});
});
