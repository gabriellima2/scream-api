export type PaginationInputDTO = {
	page: number;
	limit?: number;
};
export type PaginationOutputDTO<Items> = {
	items: Items;
	total: number;
	totalPages: number;
	currentPage: number;
};
