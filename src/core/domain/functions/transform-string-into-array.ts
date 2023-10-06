import { DOUBLE_BLANK_SPACES, TEXT_TOGETHER } from "../helpers/regex";

/** Separates the value by capitalized letter, adding a double space, thus facilitating the splitting of the string into an array
 * @param value Value that will be transformed into an array
 * @returns Value converted into array
 */
export function transformStringIntoArray(value: string) {
	const separatedValue = value.replace(TEXT_TOGETHER, "$1  $2");
	if (!separatedValue.match(DOUBLE_BLANK_SPACES)) return [separatedValue];
	return separatedValue.split(DOUBLE_BLANK_SPACES);
}

// $1 and $2 gets splited text, example: HelloWorld: $1 === Hello and $2 === World.
