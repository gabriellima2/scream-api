import { BaseError } from "./base-error";
import { HttpStatusCode } from "../helpers/http-status-code";

export class EmptyDataError extends BaseError {
	constructor() {
		super("No information was found", HttpStatusCode.notFound);
		this.name = "EmptyDataError";
	}
}
