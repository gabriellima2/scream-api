import { Controller, Get, Param } from "@nestjs/common";

import { GetMovieProtocols, GetMoviesProtocols } from "@/domain/protocols";
import { MovieService } from "../services";

@Controller()
export class MovieController {
	constructor(private readonly service: MovieService) {}

	@Get()
	getMovies(): GetMoviesProtocols.Response {
		return this.service.getMovies(["scream"]);
	}

	@Get(":name")
	getMovie(@Param("name") name: string): GetMovieProtocols.Response {
		return this.service.getMovie(name);
	}
}
