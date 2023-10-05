export class NameEntity {
	private constructor(private readonly name: string) {}
	public static create(name: string) {
		if (!NameEntity.validate(name)) return;
		return new NameEntity(NameEntity.format(name));
	}
	get value() {
		return this.name;
	}
	private static validate(name: string) {
		return name;
	}
	private static format(name: string) {
		return name;
	}
}
