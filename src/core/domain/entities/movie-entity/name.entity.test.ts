import { NameEntity } from "./name.entity";

describe("NameEntity function", () => {
	it("should format the name", () => {
		const name = NameEntity.create("scream_2");
		expect(name.value).toBe("Scream 2");
	});
	it("should replace char 'vi' to number 5", () => {
		const name = NameEntity.create("Scream VI");
		expect(name.value).toBe("Scream 6");
	});
	it("should add 5 when the current movie sequence is 5", () => {
		NameEntity.create("Scream 4");
		const name = NameEntity.create("Scream");
		expect(name.value).toBe("Scream 5");
	});
});
