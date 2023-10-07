import { Injectable } from "@nestjs/common";

import {
	MovieData,
	MovieEntity,
} from "@/core/domain/entities/movie-entity/movie.entity";
import { MovieService } from "@/core/application/services/movie.service";

import {
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
		const movieScraped = await this.scrapers.movie.execute(endpoint);
		if (!movieScraped) throw new EmptyDataException();
		const movieEntity = MovieEntity.create(movieScraped);
		const movie: MovieData = {
			name: movieEntity.name,
			image: movieEntity.image,
			synopsis: movieEntity.synopsis,
			composer: movieEntity.composer,
			characters: movieEntity.characters,
			directors: movieEntity.directors,
			producers: movieEntity.producers,
			writers: movieEntity.writers,
			box_office: movieEntity.boxOffice,
			release_date: movieEntity.releaseDate,
			running_time: movieEntity.runningTime,
		};
		const createdMovie = await this.repository.create(movie);
		if (!createdMovie) throw new Error();
		movieEntity.setId(createdMovie.id);
		if (!createdMovie) throw new Error();

		return createdMovie;
	}
}
