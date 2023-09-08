import { CheerioAPI, load } from "cheerio";

import { MovieNamesScraperProtocols } from "@/domain/protocols";
import { MovieNamesScraperAdapter } from "@/domain/adapters";

import { convertMovieNameToDbStandard } from "@/domain/helpers/scraping";

export class MovieNamesScraperAdapterImpl implements MovieNamesScraperAdapter {
	execute(html: string): MovieNamesScraperProtocols.Response {
		const $ = load(html);
		return this.getNames($);
	}

	private getNames($: CheerioAPI): string[] | undefined {
		const names = [];
		const els = $(".mw-parser-output > ul").first();
		if (!els) return undefined;
		$("li", els).each((_, el) => {
			const name = $("i > a", el).text();
			if (!name) return;
			names.push(convertMovieNameToDbStandard(names, name));
		});
		if (names.length <= 0) return;
		return names;
	}
}
