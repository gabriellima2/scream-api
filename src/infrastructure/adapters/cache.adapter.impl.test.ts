import { CacheAdapterImpl } from "./cache.adapter.impl";
import { expectExceptionsToBeHandled } from "@/__mocks__/expect-exceptions-to-be-handled";

const UNFORMATTED_ID = "Any id";
const FORMATTED_ID = "any_id";
const VALUE = "any_value";

const makeSut = () => new CacheAdapterImpl<string>();

describe("CacheAdapter", () => {
	const sut = makeSut();
	function insertCache(id = UNFORMATTED_ID, value = VALUE) {
		sut.insert(id, value);
	}

	afterEach(() => {
		sut.clear();
	});

	describe("Get Method", () => {
		it("should get the data correctly", () => {
			insertCache();
			const data = sut.get(FORMATTED_ID);

			expect(data).toBeTruthy();
		});
		it("should return null when it does not have the data", () => {
			const data = sut.get(FORMATTED_ID);

			expect(data).toBeNull();
		});
	});
	describe("Insert Method", () => {
		it("should insert the data correctly", () => {
			insertCache();

			expect(sut.cache).toMatchObject({ [FORMATTED_ID]: VALUE });
		});
		it("should throw an error when the passed id is already in use", () => {
			try {
				insertCache();
				insertCache();
			} catch (err) {
				expectExceptionsToBeHandled(err);
			}
		});
	});
	describe("Remove Method", () => {
		it("should remove the data correctly", () => {
			insertCache();
			sut.remove(FORMATTED_ID);

			expect(sut.cache).toMatchObject({});
		});
	});
	describe("Clear Method", () => {
		it("should clear correctly", () => {
			insertCache();
			sut.clear();

			expect(sut.cache).toMatchObject({});
		});
	});
});
