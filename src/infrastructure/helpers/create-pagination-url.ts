import { API_URL } from "@/core/domain/constants/api-url";

type Options = { page: number; limit: number };

export function createPaginationUrl(pathname: string, options: Options) {
	const { page, limit } = options;
	const url = `${API_URL}/${pathname}`;
	return {
		next: url + `?page=${page + 1}&limit=${limit}`,
		last: url + `?page=${page - 1}&limit=${limit}`,
	};
}
