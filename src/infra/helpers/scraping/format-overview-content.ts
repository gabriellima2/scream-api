import {
	DATE_FORMAT,
	DOUBLE_BLANK_SPACES,
	TEXT_TOGETHER,
} from "@/infra/constants/regex";

const DOLLAR_ABBR = " USD";

export function formatOverviewContent(content: string): string[] | string {
	const dateMatch = content.match(DATE_FORMAT);
	if (dateMatch) return dateMatch[0];
	const contentFormatted = content
		.replace(DOLLAR_ABBR, "")
		.replace(TEXT_TOGETHER, "$1  $2");
	if (!contentFormatted.match(DOUBLE_BLANK_SPACES)) return contentFormatted;
	return contentFormatted.split(DOUBLE_BLANK_SPACES);
}

// $1 and $2 gets splited text, example: HelloWorld: $1 === Hello and $2 === World.
