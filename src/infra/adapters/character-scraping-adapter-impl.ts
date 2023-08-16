import { CheerioAPI, load } from "cheerio";

import { CharacterScrapingProtocols } from "@/domain/protocols";
import { CharacterScrapingAdapter } from "@/domain/adapters";
import { CharacterOverview } from "@/domain/entities";

import { removeInvalidChars } from "../helpers/remove-invalid-chars";
import { ObjectIsEmpty } from "@/domain/helpers/object-is-empty";
import { formatObjectKey } from "../helpers/format-object-key";
import { createApiParam } from "../helpers/create-api-param";
import { formatOverviewContent } from "../helpers/scraping";
import { hasInformation } from "../helpers/has-information";
import { createApiUrl } from "../helpers/create-api-url";
import { createObject } from "../helpers/create-object";

const OVERVIEW_INFOS = ["born", "actors/actress", "status", "personality"];

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
		let overview: CharacterOverview = {} as CharacterOverview;
		const els = $(".pi-data");
		if (!els) return undefined;
		els.each((_, el) => {
			if (!hasInformation(OVERVIEW_INFOS, el.attribs["data-source"])) return;
			const title = formatObjectKey($(".pi-data-label", el).text());
			const contentEl = $(".pi-data-value", el);
			const isListEl = contentEl.children().first().is("ul");
			if (isListEl) {
				const contents = [];
				$("ul > li", contentEl).each((_, el) => {
					const content = $(el).text();
					contents.push(formatOverviewContent(content));
				});
				overview = { ...overview, ...createObject(title, contents) };
				return;
			}
			const content = contentEl.text();
			overview = {
				...overview,
				...createObject(title, formatOverviewContent(content)),
			};
		});
		if (ObjectIsEmpty(overview)) return undefined;
		return overview;
	}

	private getAppearances($: CheerioAPI): string[] | undefined {
		const appearances = [];
		const els = $("#Appearances").parent().next("ul");
		if (!els) return undefined;
		$("li", els).each((_, el) => {
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
