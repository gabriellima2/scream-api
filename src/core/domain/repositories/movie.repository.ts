import * as DTO from "../dtos/movie.dto";

export interface MovieRepository {
	create(data: DTO.CreateMovieInputDTO): Promise<DTO.CreateMovieOutputDTO>;
	getByName(
		name: DTO.GetMovieByNameInputDTO
	): Promise<DTO.GetMovieByNameOutputDTO>;
	getAll(): Promise<DTO.GetMoviesOutputDTO>;
}
