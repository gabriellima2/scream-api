import { BLANK_SPACES, INVALID_CHARS } from "@/infra/constants/regex";

export function createApiParam(param: string) {
	const paramFormatted = param
		.trim()
		.replace(BLANK_SPACES, "_")
		.replace(INVALID_CHARS, "")
		.toLowerCase();
	return paramFormatted;
}
