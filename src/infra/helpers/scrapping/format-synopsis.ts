import { BREAK_LINE } from "@/infra/constants/regex";

export function formatSynopsis(synopsis: string) {
	return synopsis.replace(BREAK_LINE, "");
}
