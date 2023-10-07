import { isEmptyArray } from "../../functions/is-empty-array";

export class PersonalityEntity {
	private constructor(private readonly personality: string[]) {}
	public static create(personality: string[]) {
		if (PersonalityEntity.validate(personality)) return;
		return new PersonalityEntity(personality);
	}
	get value() {
		return this.personality;
	}
	private static validate(personality: string[]) {
		return (
			!personality ||
			isEmptyArray(personality) ||
			personality.some((value) => !value)
		);
	}
}
