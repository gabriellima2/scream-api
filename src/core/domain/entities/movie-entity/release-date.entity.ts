export class ReleaseDateEntity {
	private constructor(private readonly releaseDate: string) {}
	public static create(releaseDate: string) {
		if (ReleaseDateEntity.validate(releaseDate)) return;
		return new ReleaseDateEntity(releaseDate);
	}
	get value() {
		return this.releaseDate;
	}
	private static validate(releaseDate: string) {
		return !releaseDate;
	}
}
