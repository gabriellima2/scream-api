import { PaginationAdapterImpl } from "./pagination.adapter.impl";
import type { PaginationInputDTO } from "@/core/domain/dtos/pagination.dto";

const makeSut = () => new PaginationAdapterImpl();

describe("PaginationAdapter", () => {
	const data = ["any", "data"];

	describe("Paged", () => {
		function expectPagedData(data: unknown[], total: number) {
			expect(data.length).toBe(total);
		}

		const cases = [{ page: 1, limit: 1 }, undefined];
		test.each(cases)("should paged data correctly", (params) => {
			const sut = makeSut();
			const { items, total } = sut.execute(data, params);

			expectPagedData(items, total);
		});
	});
	describe("Errors", () => {
		const cases = [{ page: "any", limit: "any" }, { page: 1000 }];
		test.each(cases)(
			"should throw an error when params has invalid values",
			(params) => {
				try {
					const sut = makeSut();
					sut.execute(data, params as unknown as PaginationInputDTO);
				} catch (err) {
					expect(err).toBeInstanceOf(Error);
				}
			}
		);
	});
});
