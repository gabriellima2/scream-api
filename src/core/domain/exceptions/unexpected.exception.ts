import { BaseException } from "./base.exception";
import { HttpStatusCode } from "../helpers/http-status-code";

export class UnexpectedException extends BaseException {
	constructor() {
		super("An unexpected error has occurred", HttpStatusCode.serverError);
		this.name = "UnexpectedException";
	}
}
