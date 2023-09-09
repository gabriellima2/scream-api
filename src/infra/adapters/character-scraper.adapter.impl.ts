import { CheerioAPI, load } from "cheerio";

import { CharacterScraperProtocols } from "@/domain/protocols";
import { CharacterScraperAdapter } from "@/domain/adapters";
import { CharacterStatus } from "@/domain/entities";

import { formatCharacterStatus } from "@/domain/helpers/functions/format-character-status";
import { createListFromString } from "@/domain/helpers/functions/create-list-from-string";
import { removeInvalidChars } from "@/domain/helpers/functions/remove-invalid-chars";
import { createApiParam } from "@/domain/helpers/functions/create-api-param";
import { createApiUrl } from "@/domain/helpers/functions/create-api-url";
import { scrapeGeneralInfo } from "@/domain/helpers/scraping";

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
		const appearances = [];
		const els = this.$("#Appearances").parent().next("ul");
		if (!els) return undefined;
		this.$("li", els).each((_, el) => {
			const appearance = this.$("li > i > a", el).text();
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
		return createListFromString(personality);
	}

	private getPortrayedBy(): string[] | undefined {
		const portrayedBy = scrapeGeneralInfo(this.$, "actors/actress");
		if (!portrayedBy) return;
		return createListFromString(portrayedBy);
	}
}
