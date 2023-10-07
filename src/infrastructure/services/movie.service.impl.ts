import { Injectable } from "@nestjs/common";

import { MovieService } from "@/core/application/services/movie.service";

import {
	CreateMovieInputDTO,
	GetMovieByNameInputDTO,
	GetMovieByNameOutputDTO,
	GetMoviesOutputDTO,
} from "@/core/domain/dtos/movie.dto";
import { InvalidParamsException } from "@/core/domain/exceptions/invalid-params.exception";
import { EmptyDataException } from "@/core/domain/exceptions/empty-data.exception";
import { MovieScraperGateways } from "@/adapters/gateways/movie-scraper-gateways";
import { MovieRepository } from "@/core/domain/repositories/movie.repository";

import { createEndpointURL } from "../helpers/create-endpoint-url";

@Injectable()
export class MovieServiceImpl implements MovieService {
	constructor(
		private readonly repository: MovieRepository,
		private readonly scrapers: MovieScraperGateways,
		private readonly baseUrl: string
	) {}

	async getMovies(): Promise<GetMoviesOutputDTO> {
		const moviesFromDB = await this.repository.getAll();
		if (moviesFromDB) return moviesFromDB;
		const url = `${this.baseUrl}/Category:Film`;
		const names = await this.scrapers.names.execute(url);
		if (!names) throw new EmptyDataException();
		const promises = names.map(async (name) => {
			return await this.getMovie(name);
		});
		const movies = await Promise.all(promises);
		return [...new Set(movies)];
	}

	async getMovie(
		name: GetMovieByNameInputDTO
	): Promise<GetMovieByNameOutputDTO> {
		if (!name) throw new InvalidParamsException();
		const movieFromDB = await this.repository.getByName(name);
		if (movieFromDB) return movieFromDB;
		const endpoint = createEndpointURL(this.baseUrl, name);
		const movie = await this.scrapers.movie.execute(endpoint);
		if (!movie) throw new EmptyDataException();
		const createdMovie = await this.repository.create(
			movie as CreateMovieInputDTO
		);
		if (!createdMovie) throw new Error();
		return createdMovie;
	}
}
