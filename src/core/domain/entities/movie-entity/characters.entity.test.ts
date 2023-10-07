import { CharactersEntity } from "./characters.entity";
import { API_URL } from "../../constants/api-url";

describe("CharactersEntity", () => {
	it("should create correctly when passed an valid values", () => {
		const validValues = [`${API_URL}/characters/Any_Value`];
		const unformattedValues = [" any val.ue   "];
		const characters = CharactersEntity.create(unformattedValues);

		expect(characters.value).toMatchObject(validValues);
	});

	const cases = [
		{
			value: ["Any", undefined],
		},
		{ value: undefined },
		{ value: [] },
	];
	test.each(cases)(
		"should return undefined when passed a invalid value",
		async ({ value }) => {
			const writers = CharactersEntity.create(value);

			expect(writers).toBeUndefined();
		}
	);
});
