import { CheerioAPI, load } from "cheerio";

import { MovieScrapingProtocols } from "@/domain/protocols";
import { MovieScrapingAdapter } from "@/domain/adapters";
import { MovieOverview } from "@/domain/entities";

import { removeInvalidChars } from "@/domain/helpers/remove-invalid-chars";
import { removeBreakLine } from "@/domain/helpers/remove-break-line";
import { formatObjectKey } from "@/domain/helpers/format-object-key";
import { createApiParam } from "@/domain/helpers/create-api-param";
import { formatOverviewContent } from "@/domain/helpers/scraping";
import { ObjectIsEmpty } from "@/domain/helpers/object-is-empty";
import { createApiUrl } from "@/domain/helpers/create-api-url";
import { createObject } from "@/domain/helpers/create-object";

export class MovieScrapingAdapterImpl implements MovieScrapingAdapter {
	execute(html: string): MovieScrapingProtocols.Response {
		const $ = load(html);
		return {
			name: this.getName($),
			image: this.getImage($),
			synopsis: this.getSynopsis($),
			overview: this.getOverview($),
			characters: this.getCharacters($),
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

	private getSynopsis($: CheerioAPI): string | undefined {
		const synopsis = $("#Synopsis").parent().next("p").text();
		if (!synopsis) return undefined;
		return removeBreakLine(synopsis);
	}

	private getCharacters($: CheerioAPI): string[] | undefined {
		const characters: string[] = [];
		const container = $("#Main_Characters")
			.parent()
			.nextUntil("h2")
			.add($("#Main_characters").parent().nextUntil("h2"));
		if (!container) return undefined;
		container.each((_, el) => {
			const characterName = $("ul > li > a", el).eq(1).text();
			if (!characterName) return;
			const characterApiUrl = createApiUrl(
				"characters",
				createApiParam(characterName)
			);
			characters.push(characterApiUrl);
		});
		if (characters.length <= 0) return undefined;
		return characters;
	}

	private getOverview($: CheerioAPI): MovieOverview | undefined {
		let overview: MovieOverview = {} as MovieOverview;
		const container = $(".pi-data");
		if (!container) return undefined;
		container.each((i, el) => {
			const title = $(".pi-data-label", el).text();
			if (title.toLowerCase() === "starring") return;
			const content = $(".pi-data-value.pi-font", el).text();
			const titleFormatted = formatObjectKey(title);
			const values = formatOverviewContent(content);
			overview = { ...overview, ...createObject(titleFormatted, values) };
		});
		if (ObjectIsEmpty(overview)) return undefined;
		return overview;
	}
}