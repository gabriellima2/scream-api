import { removeInvalidChars } from "./remove-invalid-chars";

describe("RemoveInvalidChars function", () => {
	it("should remove line breaks and indentation", () => {
		const returnedValue = removeInvalidChars("			any_value\n");
		expect(returnedValue).toBe("any_value");
	});
});
