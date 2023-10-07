import { NameEntity } from "../character-entity/name.entity";

import { capitalizeSentence } from "../../functions/formatters/capitalize-sentence";
import { isEmptyArray } from "../../functions/is-empty-array";

import { BLANK_SPACES, INVALID_CHARS } from "../../helpers/regex";
import { API_URL } from "../../constants/api-url";

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
		return (
			!characters ||
			isEmptyArray(characters) ||
			characters.some((value) => !value)
		);
	}
	private static format(characters: string[]) {
		return characters.map((name) => {
			const formatted = capitalizeSentence(
				NameEntity.create(name)
					.value.trim()
					.replace(BLANK_SPACES, "_")
					.replace(INVALID_CHARS, "")
			);
			return `${API_URL}/characters/${formatted}`;
		});
	}
}
