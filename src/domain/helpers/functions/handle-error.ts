import { BaseError } from "@/domain/errors";
import { DEFAULT_ERROR } from "../default-error";

export function handleError(err: BaseError) {
	return {
		message: (err as Error).message || DEFAULT_ERROR.message,
		statusCode: err.statusCode || DEFAULT_ERROR.statusCode,
	};
}
