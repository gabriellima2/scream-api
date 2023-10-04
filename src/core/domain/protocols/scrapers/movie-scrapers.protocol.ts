import { MovieEntity } from "../../entities/movie.entity";
import { NameEntity } from "../../entities/name.entity";

export namespace MovieScraperProtocols {
	export type Response = Partial<Omit<MovieEntity, "id">>;
}

export namespace MoviesNameScraperProtocols {
	export type Response = NameEntity[] | undefined;
}
