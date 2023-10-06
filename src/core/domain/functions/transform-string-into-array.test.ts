import { transformStringIntoArray } from "./transform-string-into-array";

describe("transformStringIntoArray function", () => {
	it("should create list when one value is passed", () => {
		const returnedValue = transformStringIntoArray("Any value");
		expect(returnedValue).toMatchObject(["Any value"]);
	});
	it("should create list when more than one value is passed", () => {
		const returnedValue = transformStringIntoArray("HelloWorld");
		expect(returnedValue).toMatchObject(["Hello", "World"]);
	});
});
