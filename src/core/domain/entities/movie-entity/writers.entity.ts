export class WritersEntity {
	private constructor(private readonly writers: string[]) {}
	public static create(writers: string[]) {
		if (WritersEntity.validate(writers)) return;
		return new WritersEntity(writers);
	}
	get value() {
		return this.writers;
	}
	private static validate(writers: string[]) {
		return !writers || writers.some((value) => !value);
	}
}
