import { Injectable } from "@nestjs/common";

import { GetMovieProtocols, GetMoviesProtocols } from "@/domain/protocols";
import { EmptyDataError, InvalidParamsError } from "@/domain/errors";
import { MovieScrapersAdapter } from "@/domain/adapters";
import { MovieRepository } from "@/domain/repositories";
import { CreateMovieInputDTO } from "@/domain/dtos";

import { createApiParam } from "@/domain/helpers/functions/create-api-param";

@Injectable()
export class MovieService {
	constructor(
		private readonly repository: MovieRepository,
		private readonly scrapers: MovieScrapersAdapter,
		private readonly baseUrl: string
	) {}

	async getMovies(): GetMoviesProtocols.Response {
		const url = `${this.baseUrl}/Category:Film`;
		const names = await this.scrapers.names.execute(url);
		if (!names) throw new EmptyDataError();
		const promises = names.map(async (name) => {
			return await this.getMovie(name);
		});
		const movies = await Promise.all(promises);
		return [...new Set(movies)];
	}

	async getMovie(name: string): GetMovieProtocols.Response {
		if (!name) throw new InvalidParamsError();
		const movieFromDB = await this.repository.findByName(name);
		if (movieFromDB) return movieFromDB;
		const url = `${this.baseUrl}/${createApiParam(name)}`;
		const movie = await this.scrapers.movie.execute(url);
		if (!movie) throw new EmptyDataError();
		const createdMovie = await this.repository.create(
			movie as CreateMovieInputDTO
		);
		if (!createdMovie) throw new Error();
		return createdMovie;
	}
}
