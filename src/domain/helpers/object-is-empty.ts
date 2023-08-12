export function ObjectIsEmpty(data: object) {
	return Object.values(data).some((value) => !value);
}
