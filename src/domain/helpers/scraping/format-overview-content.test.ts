import { formatOverviewContent } from "./format-overview-content";

const BASE_VALUE = "any_value";
const UTIL_VALUE = "Another_value";
const WORDS_TOGETHER = `${BASE_VALUE}${UTIL_VALUE}`;

describe("FormatOverviewContent function", () => {
	it("should remove dollar abbreviation", () => {
		const returnedValue = formatOverviewContent(`${BASE_VALUE} USD`);
		expect(returnedValue).toBe(BASE_VALUE);
	});
	it("should separate words that do not contain space between them", () => {
		const returnedValue = formatOverviewContent(`${WORDS_TOGETHER}`);
		expect(returnedValue).toMatchObject([BASE_VALUE, UTIL_VALUE]);
	});
	it("should format correctly", () => {
		const returnedValue = formatOverviewContent(`${WORDS_TOGETHER} USD`);
		expect(returnedValue).toMatchObject([BASE_VALUE, UTIL_VALUE]);
	});
});
