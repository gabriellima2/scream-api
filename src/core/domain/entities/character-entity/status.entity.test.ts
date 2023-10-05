import { CharacterStatus, StatusEntity } from "./status.entity";

describe("StatusEntity", () => {
	it("should format the status when passed an unformatted value", () => {
		const validValue = "Alive";
		const unformattedValue = "alive/unnecessary_info";
		const status = StatusEntity.create(unformattedValue as CharacterStatus);

		expect(status.value).toBe(validValue);
	});
	it("should return without changes when the value is already formatted", () => {
		const validValue = "Alive";
		const status = StatusEntity.create(validValue);

		expect(status.value).toBe(validValue);
	});
	it("should return unknown when passed an invalid value", () => {
		const status = StatusEntity.create(undefined);

		expect(status.value).toBe("Unknown");
	});
});
