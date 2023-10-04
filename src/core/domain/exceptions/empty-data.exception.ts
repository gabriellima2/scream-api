import { BaseException } from "./base.exception";
import { HttpStatusCode } from "../helpers/http-status-code";

export class EmptyDataException extends BaseException {
	constructor() {
		super("No information was found", HttpStatusCode.notFound);
		this.name = "EmptyDataException";
	}
}
