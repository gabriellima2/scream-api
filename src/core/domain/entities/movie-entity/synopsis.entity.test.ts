import { SynopsisEntity } from "./synopsis.entity";

describe("SynopsisEntity", () => {
	it("should create correctly when passed an valid values", () => {
		const validValue = "any_value";
		const synopsis = SynopsisEntity.create(`${validValue}\n`);

		expect(synopsis.value).toBe(validValue);
	});

	it("should return undefined when passed a invalid value", () => {
		const synopsis = SynopsisEntity.create("");

		expect(synopsis).toBeUndefined();
	});
});
