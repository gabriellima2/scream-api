import { GenericScrapingAdapter } from "./generic-scraping-adapter";
import { MovieScrapingProtocols } from "../protocols";

export interface MovieScrapingAdapter
	extends GenericScrapingAdapter<MovieScrapingProtocols.Response> {}
