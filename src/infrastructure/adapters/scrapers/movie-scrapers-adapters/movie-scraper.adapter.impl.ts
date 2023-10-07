import { CheerioAPI, load } from "cheerio";
import { Injectable } from "@nestjs/common";

import { MovieScraperAdapter } from "@/adapters/scrapers/movie-scrapers-adapters/movie-scraper.adapter";
import { MovieScraperProtocols } from "@/core/domain/protocols/scrapers/movie-scrapers.protocol";

import { transformStringIntoArray } from "@/core/domain/functions/transform-string-into-array";
import { isEmptyArray } from "@/core/domain/functions/is-empty-array";

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
		return name;
	}

	private getSynopsis(): string | undefined {
		const synopsis = this.$("#Synopsis").parent().next("p").text();
		if (!synopsis) return;
		return synopsis;
	}

	private getCharacters(): string[] | undefined {
		const characters: string[] = [];
		const container = this.$("#Main_Characters")
			.parent()
			.nextUntil("h2")
			.add(this.$("#Main_characters").parent().nextUntil("h2"));
		if (!container) return;
		container.each((_, el) => {
			const character = this.$("ul > li > a", el).eq(1).text();
			if (!character) return;
			characters.push(character);
		});
		return isEmptyArray(characters) ? undefined : characters;
	}

	private getDirectors(): string[] | undefined {
		const director = scrapeGeneralInfo(this.$, "director");
		if (!director) return;
		return transformStringIntoArray(director);
	}

	private getWriters(): string[] | undefined {
		const writer = scrapeGeneralInfo(this.$, "writer");
		if (!writer) return;
		return transformStringIntoArray(writer);
	}

	private getProducers(): string[] | undefined {
		const producer = scrapeGeneralInfo(this.$, "producer");
		if (!producer) return;
		return transformStringIntoArray(producer);
	}

	private getComposer(): string[] | undefined {
		const composer = scrapeGeneralInfo(this.$, "composer");
		if (!composer) return;
		return transformStringIntoArray(composer);
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
		return boxOffice;
	}
}
