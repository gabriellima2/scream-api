import {
	PaginationInputDTO,
	PaginationOutputDTO,
} from "@/core/domain/dtos/pagination.dto";

export interface PaginationAdapter<T> {
	execute(
		data: Array<T>,
		params: PaginationInputDTO
	): PaginationOutputDTO<Array<T>>;
}
