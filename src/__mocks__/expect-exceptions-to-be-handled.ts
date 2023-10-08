export function expectExceptionsToBeHandled(err: Error) {
	expect(err).toBeInstanceOf(Error);
}
