export class DirectorsEntity {
	private constructor(private readonly directors: string[]) {}
	public static create(directors: string[]) {
		if (DirectorsEntity.validate(directors)) return;
		return new DirectorsEntity(directors);
	}
	get value() {
		return this.directors;
	}
	private static validate(directors: string[]) {
		return !directors || directors.some((value) => !value);
	}
}
