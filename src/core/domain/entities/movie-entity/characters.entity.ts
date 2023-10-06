export class CharactersEntity {
	private constructor(private readonly characters: string[]) {}
	public static create(characters: string[]) {
		if (CharactersEntity.validate(characters)) return;
		return new CharactersEntity(CharactersEntity.format(characters));
	}
	get value() {
		return this.characters;
	}
	private static validate(characters: string[]) {
		return !characters;
	}
	private static format(characters: string[]) {
		return characters;
	}
}
