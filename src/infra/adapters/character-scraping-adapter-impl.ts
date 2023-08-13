import { CheerioAPI, load } from "cheerio";

import { CharacterScrapingProtocols } from "@/domain/protocols";
import { CharacterScrapingAdapter } from "@/domain/adapters";
import { CharacterOverview } from "@/domain/entities";

import { removeInvalidChars } from "../helpers/remove-invalid-chars";
import { createApiParam } from "../helpers/create-api-param";
import { createApiUrl } from "../helpers/create-api-url";

export class CharacterScrapingAdapterImpl implements CharacterScrapingAdapter {
	execute(html: string): CharacterScrapingProtocols.Response {
		const $ = load(html);
		return {
			name: this.getName($),
			image: this.getImage($),
			description: this.getDescription($),
			overview: this.getOverview($),
			appearances: this.getAppearances($),
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

	private getDescription($: CheerioAPI): string | undefined {
		const paragraphs = $(".mw-parser-output > p");
		const description = paragraphs
			.filter((_, el) => $(el).text().trim().length > 0)
			.first()
			.text();
		if (!description) return undefined;
		return removeInvalidChars(description);
	}

	private getOverview($: CheerioAPI): CharacterOverview | undefined {
		return {} as CharacterOverview;
	}

	private getAppearances($: CheerioAPI): string[] | undefined {
		const appearances = [];
		const container = $("#Appearances").parent().next("ul");
		if (!container) return undefined;
		$("li", container).each((_, el) => {
			const appearance = $("li > i > a", el).text();
			if (!appearance) return;
			const appearanceApiUrl = createApiUrl("movies", createApiParam(appearance));
			appearances.push(appearanceApiUrl);
		});
		if (appearances.length <= 0) return undefined;
		return appearances;
	}
}
