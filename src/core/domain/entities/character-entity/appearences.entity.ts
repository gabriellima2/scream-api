import { capitalizeSentence } from "../../functions/formatters/capitalize-sentence";
import { isEmptyArray } from "../../functions/is-empty-array";

import { BLANK_SPACES, INVALID_CHARS } from "../../helpers/regex";
import { API_URL } from "../../constants/api-url";

export class AppearancesEntity {
	private constructor(private readonly appearences: string[]) {}
	public static create(appearences: string[]) {
		if (AppearancesEntity.validate(appearences)) return;
		return new AppearancesEntity(AppearancesEntity.format(appearences));
	}
	get value() {
		return this.appearences;
	}
	private static validate(appearences: string[]) {
		return !appearences || isEmptyArray(appearences);
	}
	private static format(appearences: string[]) {
		return appearences.map((appearence) => {
			const formatted = capitalizeSentence(
				appearence.trim().replace(BLANK_SPACES, "_").replace(INVALID_CHARS, "")
			);
			return `${API_URL}/movies/${formatted}`;
		});
	}
}
