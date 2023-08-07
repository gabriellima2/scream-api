import { MovieScrapingProtocols } from "../protocols";

export interface MovieScrappingAdapter {
	execute(html: string): MovieScrapingProtocols.Response;
}
