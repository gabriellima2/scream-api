import * as DTO from "../dtos/movie.dto";

export interface MovieRepository {
	create(data: DTO.CreateMovieInputDTO): Promise<DTO.CreateMovieOutputDTO>;
	findByName(
		name: DTO.FindMovieByNameInputDTO
	): Promise<DTO.FindMovieByNameOutputDTO>;
	getAll(): Promise<DTO.GetAllMoviesOutputDTO>;
}
