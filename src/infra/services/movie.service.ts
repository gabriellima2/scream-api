import { Injectable } from "@nestjs/common";

import { GetMovieProtocols, GetMoviesProtocols } from "@/domain/protocols";
import { EmptyDataError, InvalidParamsError } from "@/domain/errors";
import { CreateMovieInputDTO } from "@/domain/dtos/movie-dtos";
import { MovieRepository } from "@/domain/repositories";
import { Scraping } from "@/domain/gateways";
import { Movie } from "@/domain/entities";

import { MOVIE_NAMES } from "@/domain/constants/movie-names";

@Injectable()
export class MovieService {
	constructor(
		private readonly repository: MovieRepository,
		private readonly scraping: Scraping<Movie>,
		private readonly uri: string
	) {}

	async getMovies(): GetMoviesProtocols.Response {
		const promises = MOVIE_NAMES.map(async (movie) => {
			return await this.getMovie(movie);
		});
		const movies = await Promise.all(promises);
		return [...new Set(movies)];
	}

	async getMovie(name: string): GetMovieProtocols.Response {
		if (!name) throw new InvalidParamsError();
		const movieFromDB = await this.repository.findByName(name.toLowerCase());
		if (movieFromDB) return movieFromDB;
		const url = `${this.uri}/${name}`;
		const movie = await this.scraping.execute(url);
		if (!movie) throw new EmptyDataError();
		const createdMovie = await this.repository.create(
			movie as CreateMovieInputDTO
		);
		if (!createdMovie) throw new Error();
		return createdMovie;
	}
}
