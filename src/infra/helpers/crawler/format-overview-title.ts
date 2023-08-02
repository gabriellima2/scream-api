import { BLANK_SPACES } from "@/infra/constants/regex";

const BRACKETS = /\(.+\)/g;

export function formatOverviewTitle(title: string) {
	return title.replace(BLANK_SPACES, "_").replace(BRACKETS, "");
}
