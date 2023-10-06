import { CheerioAPI, load } from "cheerio";

import { CharactersNameScraperAdapter } from "@/adapters/scrapers/character-scrapers-adapters/characters-name-scraper.adapter";
import { CharactersNameScraperProtocols } from "@/core/domain/protocols/scrapers/character-scrapers.protocol";

import { formatCharacterName } from "@/core/domain/functions/formatters/format-character-name";
import { isEmptyArray } from "@/core/domain/functions/is-empty-array";

export class CharactersNameScraperAdapterImpl
	implements CharactersNameScraperAdapter
{
	execute(html: string): CharactersNameScraperProtocols.Response {
		const $ = load(html);
		return this.getNames($);
	}

	private getNames($: CheerioAPI): string[] | undefined {
		const names: string[] = [];
		const els = $(".category-page__members");
		if (!els) return undefined;
		els.each((_, el) => {
			$("ul > li", el).each((_, item) => {
				const name = $(".category-page__member-link", item).text();
				const hasInvalidChars = name.includes(":") || name.includes("(");
				if (!name || hasInvalidChars) return;
				names.push(formatCharacterName(name));
			});
		});
		return isEmptyArray(names) ? undefined : names;
	}
}
