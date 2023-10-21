import { PaginationAdapter } from "@/adapters/pagination.adapter";

import {
	PaginationInputDTO,
	PaginationOutputDTO,
} from "@/core/domain/dtos/pagination.dto";
import { InvalidParamsException } from "@/core/domain/exceptions/invalid-params.exception";
import { EmptyDataException } from "@/core/domain/exceptions/empty-data.exception";

import { isEmptyArray } from "@/core/domain/functions/is-empty-array";

export class PaginationAdapterImpl<T> implements PaginationAdapter<T> {
	execute(
		data: Array<T>,
		params?: PaginationInputDTO
	): PaginationOutputDTO<Array<T>> {
		if (!params) {
			return {
				items: data,
				total: data.length,
				currentPage: 1,
				totalPages: 1,
			};
		}
		const { page, limit } = params;
		if (isNaN(page) || (limit && isNaN(limit)))
			throw new InvalidParamsException();

		const defaultPage = !page ? 1 : page;
		const defaultLimit = limit === undefined || limit >= 60 ? 60 : limit;
		const start = (defaultPage - 1) * defaultLimit;
		const skip = defaultPage * defaultLimit;
		const pagedData = data.slice(start, skip);
		if (!pagedData || isEmptyArray(pagedData)) throw new EmptyDataException();

		return {
			items: pagedData,
			total: pagedData.length,
			currentPage: params.page,
			totalPages: Math.ceil(data.length / skip),
		};
	}
}
