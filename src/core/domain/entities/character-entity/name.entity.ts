import { capitalizeSentence } from "../../functions/formatters/capitalize-sentence";
import { NEW_LINE_AND_TAB, QUOTES } from "../../helpers/regex";

const PERMITTED_NAME_COMPLEMENTS = ["in", "&", "the"];

export class NameEntity {
	private constructor(private readonly name: string) {}
	public static create(name: string) {
		if (NameEntity.validate(name)) return;
		return new NameEntity(NameEntity.format(name));
	}
	get value() {
		return this.name;
	}
	private static validate(name: string) {
		return !name || name.includes(":") || name.includes("(");
	}
	private static format(name: string) {
		const nameWithoutInvalidChars = name
			.replace(NEW_LINE_AND_TAB, "")
			.replace(QUOTES, " ")
			.trim();
		const moreThanTwoWords = /^(\S+)\s+(?:.*\s)?(\S+)$/;
		const match = nameWithoutInvalidChars.match(moreThanTwoWords);
		if (
			match &&
			!PERMITTED_NAME_COMPLEMENTS.some((complement) =>
				nameWithoutInvalidChars.toLowerCase().includes(complement)
			)
		) {
			const capitalizedName = capitalizeSentence(`${match[1]} ${match[2]}`);
			if (nameWithoutInvalidChars.includes("with")) {
				const splitedName = capitalizedName.split(" ");
				return `${splitedName[0]} with ${splitedName[1]}`;
			}
			return capitalizedName;
		}
		return capitalizeSentence(nameWithoutInvalidChars);
	}
}
