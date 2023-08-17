import { GenericMovieService } from "./generic-movie-service";
import { MovieServicesProtocols } from "@/domain/protocols";

export interface GetMoviesService
	extends GenericMovieService<MovieServicesProtocols.Response[]> {}
