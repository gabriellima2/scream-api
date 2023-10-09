import { BaseException } from "../exceptions/base.exception";
import { HttpStatusCode } from "../helpers/http-status-code";

export function handleException(err: BaseException) {
	return {
		message: (err as Error).message || "An unexpected error has occurred",
		statusCode: err.statusCode || HttpStatusCode.serverError,
	};
}
