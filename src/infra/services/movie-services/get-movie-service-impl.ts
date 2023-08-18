import { Injectable } from "@nestjs/common";

import {
	MovieScrapingProtocols,
	MovieServicesProtocols,
} from "@/domain/protocols";
import { EmptyDataError, InvalidParamsError } from "@/domain/errors";
import { MovieRepository } from "@/domain/repositories";
import { GetMovieService } from "@/domain/services";
import { Scraping } from "@/domain/gateways";
import { Movie } from "@/domain/entities";

@Injectable()
export class GetMovieServiceImpl implements GetMovieService {
	constructor(
		private readonly repository: MovieRepository,
		private readonly scraping: Scraping<MovieScrapingProtocols.Response>
	) {}

	async execute(
		baseUrl: string,
		movieName: string
	): Promise<MovieServicesProtocols.Response> {
		if (!movieName) throw new InvalidParamsError();
		const moviesFromDB = await this.repository.getByName(
			movieName.toLowerCase()
		);
		if (moviesFromDB) return moviesFromDB;
		const url = encodeURIComponent(`${baseUrl}/${movieName}`);
		const movie = await this.scraping.execute(url);
		if (!movie) throw new EmptyDataError();
		return await this.repository.insert(movie as Omit<Movie, "id">);
	}
}
