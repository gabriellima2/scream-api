import { MovieServicesProtocols } from "@/domain/protocols/movie-services-protocols";

export interface GetMoviesService {
	execute(): Promise<MovieServicesProtocols.Response[]>;
}
