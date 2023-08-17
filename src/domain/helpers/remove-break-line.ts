import { BREAK_LINE } from "./regex";

export function removeBreakLine(synopsis: string) {
	return synopsis.replaceAll(BREAK_LINE, "");
}
