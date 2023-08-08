import { MovieScrapingProtocols } from "../protocols";

export interface MovieScrapingAdapter {
	execute(html: string): MovieScrapingProtocols.Response;
}
