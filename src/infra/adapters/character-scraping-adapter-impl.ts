import { CheerioAPI, load } from "cheerio";

import { CharacterScrapingProtocols } from "@/domain/protocols";
import { CharacterScrapingAdapter } from "@/domain/adapters";
import { CharacterOverview } from "@/domain/entities";

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
		return "image";
	}

	private getName($: CheerioAPI): string | undefined {
		return "name";
	}

	private getDescription($: CheerioAPI): string | undefined {
		return "description";
	}

	private getOverview($: CheerioAPI): CharacterOverview | undefined {
		return {} as CharacterOverview;
	}

	private getAppearances($: CheerioAPI): string[] | undefined {
		return [""];
	}
}
