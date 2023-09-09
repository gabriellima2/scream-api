import { CheerioAPI, load } from "cheerio";
import { Injectable } from "@nestjs/common";

import { MovieScraperProtocols } from "@/domain/protocols";
import { MovieScraperAdapter } from "@/domain/adapters";

import { createListFromString } from "@/domain/helpers/functions/create-list-from-string";
import { scrapeGeneralInfo } from "@/domain/helpers/scraping/scrape-general-info";
import { removeDollarAbbr } from "@/domain/helpers/functions/remove-dollar-abbr";
import { formatMovieName } from "@/domain/helpers/functions/format-movie-name";
import { removeBreakLine } from "@/domain/helpers/functions/remove-break-line";
import { createApiParam } from "@/domain/helpers/functions/create-api-param";
import { createApiUrl } from "@/domain/helpers/functions/create-api-url";

@Injectable()
export class MovieScraperAdapterImpl implements MovieScraperAdapter {
	private $: CheerioAPI;
	constructor() {
		this.$;
	}

	execute(html: string): MovieScraperProtocols.Response {
		this.$ = load(html);
		return {
			name: this.getName(),
			image: this.getImage(),
			synopsis: this.getSynopsis(),
			box_office: this.getBoxOffice(),
			composer: this.getComposer(),
			directors: this.getDirectors(),
			writers: this.getWriters(),
			producers: this.getProducers(),
			release_date: this.getRealeaseDate(),
			characters: this.getCharacters(),
			running_time: this.getRunningTime(),
		};
	}

	private getImage(): string | undefined {
		return this.$("figure > a > img").attr("src");
	}

	private getName(): string | undefined {
		const name = this.$("#firstHeading > i")
			.add(this.$("#firstHeading"))
			.first()
			.text();
		if (!name) return;
		return formatMovieName(name);
	}

	private getSynopsis(): string | undefined {
		const synopsis = this.$("#Synopsis").parent().next("p").text();
		if (!synopsis) return;
		return removeBreakLine(synopsis);
	}

	private getCharacters(): string[] | undefined {
		const characters: string[] = [];
		const container = this.$("#Main_Characters")
			.parent()
			.nextUntil("h2")
			.add(this.$("#Main_characters").parent().nextUntil("h2"));
		if (!container) return;
		container.each((_, el) => {
			const characterName = this.$("ul > li > a", el).eq(1).text();
			if (!characterName) return;
			const characterApiUrl = createApiUrl(
				"characters",
				createApiParam(characterName)
			);
			characters.push(characterApiUrl);
		});
		if (characters.length <= 0) return;
		return characters;
	}

	private getDirectors(): string[] | undefined {
		const directors = scrapeGeneralInfo(this.$, "director");
		if (!directors) return;
		return createListFromString(directors);
	}

	private getWriters(): string[] | undefined {
		const writers = scrapeGeneralInfo(this.$, "writer");
		if (!writers) return;
		return createListFromString(writers);
	}

	private getProducers(): string[] | undefined {
		const producers = scrapeGeneralInfo(this.$, "producer");
		if (!producers) return;
		return createListFromString(producers);
	}

	private getComposer(): string[] | undefined {
		const composer = scrapeGeneralInfo(this.$, "composer");
		if (!composer) return;
		return createListFromString(composer);
	}

	private getRealeaseDate(): string | undefined {
		const realeaseDate = scrapeGeneralInfo(this.$, "release");
		if (!realeaseDate) return;
		return realeaseDate;
	}

	private getRunningTime(): string | undefined {
		const runningTime = scrapeGeneralInfo(this.$, "runtime");
		if (!runningTime) return;
		return runningTime;
	}

	private getBoxOffice(): string | undefined {
		const boxOffice = scrapeGeneralInfo(this.$, "boxoffice");
		if (!boxOffice) return;
		return removeDollarAbbr(boxOffice);
	}
}
