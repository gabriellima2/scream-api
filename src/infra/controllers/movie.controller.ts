import {
	Controller,
	Get,
	HttpCode,
	HttpException,
	Param,
} from "@nestjs/common";

import { GetMoviesProtocols } from "@/domain/protocols";
import { MovieService } from "../services";

import { DEFAULT_ERROR } from "@/domain/helpers/default-error";

@Controller()
export class MovieController {
	constructor(private readonly service: MovieService) {}

	@Get("/movies")
	getMovies(): GetMoviesProtocols.Response {
		return this.service.getMovies(["scream"]);
	}

	@Get("/movies/:name")
	@HttpCode(200)
	async getMovie(@Param("name") name: string) {
		try {
			const response = await this.service.getMovie(name);
			return response;
		} catch (err) {
			throw new HttpException(
				{
					message: (err as Error).message || DEFAULT_ERROR.message,
				},
				err.statusCode || DEFAULT_ERROR.statusCode
			);
		}
	}
}
