import { BLANK_SPACES } from "@/infra/constants/regex";

const INVALID_CHARS = /[" .]/g;

export function formatCharacterName(name: string) {
	const nameFormatted = name
		.replace(INVALID_CHARS, "")
		.replace(BLANK_SPACES, "_")
		.toLowerCase()
		.split("_");
	const firstName = nameFormatted[0];
	const lastName = nameFormatted[nameFormatted.length - 1];
	return `${firstName}_${lastName}`;
}
