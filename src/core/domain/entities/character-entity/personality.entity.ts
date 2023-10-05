export class PersonalityEntity {
	private constructor(private readonly personality: string[]) {}
	public static create(personality: string[]) {
		if (!PersonalityEntity.validate(personality)) return;
		return new PersonalityEntity(PersonalityEntity.format(personality));
	}
	get value() {
		return this.personality;
	}
	private static validate(personality: string[]) {
		return personality;
	}
	private static format(personality: string[]) {
		return personality;
	}
}
