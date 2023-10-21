import { Injectable } from "@nestjs/common";

import {
	MovieData,
	MovieEntity,
} from "@/core/domain/entities/movie-entity/movie.entity";
import { NameEntity } from "@/core/domain/entities/movie-entity/name.entity";
import { MovieService } from "@/core/application/services/movie.service";

import {
	GetMovieByNameInputDTO,
	GetMovieByNameOutputDTO,
	GetMoviesOutputDTO,
} from "@/core/domain/dtos/movie.dto";
import { InvalidParamsException } from "@/core/domain/exceptions/invalid-params.exception";
import { UnexpectedException } from "@/core/domain/exceptions/unexpected.exception";
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
		const promises = names.map((name) => {
			return this.getMovie(name);
		});
		const movies = await Promise.all(promises);
		return [...new Set(movies)];
	}

	async getMovie(
		name: GetMovieByNameInputDTO
	): Promise<GetMovieByNameOutputDTO> {
		if (!name && (name || name.length > 10)) throw new InvalidParamsException();
		const formattedName = NameEntity.create(name).value;
		const movieFromDB = await this.repository.getByName(formattedName);
		if (movieFromDB) return movieFromDB;
		const endpoint = createEndpointURL(this.baseUrl, formattedName);
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
		if (!createdMovie) throw new UnexpectedException();
		movieEntity.setId(createdMovie.id);
		return createdMovie;
	}
}
