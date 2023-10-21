import {
	Controller,
	Get,
	HttpCode,
	HttpException,
	Param,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { MovieControllerProtocol } from "@/core/domain/protocols/controllers/movie-controller.protocol";
import { MovieController } from "@/core/application/controllers/movie.controller";
import { MovieServiceImpl } from "../services/movie.service.impl";

import { handleException } from "@/core/domain/functions/handle-exception";

import {
	getMovieResponse,
	getMoviesResponse,
} from "../swagger/response/movie.response";

@ApiTags("movies")
@Controller()
export class MovieControllerImpl implements MovieController {
	constructor(private readonly service: MovieServiceImpl) {}

	@Get("/movies")
	@HttpCode(200)
	@ApiOperation({ summary: "Get all movies" })
	@ApiResponse(getMoviesResponse.notFound)
	@ApiResponse(getMoviesResponse.serverError)
	@ApiResponse(getMoviesResponse.success)
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
	@ApiOperation({ summary: "Get movie by name" })
	@ApiResponse(getMovieResponse.notFound)
	@ApiResponse(getMovieResponse.serverError)
	@ApiResponse(getMovieResponse.success)
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
