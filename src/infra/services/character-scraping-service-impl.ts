import { Injectable } from "@nestjs/common";

import { CharacterScrapingAdapter } from "@/domain/adapters";
import { CharacterScrapingService } from "@/domain/services";
import { EmptyDataError } from "@/domain/errors";
import { HttpClient } from "@/domain/gateways";
import { Character } from "@/domain/entities";

import { ObjectIsEmpty } from "@/domain/helpers/object-is-empty";

Injectable();
export class CharacterScrapingServiceImpl implements CharacterScrapingService {
	constructor(
		private readonly http: HttpClient,
		private readonly scraper: CharacterScrapingAdapter
	) {}

	async execute(url: string): Promise<Character> {
		const html = await this.http.getHtmlPage(url);
		if (!html) throw new EmptyDataError();
		const data = this.scraper.execute(html);
		if (ObjectIsEmpty(data)) throw new EmptyDataError();
		return { id: "1", ...data } as Character;
	}
}
