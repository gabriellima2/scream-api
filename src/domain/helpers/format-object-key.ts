import { BLANK_SPACES, PARENTHESES } from "./regex";

export function formatObjectKey(title: string) {
	return title
		.replace(BLANK_SPACES, "_")
		.replace(PARENTHESES, "s")
		.toLowerCase();
}
