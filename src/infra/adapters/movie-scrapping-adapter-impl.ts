import { CheerioAPI, load } from "cheerio";

import { MovieScrappingProtocols } from "@/domain/protocols";
import { MovieScrappingAdapter } from "@/domain/adapters";
import { MovieOverview } from "@/domain/entities";

import {
	formatSynopsis,
	formatMovieName,
	formatOverviewTitle,
	formatCharacterName,
	formatOverviewContent,
} from "../helpers/scrapping";
import { createApiUrl } from "../helpers/create-api-url";
import { createObject } from "../helpers/create-object";

export class MovieScrappingAdapterImpl implements MovieScrappingAdapter {
	execute(html: string): MovieScrappingProtocols.Response {
		const $ = load(html);
		return {
			name: this.getName($),
			banner: this.getBanner($),
			synopsis: this.getSynopsis($),
			overview: this.getOverview($),
			characters: this.getCharacters($),
		};
	}

	private getBanner($: CheerioAPI): string {
		return $("figure > a > img").attr("src");
	}

	private getName($: CheerioAPI): string {
		return formatMovieName(
			$("#firstHeading > i").add($("#firstHeading")).first().text()
		);
	}

	private getSynopsis($: CheerioAPI): string {
		return formatSynopsis($("#Synopsis").parent().next("p").text());
	}

	private getCharacters($: CheerioAPI): string[] {
		const characters: string[] = [];
		const container = $("#Main_Characters")
			.parent()
			.nextUntil("h2")
			.add($("#Main_characters").parent().nextUntil("h2"));
		container.each((_, el) => {
			const characterName = $("ul > li > a", el).eq(1).text();
			if (!characterName) return;
			const characterApiUrl = createApiUrl(
				"characters",
				formatCharacterName(characterName)
			);
			characters.push(characterApiUrl);
		});
		return characters;
	}

	private getOverview($: CheerioAPI): MovieOverview {
		let overview: MovieOverview = {} as MovieOverview;
		const container = $(".pi-data");
		container.each((i, el) => {
			const title = $(".pi-data-label", el).text();
			if (title === "Starring") return;
			const content = $(".pi-data-value.pi-font", el).text();
			const titleFormatted = formatOverviewTitle(title);
			const values = formatOverviewContent(content);
			overview = { ...overview, ...createObject(titleFormatted, values) };
		});
		return overview;
	}
}
