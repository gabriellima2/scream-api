import { CheerioAPI, load } from "cheerio";

import { CharacterScrapingProtocols } from "@/domain/protocols";
import { CharacterScrapingAdapter } from "@/domain/adapters";
import { CharacterOverview } from "@/domain/entities";

import { removeInvalidChars } from "../helpers/remove-invalid-chars";
import { ObjectIsEmpty } from "@/domain/helpers/object-is-empty";
import { formatObjectKey } from "../helpers/format-object-key";
import { createApiParam } from "../helpers/create-api-param";
import { formatOverviewContent } from "../helpers/scraping";
import { createApiUrl } from "../helpers/create-api-url";
import { createObject } from "../helpers/create-object";

export class CharacterScrapingAdapterImpl implements CharacterScrapingAdapter {
	execute(html: string): CharacterScrapingProtocols.Response {
		const $ = load(html);
		return {
			name: this.getName($),
			image: this.getImage($),
			description: this.getDescription($),
			overview: this.getOverview($),
			appearances: this.getAppearances($),
		};
	}

	private getImage($: CheerioAPI): string | undefined {
		return $("figure > a > img").attr("src");
	}

	private getName($: CheerioAPI): string | undefined {
		const name = $("#firstHeading > i").add($("#firstHeading")).first().text();
		if (!name) return undefined;
		return removeInvalidChars(name);
	}

	private getDescription($: CheerioAPI): string | undefined {
		const paragraphs = $(".mw-parser-output > p");
		const description = paragraphs
			.filter((_, el) => $(el).text().trim().length > 0)
			.first()
			.text();
		if (!description) return undefined;
		return removeInvalidChars(description);
	}

	private getOverview($: CheerioAPI): CharacterOverview | undefined {
		const OVERVIEW_INFOS = ["born", "actors/actress", "status", "personality"];
		let content: CharacterOverview = {} as CharacterOverview;
		const container = $(".pi-data");
		if (!container) return undefined;
		container.each((_, el) => {
			if (!OVERVIEW_INFOS.includes(el.attribs["data-source"])) return;
			const title = formatObjectKey($(".pi-data-label", el).text());
			if (!$(".pi-data-value", el).children().first().is("ul")) {
				const value = $(".pi-data-value", el).text();
				content = {
					...content,
					...createObject(title, formatOverviewContent(value)),
				};
				return;
			}
			const values = [];
			$(".pi-data-value > ul > li", el).each((_, el) => {
				const value = $(el).text();
				values.push(formatOverviewContent(value));
			});
			content = { ...content, ...createObject(title, values) };
		});
		if (ObjectIsEmpty(content)) return undefined;
		return content;
	}

	private getAppearances($: CheerioAPI): string[] | undefined {
		const appearances = [];
		const container = $("#Appearances").parent().next("ul");
		if (!container) return undefined;
		$("li", container).each((_, el) => {
			const appearance = $("li > i > a", el).text();
			if (!appearance) return;
			const appearanceApiUrl = createApiUrl(
				"movies",
				createApiParam(appearance)
			);
			appearances.push(appearanceApiUrl);
		});
		if (appearances.length <= 0) return undefined;
		return appearances;
	}
}
