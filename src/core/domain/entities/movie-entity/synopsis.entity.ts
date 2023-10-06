import { BREAK_LINE } from "../../helpers/regex";

export class SynopsisEntity {
	private constructor(private readonly synopsis: string) {}
	public static create(synopsis: string) {
		if (SynopsisEntity.validate(synopsis)) return;
		return new SynopsisEntity(SynopsisEntity.format(synopsis));
	}
	get value() {
		return this.synopsis;
	}
	private static validate(synopsis: string) {
		return !synopsis;
	}
	private static format(synopsis: string) {
		return synopsis.replaceAll(BREAK_LINE, "").trim();
	}
}
