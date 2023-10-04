import { API_URL } from "@/core/domain/constants/api-url";

export function createApiUrl(path: string, urlParam?: string) {
	if (!urlParam) return `${API_URL}/${path}`;
	return `${API_URL}/${path}/${urlParam}`;
}