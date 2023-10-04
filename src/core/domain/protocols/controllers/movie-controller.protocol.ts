import {
	GetMovieByNameOutputDTO,
	GetMoviesOutputDTO,
} from "../../dtos/movie.dto";

export namespace MovieControllerProtocol {
	export type GetMoviesResponse = GetMoviesOutputDTO;
	export type GetMovieResponse = GetMovieByNameOutputDTO;
}
