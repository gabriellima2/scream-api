import { createListFromString } from "./create-list-from-string";

describe("CreateListFromString function", () => {
	it("should create list when one value is passed", () => {
		const returnedValue = createListFromString("Any value");
		expect(returnedValue).toMatchObject(["Any value"]);
	});
	it("should create list when more than one value is passed", () => {
		const returnedValue = createListFromString("HelloWorld");
		expect(returnedValue).toMatchObject(["Hello", "World"]);
	});
});
