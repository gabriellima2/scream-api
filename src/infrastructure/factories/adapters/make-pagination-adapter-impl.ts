import { PaginationAdapterImpl } from "@/infrastructure/adapters/pagination.adapter.impl";

export const makePaginationAdapterImpl = <T>() =>
	new PaginationAdapterImpl<T>();
