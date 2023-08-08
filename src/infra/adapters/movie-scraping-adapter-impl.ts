import { CheerioAPI, load } from "cheerio";

import { MovieScrapingAdapter } from "@/domain/adapters";
import { Movie, MovieOverview } from "@/domain/entities";

import {
	formatSynopsis,
	formatMovieName,
	formatOverviewTitle,
	formatCharacterName,
	formatOverviewContent,
} from "../helpers/scraping";
import { createApiUrl } from "../helpers/create-api-url";
import { createObject } from "../helpers/create-object";

export class MovieScrapingAdapterImpl implements MovieScrapingAdapter {
	execute(html: string): Partial<Omit<Movie, "id">> {
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
		return formatMovieName(name);
	}

	private getSynopsis($: CheerioAPI): string | undefined {
		const synopsis = $("#Synopsis").parent().next("p").text();
		if (!synopsis) return undefined;
		return formatSynopsis(synopsis);
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
				formatCharacterName(characterName)
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
			const titleFormatted = formatOverviewTitle(title);
			const values = formatOverviewContent(content);
			overview = { ...overview, ...createObject(titleFormatted, values) };
		});
		if (Object.keys(overview).length <= 0) return undefined;
		return overview;
	}
}
