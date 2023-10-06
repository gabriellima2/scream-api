export class ReleaseDateEntity {
	private constructor(private readonly releaseDate: string) {}
	public static create(releaseDate: string) {
		if (ReleaseDateEntity.validate(releaseDate)) return;
		return new ReleaseDateEntity(ReleaseDateEntity.format(releaseDate));
	}
	get value() {
		return this.releaseDate;
	}
	private static validate(releaseDate: string) {
		return !releaseDate;
	}
	private static format(releaseDate: string) {
		return releaseDate;
	}
}
