import {
	CreateMovieInputDTO,
	CreateMovieOutputDTO,
	GetAllMoviesOutputDTO,
	FindMovieByNameInputDTO,
	FindMovieByNameOutputDTO,
} from "../dtos";

export interface MovieRepository {
	create(data: CreateMovieInputDTO): Promise<CreateMovieOutputDTO>;
	findByName(name: FindMovieByNameInputDTO): Promise<FindMovieByNameOutputDTO>;
	getAll(): Promise<GetAllMoviesOutputDTO>;
}
