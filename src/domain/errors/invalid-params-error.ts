import { BaseError } from "./base-error";
import { HttpStatusCode } from "../helpers/http-status-code";

export class InvalidParamsError extends BaseError {
	constructor() {
		super("Received parameters are invalid", HttpStatusCode.serverError);
		this.name = "InvalidParamsError";
	}
}
