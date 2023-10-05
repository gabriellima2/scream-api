export class BornEntity {
	private constructor(private readonly born: string) {}
	public static create(born: string) {
		if (!BornEntity.validate(born)) return;
		return new BornEntity(BornEntity.format(born));
	}
	get value() {
		return this.born;
	}
	private static validate(born: string) {
		return born;
	}
	private static format(born: string) {
		return born;
	}
}
