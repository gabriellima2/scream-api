export class BaseError extends Error {
	constructor(message: string, public readonly statusCode: number) {
		super(message);
	}
}
