import { GenericScrapingAdapter } from "./generic-scraping-adapter";
import { CharacterScrapingProtocols } from "../protocols";

export interface CharacterScrapingAdapter
	extends GenericScrapingAdapter<CharacterScrapingProtocols.Response> {}
