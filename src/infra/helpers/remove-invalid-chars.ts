import { NEW_LINE_AND_TAB } from "@/infra/constants/regex";

export function removeInvalidChars(value: string) {
	return value.replace(NEW_LINE_AND_TAB, "");
}
