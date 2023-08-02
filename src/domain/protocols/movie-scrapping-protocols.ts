import { Movie } from "../entities";

export namespace MovieScrappingProtocols {
	export type Response = Omit<Movie, "id">;
}
