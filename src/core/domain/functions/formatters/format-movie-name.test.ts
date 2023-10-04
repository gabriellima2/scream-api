import { formatMovieName } from "./format-movie-name";

describe("FormatMovieName function", () => {
	it("should replace char 'vi' to number 5", () => {
		const returnedValue = formatMovieName("Scream VI");
		expect(returnedValue).toBe("Scream 6");
	});
	it("should add 5 when the current movie sequence is 5", () => {
		formatMovieName("Scream 4");
		const returnedValue = formatMovieName("Scream");
		expect(returnedValue).toBe("Scream 5");
	});
});
