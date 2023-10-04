export class BaseException extends Error {
	constructor(message: string, public readonly statusCode: number) {
		super(message);
	}
}
