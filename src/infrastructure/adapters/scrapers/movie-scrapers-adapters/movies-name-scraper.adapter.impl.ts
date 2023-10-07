import { CheerioAPI, load } from "cheerio";

import { MoviesNameScraperAdapter } from "@/adapters/scrapers/movie-scrapers-adapters/movies-name-scraper.adapter";
import { MoviesNameScraperProtocols } from "@/core/domain/protocols/scrapers/movie-scrapers.protocol";

import { NameEntity } from "@/core/domain/entities/movie-entity/name.entity";
import { isEmptyArray } from "@/core/domain/functions/is-empty-array";

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
			const name = NameEntity.create($("i > a", el).text()).value;
			if (!name) return;
			names.push(name);
		});
		return isEmptyArray(names) ? undefined : names;
	}
}
