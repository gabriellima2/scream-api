import { Movie } from "../entities";

export namespace MovieScraperProtocols {
	export type Response = Partial<Omit<Movie, "id">>;
}
