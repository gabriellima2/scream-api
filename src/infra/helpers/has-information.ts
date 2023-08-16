export function hasInformation<T = string>(values: T[], searchValue: T) {
	return values.includes(searchValue);
}
