import {
	Controller,
	Get,
	HttpCode,
	HttpException,
	Param,
} from "@nestjs/common";

import { GetMovieProtocols, GetMoviesProtocols } from "@/domain/protocols";
import { MovieService } from "../services";

import { handleError } from "@/domain/helpers/functions/handle-error";

@Controller()
export class MovieController {
	constructor(private readonly service: MovieService) {}

	@Get("/movies")
	@HttpCode(200)
	async getMovies(): Promise<GetMoviesProtocols.Response> {
		try {
			const response = await this.service.getMovies();
			return response;
		} catch (err) {
			const error = handleError(err);
			throw new HttpException({ message: error.message }, error.statusCode);
		}
	}

	@Get("/movies/:name")
	@HttpCode(200)
	async getMovie(@Param("name") name: string): GetMovieProtocols.Response {
		try {
			const response = await this.service.getMovie(name);
			return response;
		} catch (err) {
			const error = handleError(err);
			throw new HttpException({ message: error.message }, error.statusCode);
		}
	}
}
