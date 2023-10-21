import { HttpStatusCode } from "@/core/domain/helpers/http-status-code";
import type { BaseResponse } from "../@types/base.response";

type ExceptionResponse = Omit<BaseResponse, "success">;

export const exceptionResponse: ExceptionResponse = {
	serverError: {
		status: HttpStatusCode.serverError,
		description: "Server Error",
		schema: { example: { message: "An unexpected error has occurred" } },
	},
	notFound: {
		status: HttpStatusCode.notFound,
		description: "Not Found",
		schema: { example: { message: "No information was found" } },
	},
};
