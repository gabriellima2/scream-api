import { Injectable } from "@nestjs/common";

import { EmptyDataError, InvalidParamsError } from "@/domain/errors";
import { CreateMovieInputDTO } from "@/domain/dtos/movie-dtos";
import { MovieRepository } from "@/domain/repositories";
import { Scraping } from "@/domain/gateways";
import { Movie } from "@/domain/entities";

@Injectable()
export class MovieService {
	constructor(
		private readonly repository: MovieRepository,
		private readonly scraping: Scraping<Movie>,
		private readonly uri: string
	) {}

	async getMovies(names: string[]): Promise<Movie[]> {
		const promises = names.map(async (name) => {
			if (!name) throw new InvalidParamsError();
			const infoFromDB = await this.repository.findByName(name.toLowerCase());
			if (infoFromDB) return infoFromDB;
			const url = encodeURIComponent(`${this.uri}/${name}`);
			const info = await this.scraping.execute(url);
			if (!info) throw new EmptyDataError();
			return await this.repository.create(info as CreateMovieInputDTO);
		});
		const infos = await Promise.all(promises);
		return [...new Set(infos)];
	}

	async getMovie(name: string): Promise<Movie> {
		if (!name) throw new InvalidParamsError();
		const movieFromDB = await this.repository.findByName(name.toLowerCase());
		if (movieFromDB) return movieFromDB;
		const url = encodeURIComponent(`${this.uri}/${name}`);
		const movie = await this.scraping.execute(url);
		if (!movie) throw new EmptyDataError();
		return await this.repository.create(movie as CreateMovieInputDTO);
	}
}
