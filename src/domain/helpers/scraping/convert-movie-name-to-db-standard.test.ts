import { convertMovieNameToDbStandard } from "./convert-movie-name-to-db-standard";

describe("ConvertMovieNameToDbStandard function", () => {
	it("should format correctly", () => {
		const returnedValue = convertMovieNameToDbStandard([], "Any Value");
		expect(returnedValue).toBe("Any_Value");
	});
	it("should replace char 'vi' to number 5", () => {
		const returnedValue = convertMovieNameToDbStandard([], "Scream VI");
		expect(returnedValue).toBe("Scream_6");
	});
	it("should add 5 when the current movie sequence is 5", () => {
		const returnedValue = convertMovieNameToDbStandard(["Scream_4"], "Scream");
		expect(returnedValue).toBe("Scream_5");
	});
});
