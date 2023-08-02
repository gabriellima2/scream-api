import { BLANK_SPACES, BRACKETS } from "@/infra/constants/regex";

export function formatOverviewTitle(title: string) {
	return title.replace(BLANK_SPACES, "_").replace(BRACKETS, "s").toLowerCase();
}
