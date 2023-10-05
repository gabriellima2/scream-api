import { CheerioAPI, load } from "cheerio";

import { CharacterScraperAdapter } from "@/adapters/scrapers/character-scrapers-adapters/character-scraper.adapter";
import { CharacterScraperProtocols } from "@/core/domain/protocols/scrapers/character-scrapers.protocol";

import { scrapeGeneralInfo } from "@/infrastructure/helpers/scrape-general-info";
import { CharacterStatus } from "@/core/domain/entities/character-entity/status.entity";
import { createListFromString } from "@/core/domain/functions/create-list-from-string";

export class CharacterScraperAdapterImpl implements CharacterScraperAdapter {
	private $: CheerioAPI;
	constructor() {
		this.$;
	}

	execute(html: string): CharacterScraperProtocols.Response {
		this.$ = load(html);
		return {
			name: this.getName(),
			image: this.getImage(),
			description: this.getDescription(),
			appearances: this.getAppearances(),
			born: this.getBorn(),
			personality: this.getPersonality(),
			portrayed_by: this.getPortrayedBy(),
			status: this.getStatus(),
		};
	}

	private getImage(): string | undefined {
		const image = this.$("figure > a > img").attr("src");
		if (!image) return;
		return image;
	}

	private getName(): string | undefined {
		const name = this.$("#firstHeading > i")
			.add(this.$("#firstHeading"))
			.first()
			.text();
		if (!name) return;
		return name;
	}

	private getDescription(): string | undefined {
		const paragraphs = this.$(".mw-parser-output > p");
		const description = paragraphs
			.filter((_, el) => this.$(el).text().trim().length > 100)
			.first()
			.text();
		if (!description) return;
		return description;
	}

	private getAppearances(): string[] | undefined {
		const appearances: string[] = [];
		const els = this.$("#Appearances").parent().next("ul");
		if (!els) return undefined;
		this.$("li", els).each((_, el) => {
			const appearance = this.$("li > i > a", el).text();
			if (!appearance) return;
			appearances.push(appearance);
		});
		return appearances;
	}

	private getBorn(): string | undefined {
		const born = scrapeGeneralInfo(this.$, "born");
		if (!born) return;
		return born;
	}

	private getStatus(): CharacterStatus | undefined {
		const status = scrapeGeneralInfo(this.$, "status");
		if (!status) return;
		return status as CharacterStatus;
	}

	private getPersonality(): string[] | undefined {
		const personality = scrapeGeneralInfo(this.$, "personality");
		if (!personality) return;
		return createListFromString(personality);
	}

	private getPortrayedBy(): string[] | undefined {
		const portrayedBy = scrapeGeneralInfo(this.$, "actors/actress");
		if (!portrayedBy) return;
		return createListFromString(portrayedBy);
	}
}
