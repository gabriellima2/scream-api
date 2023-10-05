import { DOUBLE_BLANK_SPACES } from "../helpers/regex";
import { separateWords } from "./formatters/separate-words";

export function createListFromString(value: string) {
	const separatedValue = separateWords(value);
	if (!separatedValue.match(DOUBLE_BLANK_SPACES)) return [separatedValue];
	return separatedValue.split(DOUBLE_BLANK_SPACES);
}
