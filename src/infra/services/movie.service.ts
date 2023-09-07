import { Injectable } from "@nestjs/common";

import { GetMovieProtocols, GetMoviesProtocols } from "@/domain/protocols";
import { EmptyDataError, InvalidParamsError } from "@/domain/errors";
import { MovieRepository } from "@/domain/repositories";
import { CreateMovieInputDTO } from "@/domain/dtos";
import { ScraperGateway } from "@/domain/gateways";
import { Movie } from "@/domain/entities";

import { removeInvalidChars } from "@/domain/helpers/functions/remove-invalid-chars";
import { MOVIE_NAMES } from "@/domain/constants/movie-names";

@Injectable()
export class MovieService {
	constructor(
		private readonly repository: MovieRepository,
		private readonly scraper: ScraperGateway<Movie>,
		private readonly uri: string
	) {}

	async getMovies(): GetMoviesProtocols.Response {
		const promises = MOVIE_NAMES.map(async (movie) => {
			return await this.getMovie(removeInvalidChars(movie));
		});
		const movies = await Promise.all(promises);
		return [...new Set(movies)];
	}

	async getMovie(name: string): GetMovieProtocols.Response {
		if (!name) throw new InvalidParamsError();
		const movieFromDB = await this.repository.findByName(name.toLowerCase());
		if (movieFromDB) return movieFromDB;
		const url = `${this.uri}/${name}`;
		const movie = await this.scraper.execute(url);
		if (!movie) throw new EmptyDataError();
		const createdMovie = await this.repository.create(
			movie as CreateMovieInputDTO
		);
		if (!createdMovie) throw new Error();
		return createdMovie;
	}
}
