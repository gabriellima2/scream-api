export class DirectorsEntity {
	private constructor(private readonly directors: string[]) {}
	public static create(directors: string[]) {
		if (DirectorsEntity.validate(directors)) return;
		return new DirectorsEntity(DirectorsEntity.format(directors));
	}
	get value() {
		return this.directors;
	}
	private static validate(directors: string[]) {
		return !directors;
	}
	private static format(directors: string[]) {
		return directors;
	}
}
