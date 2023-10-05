export class AppearanceEntity {
	private constructor(private readonly appearences: string[]) {}
	public static create(appearences: string[]) {
		if (!AppearanceEntity.validate(appearences)) return;
		return new AppearanceEntity(AppearanceEntity.format(appearences));
	}
	get value() {
		return this.appearences;
	}
	private static validate(appearences: string[]) {
		return appearences;
	}
	private static format(appearences: string[]) {
		return appearences;
	}
}
