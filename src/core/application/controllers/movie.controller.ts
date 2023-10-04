import { MovieControllerProtocol } from "@/core/domain/protocols/controllers/movie-controller.protocol";

export interface MovieController {
	getMovies(): Promise<MovieControllerProtocol.GetMoviesResponse>;
	getMovie(name: string): Promise<MovieControllerProtocol.GetMovieResponse>;
}
