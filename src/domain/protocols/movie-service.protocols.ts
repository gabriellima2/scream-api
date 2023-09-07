import { CreateMovieOutputDTO } from "../dtos";

export namespace GetMoviesProtocols {
	export type Response = Promise<CreateMovieOutputDTO[]>;
}

export namespace GetMovieProtocols {
	export type Response = Promise<CreateMovieOutputDTO>;
}
