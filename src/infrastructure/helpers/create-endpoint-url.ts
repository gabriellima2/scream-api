import { BLANK_SPACES } from "@/core/domain/helpers/regex";
import { API_URL } from "@/core/domain/constants/api-url";

function formatEndpoint(endpoint: string) {
	return endpoint.trim().replace(BLANK_SPACES, "_").replace(/[" ]/g, "");
}

export function createEndpointURL(url: string = API_URL, endpoint: string) {
	return `${url}/${formatEndpoint(endpoint)}`;
}
