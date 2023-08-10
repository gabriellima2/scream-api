import { Character } from "../entities";

export interface CharacterScrapingAdapter {
	execute(html: string): Partial<Omit<Character, "id">>;
}
