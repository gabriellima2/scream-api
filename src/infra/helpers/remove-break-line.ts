import { BREAK_LINE } from "@/infra/constants/regex";

export function removeBreakLine(synopsis: string) {
	return synopsis.replaceAll(BREAK_LINE, "");
}
