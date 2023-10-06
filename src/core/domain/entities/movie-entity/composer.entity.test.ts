export class ComposerEntity {
	private constructor(private readonly composer: string[]) {}
	public static create(composer: string[]) {
		if (ComposerEntity.validate(composer)) return;
		return new ComposerEntity(ComposerEntity.format(composer));
	}
	get value() {
		return this.composer;
	}
	private static validate(composer: string[]) {
		return !composer;
	}
	private static format(composer: string[]) {
		return composer;
	}
}
