import { Movie } from "../entities";

export interface MovieScrapingAdapter {
	execute(html: string): Partial<Omit<Movie, "id">>;
}
