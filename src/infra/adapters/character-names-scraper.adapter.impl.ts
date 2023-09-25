import { CheerioAPI, load } from "cheerio";

import { CharacterNamesScraperProtocols } from "@/domain/protocols";
import { CharacterNamesScraperAdapter } from "@/domain/adapters";

import { formatCharacterName } from "@/domain/helpers/functions/format-character-name";
import { arrayIsEmpty } from "@/domain/helpers/functions/array-is-empty";

export class CharacterNamesScraperAdapterImpl
	implements CharacterNamesScraperAdapter
{
	execute(html: string): CharacterNamesScraperProtocols.Response {
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
		return arrayIsEmpty(names) ? undefined : names;
	}
}
