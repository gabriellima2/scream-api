import { formatSynopsis } from "./format-synopsis";

const BASE_VALUE = "any_value";

describe("FormatSynopsis function", () => {
	it("should remove line breaks", () => {
		const returnedValue = formatSynopsis(`${BASE_VALUE}\n`);
		expect(returnedValue).toBe(`${BASE_VALUE}`);
	});
});
