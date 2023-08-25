import {
	CreateMovieInputDTO,
	CreateMovieOutputDTO,
} from "../dtos/movie-dtos/create-movie-dtos";
import {
	FindMovieByNameInputDTO,
	FindMovieByNameOutputDTO,
} from "../dtos/movie-dtos/find-movie-by-name-dtos";

export interface MovieRepository {
	create(data: CreateMovieInputDTO): Promise<CreateMovieOutputDTO>;
	findByName(name: FindMovieByNameInputDTO): Promise<FindMovieByNameOutputDTO>;
}
