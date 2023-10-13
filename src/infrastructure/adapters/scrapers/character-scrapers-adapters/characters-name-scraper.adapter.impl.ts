/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheerioAPI } from "cheerio";

import { CharactersNameScraperAdapter } from "@/adapters/scrapers/character-scrapers-adapters/characters-name-scraper.adapter";
import { CharactersNameScraperProtocols } from "@/core/domain/protocols/scrapers/character-scrapers.protocol";

import { NameEntity } from "@/core/domain/entities/character-entity/name.entity";

import { isEmptyArray } from "@/core/domain/functions/is-empty-array";
import { Load } from "@/infrastructure/decorators/load.decorator";

export class CharactersNameScraperAdapterImpl
	implements CharactersNameScraperAdapter
{
	private readonly $: CheerioAPI;
	constructor() {
		this.$;
	}

	@Load
	execute(html: string): CharactersNameScraperProtocols.Response {
		return this.getNames();
	}

	private getNames(): string[] | undefined {
		const names: string[] = [];
		const els = this.$(".category-page__members");
		if (!els) return undefined;
		els.each((_, el) => {
			this.$("ul > li", el).each((_, item) => {
				const name = NameEntity.create(
					this.$(".category-page__member-link", item).text()
				)?.value;
				if (!name) return;
				names.push(name);
			});
		});
		return isEmptyArray(names) ? undefined : names;
	}
}
