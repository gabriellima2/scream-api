import { CheerioAPI, load } from "cheerio";

import { MoviesNameScraperAdapter } from "@/adapters/scrapers/movie-scrapers-adapters/movies-name-scraper.adapter";
import { MoviesNameScraperProtocols } from "@/core/domain/protocols/scrapers/movie-scrapers.protocol";

import { formatMovieName } from "@/core/domain/functions/formatters/format-movie-name";
import { arrayIsEmpty } from "@/core/domain/functions/array-is-empty";

export class MoviesNameScraperAdapterImpl implements MoviesNameScraperAdapter {
	execute(html: string): MoviesNameScraperProtocols.Response {
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
			names.push(formatMovieName(name));
		});
		return arrayIsEmpty(names) ? undefined : names;
	}
}
