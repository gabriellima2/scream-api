import { CheerioAPI, load } from "cheerio";
import { Injectable } from "@nestjs/common";

import { MovieScraperAdapter } from "@/adapters/scrapers/movie-scrapers-adapters/movie-scraper.adapter";
import { MovieScraperProtocols } from "@/core/domain/protocols/scrapers/movie-scrapers.protocol";

import { formatCharacterName } from "@/core/domain/functions/formatters/format-character-name";
import { removeDollarAbbr } from "@/core/domain/functions/formatters/remove-dollar-abbr";
import { createListFromString } from "@/core/domain/functions/create-list-from-string";
import { formatMovieName } from "@/core/domain/functions/formatters/format-movie-name";
import { removeBreakLine } from "@/core/domain/functions/formatters/remove-break-line";
import { createPathname } from "@/core/domain/functions/create-pathname";
import { createApiUrl } from "@/core/domain/functions/create-api-url";
import { arrayIsEmpty } from "@/core/domain/functions/array-is-empty";

import { scrapeGeneralInfo } from "@/infrastructure/helpers/scrape-general-info";

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
			const formattedCharacterName = formatCharacterName(characterName);
			const characterApiUrl = createApiUrl(
				"characters",
				createPathname(formattedCharacterName)
			);
			characters.push(characterApiUrl);
		});
		return arrayIsEmpty(characters) ? undefined : characters;
	}

	private getDirectors(): string[] | undefined {
		const director = scrapeGeneralInfo(this.$, "director");
		if (!director) return;
		const directors = createListFromString(director);
		return arrayIsEmpty(directors) ? undefined : directors;
	}

	private getWriters(): string[] | undefined {
		const writer = scrapeGeneralInfo(this.$, "writer");
		if (!writer) return;
		const writers = createListFromString(writer);
		return arrayIsEmpty(writers) ? undefined : writers;
	}

	private getProducers(): string[] | undefined {
		const producer = scrapeGeneralInfo(this.$, "producer");
		if (!producer) return;
		const producers = createListFromString(producer);
		return arrayIsEmpty(producers) ? undefined : producers;
	}

	private getComposer(): string[] | undefined {
		const composer = scrapeGeneralInfo(this.$, "composer");
		if (!composer) return;
		const composers = createListFromString(composer);
		return arrayIsEmpty(composers) ? undefined : composers;
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
