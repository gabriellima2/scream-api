import { BREAK_LINE } from "../../helpers/regex";

export function removeBreakLine(synopsis: string) {
	return synopsis.replaceAll(BREAK_LINE, "");
}
