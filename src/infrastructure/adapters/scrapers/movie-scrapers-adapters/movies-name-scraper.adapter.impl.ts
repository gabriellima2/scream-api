/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheerioAPI } from "cheerio";

import { MoviesNameScraperAdapter } from "@/adapters/scrapers/movie-scrapers-adapters/movies-name-scraper.adapter";
import { MoviesNameScraperProtocols } from "@/core/domain/protocols/scrapers/movie-scrapers.protocol";

import { NameEntity } from "@/core/domain/entities/movie-entity/name.entity";

import { isEmptyArray } from "@/core/domain/functions/is-empty-array";
import { Load } from "@/infrastructure/decorators/load.decorator";

export class MoviesNameScraperAdapterImpl implements MoviesNameScraperAdapter {
	private readonly $: CheerioAPI;
	constructor() {
		this.$;
	}

	@Load
	execute(html: string): MoviesNameScraperProtocols.Response {
		return this.getNames();
	}

	private getNames(): string[] | undefined {
		const names = [];
		const els = this.$(".mw-parser-output > ul").first();
		if (!els) return undefined;
		this.$("li", els).each((_, el) => {
			const name = NameEntity.create(this.$("i > a", el).text()).value;
			if (!name) return;
			names.push(name);
		});
		return isEmptyArray(names) ? undefined : names;
	}
}
