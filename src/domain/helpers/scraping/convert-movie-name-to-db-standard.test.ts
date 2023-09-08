import { convertMovieNameToDbStandard } from "./convert-movie-name-to-db-standard";

describe("ConvertMovieNameToDbStandard function", () => {
	it("should format correctly", () => {
		const returnedValue = convertMovieNameToDbStandard([], "Any Value");
		expect(returnedValue).toBe("any_value");
	});
	it("should replace char 'vi' to number 5", () => {
		const returnedValue = convertMovieNameToDbStandard([], "Scream VI");
		expect(returnedValue).toBe("scream_6");
	});
	it("should add 5 when the current movie sequence is 5", () => {
		const returnedValue = convertMovieNameToDbStandard(["scream_4"], "Scream");
		expect(returnedValue).toBe("scream_5");
	});
});
