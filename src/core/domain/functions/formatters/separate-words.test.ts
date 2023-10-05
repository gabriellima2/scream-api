import { separateWords } from "./separate-words";

const BASE_VALUE = "Any  Value";

describe("SeparateWords function", () => {
	it("should separate word", () => {
		const returnedValue = separateWords("AnyValue");
		expect(returnedValue).toBe(`${BASE_VALUE}`);
	});
});
