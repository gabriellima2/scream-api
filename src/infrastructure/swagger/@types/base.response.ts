import { ApiResponseOptions } from "@nestjs/swagger";

export interface BaseResponse {
	serverError: ApiResponseOptions;
	notFound: ApiResponseOptions;
	success: ApiResponseOptions;
}
