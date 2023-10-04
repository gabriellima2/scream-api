import { removeDollarAbbr } from "./remove-dollar-abbr";

const BASE_VALUE = "any_value";

describe("RemoveDollarAbbr function", () => {
	it("should remove dollar abbr", () => {
		const returnedValue = removeDollarAbbr(`${BASE_VALUE} USD`);
		expect(returnedValue).toBe(`${BASE_VALUE}`);
	});
});
