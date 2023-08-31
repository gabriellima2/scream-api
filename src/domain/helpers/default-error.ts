import { HttpStatusCode } from "./http-status-code";

export const DEFAULT_ERROR = {
	message: "An unexpected error has occurred",
	statusCode: HttpStatusCode.serverError,
};
