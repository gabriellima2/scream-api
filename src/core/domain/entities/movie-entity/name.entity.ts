import { capitalizeSentence } from "../../functions/formatters/capitalize-sentence";
import { NEW_LINE_AND_TAB } from "../../helpers/regex";

let prevName = "";

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
		return !name;
	}
	private static format(name: string) {
		const formattedName = capitalizeSentence(
			name.replace(NEW_LINE_AND_TAB, "").replace("_", " ")
		);
		if (prevName === "Scream 4" && formattedName === "Scream") {
			const newName = "Scream 5";
			prevName = newName;
			return newName;
		}
		if (formattedName === "Scream VI") {
			const newName = "Scream 6";
			prevName = newName;
			return newName;
		}
		prevName = formattedName;
		return formattedName;
	}
}
