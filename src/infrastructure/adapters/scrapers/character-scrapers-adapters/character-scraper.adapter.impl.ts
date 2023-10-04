import { CheerioAPI, load } from "cheerio";

import { CharacterScraperAdapter } from "@/adapters/scrapers/character-scrapers-adapters/character-scraper.adapter";
import { CharacterScraperProtocols } from "@/core/domain/protocols/scrapers/character-scrapers.protocol";
import { CharacterStatus } from "@/core/domain/entities/character.entity";

import { formatCharacterStatus } from "@/core/domain/functions/formatters/format-character-status";
import { removeInvalidChars } from "@/core/domain/functions/formatters/remove-invalid-chars";
import { createListFromString } from "@/core/domain/functions/create-list-from-string";
import { createPathname } from "@/core/domain/functions/create-pathname";
import { createApiUrl } from "@/core/domain/functions/create-api-url";
import { arrayIsEmpty } from "@/core/domain/functions/array-is-empty";

import { scrapeGeneralInfo } from "@/infrastructure/helpers/scrape-general-info";

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
		return this.$("figure > a > img").attr("src");
	}

	private getName(): string | undefined {
		const name = this.$("#firstHeading > i")
			.add(this.$("#firstHeading"))
			.first()
			.text();
		if (!name) return undefined;
		return removeInvalidChars(name);
	}

	private getDescription(): string | undefined {
		const paragraphs = this.$(".mw-parser-output > p");
		const description = paragraphs
			.filter((_, el) => this.$(el).text().trim().length > 100)
			.first()
			.text();
		if (!description) return undefined;
		return removeInvalidChars(description);
	}

	private getAppearances(): string[] | undefined {
		const appearances: string[] = [];
		const els = this.$("#Appearances").parent().next("ul");
		if (!els) return undefined;
		this.$("li", els).each((_, el) => {
			const appearance = this.$("li > i > a", el).text();
			if (!appearance) return;
			const appearanceApiUrl = createApiUrl(
				"movies",
				createPathname(appearance)
			);
			appearances.push(appearanceApiUrl);
		});
		return arrayIsEmpty(appearances) ? undefined : appearances;
	}

	private getBorn(): string | undefined {
		const born = scrapeGeneralInfo(this.$, "born");
		if (!born) return;
		return born;
	}

	private getStatus(): CharacterStatus | undefined {
		const status = scrapeGeneralInfo(this.$, "status");
		if (!status) return;
		return formatCharacterStatus(status);
	}

	private getPersonality(): string[] | undefined {
		const personality = scrapeGeneralInfo(this.$, "personality");
		if (!personality) return;
		const personalities = createListFromString(personality);
		return arrayIsEmpty(personalities) ? undefined : personalities;
	}

	private getPortrayedBy(): string[] | undefined {
		const portrayedBy = scrapeGeneralInfo(this.$, "actors/actress");
		if (!portrayedBy) return;
		const actorsAndActress = createListFromString(portrayedBy);
		return arrayIsEmpty(actorsAndActress) ? undefined : actorsAndActress;
	}
}
