import { capitalizeSentence } from "@/core/domain/functions/formatters/capitalize-sentence";
import { BLANK_SPACES, INVALID_CHARS } from "@/core/domain/helpers/regex";
import { API_URL } from "@/core/domain/constants/api-url";

function formatEndpoint(endpoint: string) {
	return capitalizeSentence(
		endpoint.trim().replace(BLANK_SPACES, "_").replace(INVALID_CHARS, "")
	);
}

export function createEndpointURL(url: string = API_URL, endpoint: string) {
	return `${url}/${formatEndpoint(endpoint)}`;
}
