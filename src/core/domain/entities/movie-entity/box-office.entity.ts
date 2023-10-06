export class BoxOfficeEntity {
	private constructor(private readonly boxOffice: string) {}
	public static create(boxOffice: string) {
		if (BoxOfficeEntity.validate(boxOffice)) return;
		return new BoxOfficeEntity(BoxOfficeEntity.format(boxOffice));
	}
	get value() {
		return this.boxOffice;
	}
	private static validate(boxOffice: string) {
		return !boxOffice;
	}
	private static format(boxOffice: string) {
		return boxOffice.replace("USD", "").trim();
	}
}
