import { CheerioAPI, load } from "cheerio";

import { CharactersNameScraperProtocols } from "@/domain/protocols";
import { CharactersNameScraperAdapter } from "@/domain/adapters";

import { createApiParam } from "@/domain/helpers/functions/create-api-param";

export class CharactersNameScraperAdapterImpl
	implements CharactersNameScraperAdapter
{
	execute(html: string): CharactersNameScraperProtocols.Response {
		const $ = load(html);
		return this.getNames($);
	}

	private getNames($: CheerioAPI): string[] | undefined {
		const names = [];
		const els = $(".category-page__members");
		if (!els) return undefined;
		els.each((_, el) => {
			$("ul > li", el).each((_, item) => {
				const name = $(".category-page__member-link", item).text();
				const hasInvalidChars = name.includes(":") || name.includes("(");
				if (!name || hasInvalidChars) return;
				names.push(createApiParam(name));
			});
		});
		if (names.length <= 0) return;
		return names;
	}
}
