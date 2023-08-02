import { CheerioAPI, load } from "cheerio";

import { MovieCrawlerProtocols } from "@/domain/protocols/movie-crawler-protocols";
import { MovieCrawlerAdapter } from "@/domain/adapters/movie-crawler-adapter";
import { MovieOverview } from "@/domain/entities/movie";

import { formatOverviewContent } from "../helpers/crawler/format-overview-content";
import { formatOverviewTitle } from "../helpers/crawler/format-overview-title";
import { createObject } from "../helpers/create-object";

// Remove later
import { screamOne } from "@/constants/scream-one";

export class MovieCrawlerAdapterImpl implements MovieCrawlerAdapter {
	execute(html: string): MovieCrawlerProtocols.Response {
		const $ = load(screamOne);
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
		return $("figure > a > img").attr("src");
	}

	private getSynopsis($: CheerioAPI): string {
		return $("#Synopsis").parent().next("p").text();
	}

	private getCharacters($: CheerioAPI): string[] {
		const container = $("#Main_Characters")
			.parent()
			.nextUntil("h2")
			.add($("#Main_characters").parent().nextUntil("h2"));
		const characters: string[] = [];

		container.each((_, el) => {
			const character = $("ul > li > a", el).eq(1).text();
			const characterFormatted = character
				.replace(/[" .]/g, "")
				.replace(/\s/g, "-")
				.toLowerCase()
				.split("-");
			characters.push(
				`${characterFormatted[0]}_${
					characterFormatted[characterFormatted.length - 1]
				}`
			);
		});
		return characters;
	}

	private getOverview($: CheerioAPI): MovieOverview {
		const container = $(".pi-data");
		let overview: MovieOverview = {} as MovieOverview;

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
