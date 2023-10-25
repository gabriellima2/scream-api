import { Injectable } from "@nestjs/common";

import {
	MovieData,
	MovieEntity,
} from "@/core/domain/entities/movie-entity/movie.entity";
import { NameEntity } from "@/core/domain/entities/movie-entity/name.entity";
import { MovieService } from "@/core/application/services/movie.service";
import { CacheAdapter } from "@/adapters/cache.adapter";

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
import { isEmptyObject } from "@/core/domain/functions/is-empty-object";

export interface MovieServiceOptions {
	readonly baseUrl: string;
	readonly cache: CacheAdapter<GetMovieByNameOutputDTO>;
}

@Injectable()
export class MovieServiceImpl implements MovieService {
	constructor(
		private readonly repository: MovieRepository,
		private readonly scrapers: MovieScraperGateways,
		private readonly options: MovieServiceOptions
	) {}

	async getMovies(): Promise<GetMoviesOutputDTO> {
		const db = await this.repository.getAll();
		if (db) return db;
		const url = `${this.options.baseUrl}/Category:Film`;
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
		const cachedMovie = this.options.cache.get(name);
		const hasCachedMovie = !!cachedMovie && !isEmptyObject(cachedMovie);
		if (hasCachedMovie) return cachedMovie;
		const db = await this.repository.getByName(formattedName);
		if (db) {
			if (!hasCachedMovie) {
				this.options.cache.insert(name, db);
			}
			return db;
		}
		const endpoint = createEndpointURL(this.options.baseUrl, formattedName);
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
		const movieWithId = { ...movie, id: movieEntity.id };
		if (!hasCachedMovie) {
			this.options.cache.insert(name, movieWithId);
		}
		return movieWithId;
	}
}
