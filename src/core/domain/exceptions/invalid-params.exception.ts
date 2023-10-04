import { BaseException } from "./base.exception";
import { HttpStatusCode } from "../helpers/http-status-code";

export class InvalidParamsException extends BaseException {
	constructor() {
		super("Received parameters are invalid", HttpStatusCode.serverError);
		this.name = "InvalidParamsException";
	}
}
