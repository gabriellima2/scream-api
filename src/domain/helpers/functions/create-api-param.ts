import { BLANK_SPACES, INVALID_CHARS } from "../regex";
import { capitalizeSentence } from "./capitalize-sentence";

export function createApiParam(param: string) {
	const paramFormatted = capitalizeSentence(
		param.trim().replace(BLANK_SPACES, "_").replace(INVALID_CHARS, "")
	);
	return paramFormatted;
}
