import { MovieScrappingProtocols } from "../protocols";

export interface MovieScrappingAdapter {
	execute(html: string): MovieScrappingProtocols.Response;
}
