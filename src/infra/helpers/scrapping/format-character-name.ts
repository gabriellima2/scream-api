import { BLANK_SPACES, INVALID_CHARS } from "@/infra/constants/regex";

export function formatCharacterName(name: string) {
	const nameFormatted = name
		.replace(BLANK_SPACES, "_")
		.replace(INVALID_CHARS, "")
		.toLowerCase();
	return nameFormatted;
}
