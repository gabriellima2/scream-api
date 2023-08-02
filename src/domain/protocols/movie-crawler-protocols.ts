import { Movie } from "../entities/movie";

export namespace MovieCrawlerProtocols {
	export type Response = Omit<Movie, "id">;
}
