import { ScreamInfoRepository } from "@/domain/repositories";
import { MovieModel } from "../models/movie-model";
import { Movie } from "@/domain/entities";

export class MovieRepository implements ScreamInfoRepository<Movie> {
	async insert(data: Omit<Movie, "id">): Promise<Movie> {
		const movie = await MovieModel.create<Movie>(data);
		return Object.freeze({ ...movie, id: movie._id.toString() });
	}
	async getByName(name: string): Promise<Movie> {
		const movie = await MovieModel.findOne<Movie>({ name });
		return Object.freeze(movie);
	}
}
