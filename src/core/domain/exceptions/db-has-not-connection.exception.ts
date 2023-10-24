import { BaseException } from "./base.exception";
import { HttpStatusCode } from "../helpers/http-status-code";

export class DbHasNotConnection extends BaseException {
	constructor() {
		super("Database has no connection", HttpStatusCode.serverError);
		this.name = "DbHasNotConnection";
	}
}
