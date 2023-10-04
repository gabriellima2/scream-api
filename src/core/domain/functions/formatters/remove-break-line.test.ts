import { removeBreakLine } from "./remove-break-line";

const BASE_VALUE = "any_value";

describe("RemoveBreakLine function", () => {
	it("should remove line breaks", () => {
		const returnedValue = removeBreakLine(`${BASE_VALUE}\n`);
		expect(returnedValue).toBe(`${BASE_VALUE}`);
	});
});
