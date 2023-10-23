import { MovieData } from "../../entities/movie-entity/movie.entity";
import { NameEntity } from "../../entities/name.entity";

export namespace MovieScraperProtocols {
	export type Response = Omit<MovieData, "id">;
}

export namespace MoviesNameScraperProtocols {
	export type Response = NameEntity[] | undefined;
}
