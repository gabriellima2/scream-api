import {
	GetMoviesOutputDTO,
	GetMovieByNameInputDTO,
	GetMovieByNameOutputDTO,
} from "@/core/domain/dtos/movie.dto";

export interface MovieService {
	getMovies(): Promise<GetMoviesOutputDTO>;
	getMovieByName(
		params: GetMovieByNameInputDTO
	): Promise<GetMovieByNameOutputDTO>;
}
