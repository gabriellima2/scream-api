import { NEW_LINE_AND_TAB } from "../../helpers/regex";

export function removeInvalidChars(value: string) {
	return value.replace(NEW_LINE_AND_TAB, "");
}
