import { NEW_LINE_AND_TAB } from "@/infra/constants/regex";

export function formatMovieName(name: string) {
	return name.replace(NEW_LINE_AND_TAB, "");
}
