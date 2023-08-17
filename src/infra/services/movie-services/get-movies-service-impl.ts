import { Injectable } from "@nestjs/common";

import {
	MovieScrapingProtocols,
	MovieServicesProtocols,
} from "@/domain/protocols";
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
		url: string,
		movieNames: string[]
	): Promise<MovieServicesProtocols.Response[]> {
		const promises = movieNames.map(async (movieName) => {
			if (!movieName) throw new Error();
			const moviesFromDB = await this.repository.getByName(
				movieName.toLowerCase()
			);
			if (moviesFromDB) return moviesFromDB;
			const movie = await this.scraping.execute(`${url}/${movieName}`);
			if (!movie) throw new Error();
			return await this.repository.insert(movie as Omit<Movie, "id">);
		});
		const movies = await Promise.all(promises);
		return [...new Set(movies)];
	}
}
