import { Injectable } from "@nestjs/common";

import {
	MovieScrapingProtocols,
	MovieServicesProtocols,
} from "@/domain/protocols";
import { EmptyDataError, InvalidParamsError } from "@/domain/errors";
import { MovieRepository } from "@/domain/repositories";
import { GetMoviesService } from "@/domain/services";
import { Scraping } from "@/domain/gateways";
import { Movie } from "@/domain/entities";

@Injectable()
export class GetMoviesServiceImpl implements GetMoviesService {
	constructor(
		private readonly repository: MovieRepository,
		private readonly scraping: Scraping<MovieScrapingProtocols.Response>
	) {}

	async execute(
		baseUrl: string,
		movieNames: string[]
	): Promise<MovieServicesProtocols.Response[]> {
		const promises = movieNames.map(async (movieName) => {
			if (!movieName) throw new InvalidParamsError();
			const moviesFromDB = await this.repository.getByName(
				movieName.toLowerCase()
			);
			if (moviesFromDB) return moviesFromDB;
			const url = encodeURIComponent(`${baseUrl}/${movieName}`);
			const movie = await this.scraping.execute(url);
			if (!movie) throw new EmptyDataError();
			return await this.repository.insert(movie as Omit<Movie, "id">);
		});
		const movies = await Promise.all(promises);
		return [...new Set(movies)];
	}
}
