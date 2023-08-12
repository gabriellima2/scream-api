import { Movie } from "../entities";

export namespace MovieScrapingProtocols {
	export type Response = Partial<Omit<Movie, "id">>;
}
