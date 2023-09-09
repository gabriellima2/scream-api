import { CheerioAPI } from "cheerio";

export function scrapeGeneralInfo(
	$: CheerioAPI,
	selector: string
): string | undefined {
	const container = $(`div[data-source='${selector}']`);
	if (!container) return;
	const value = $(".pi-data-value.pi-font", container).text();
	if (!value) return;
	return value;
}
