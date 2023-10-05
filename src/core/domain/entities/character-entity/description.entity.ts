export class DescriptionEntity {
	private constructor(private readonly description: string) {}
	public static create(description: string) {
		if (!DescriptionEntity.validate(description)) return;
		return new DescriptionEntity(DescriptionEntity.format(description));
	}
	get value() {
		return this.description;
	}
	private static validate(description: string) {
		return description;
	}
	private static format(description: string) {
		return description;
	}
}
