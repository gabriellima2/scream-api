import { isEmptyArray } from "../../functions/is-empty-array";

export class ComposerEntity {
	private constructor(private readonly composer: string[]) {}
	public static create(composer: string[]) {
		if (ComposerEntity.validate(composer)) return;
		return new ComposerEntity(composer);
	}
	get value() {
		return this.composer;
	}
	private static validate(composer: string[]) {
		return (
			!composer || isEmptyArray(composer) || composer.some((value) => !value)
		);
	}
}
