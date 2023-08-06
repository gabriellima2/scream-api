import { formatMovieName } from "./format-movie-name";

describe("FormatMovieName function", () => {
	it("should remove line breaks and indentation", () => {
		const returnedValue = formatMovieName("			any_value\n");
		expect(returnedValue).toBe("any_value");
	});
});
