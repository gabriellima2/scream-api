import { Movie } from "../entities";

export namespace MovieScrapingProtocols {
	export type Response = Omit<Movie, "id">;
}
