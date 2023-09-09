const DOLLAR = " USD";

export function removeDollarAbbr(value: string) {
	return value.replace(DOLLAR, "");
}
