import { TEXT_TOGETHER } from "../../helpers/regex";

export function separateWords(sentence: string) {
	return sentence.replace(TEXT_TOGETHER, "$1  $2");
}

// $1 and $2 gets splited text, example: HelloWorld: $1 === Hello and $2 === World.
