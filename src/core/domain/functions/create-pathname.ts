import { BLANK_SPACES, INVALID_CHARS } from "../helpers/regex";
import { capitalizeSentence } from "./formatters/capitalize-sentence";

export function createPathname(param: string) {
	const paramFormatted = capitalizeSentence(
		param.trim().replace(BLANK_SPACES, "_").replace(INVALID_CHARS, "")
	);
	return paramFormatted;
}
