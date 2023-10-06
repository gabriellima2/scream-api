import { BoxOfficeEntity } from "./box-office.entity";

describe("BoxOfficeEntity", () => {
	it("should create correctly when passed an valid value", () => {
		const validValue = "any_value";
		const unformattedValue = `${validValue} USD`;
		const boxOffice = BoxOfficeEntity.create(unformattedValue);

		expect(boxOffice.value).toBe(validValue);
	});

	it("should return undefined when passed a invalid value", () => {
		const boxOffice = BoxOfficeEntity.create("");

		expect(boxOffice).toBeUndefined();
	});
});
