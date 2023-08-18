import { MovieServicesProtocols } from "@/domain/protocols";

export interface GetMoviesService {
	execute(
		baseUrl: string,
		movieNames: string[]
	): Promise<MovieServicesProtocols.Response[]>;
}
