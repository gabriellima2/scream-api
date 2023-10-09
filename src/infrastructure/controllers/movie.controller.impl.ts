import {
	Controller,
	Get,
	HttpCode,
	HttpException,
	Param,
} from "@nestjs/common";

import { MovieControllerProtocol } from "@/core/domain/protocols/controllers/movie-controller.protocol";
import { MovieController } from "@/core/application/controllers/movie.controller";
import { MovieServiceImpl } from "../services/movie.service.impl";

import { handleException } from "@/core/domain/functions/handle-exception";

@Controller()
export class MovieControllerImpl implements MovieController {
	constructor(private readonly service: MovieServiceImpl) {}

	@Get("/movies")
	@HttpCode(200)
	async getMovies(): Promise<MovieControllerProtocol.GetMoviesResponse> {
		try {
			const response = await this.service.getMovies();
			return response;
		} catch (err) {
			const error = handleException(err);
			throw new HttpException({ message: error.message }, error.statusCode);
		}
	}

	@Get("/movies/:name")
	@HttpCode(200)
	async getMovie(
		@Param("name") name: string
	): Promise<MovieControllerProtocol.GetMovieResponse> {
		try {
			const response = await this.service.getMovie(name);
			return response;
		} catch (err) {
			const error = handleException(err);
			throw new HttpException({ message: error.message }, error.statusCode);
		}
	}
}
