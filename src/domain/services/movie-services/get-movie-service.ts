import { MovieServicesProtocols } from "@/domain/protocols";

export interface GetMovieService {
	execute(
		baseUrl: string,
		movieName: string
	): Promise<MovieServicesProtocols.Response>;
}
