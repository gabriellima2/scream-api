import { GenericScrapingAdapter } from "./generic-scraping-adapter";
import { CharacterScrapingProtocols } from "../protocols";

export interface MovieScrapingAdapter
	extends GenericScrapingAdapter<CharacterScrapingProtocols.Response> {}
