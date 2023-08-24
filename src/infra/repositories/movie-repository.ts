import { ScreamInfoRepository } from "@/domain/repositories";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { MovieModel } from "../models";
import type { Movie } from "@/domain/entities";

export class MovieRepository implements ScreamInfoRepository<Movie> {
	constructor(@InjectModel(MovieModel.name) private model: Model<MovieModel>) {}
	async insert(data: Omit<Movie, "id">): Promise<Movie> {
		const movie = await this.model.create(data);
		return Object.freeze({ ...movie, id: movie._id } as Movie);
	}
	async getByName(name: string): Promise<Movie> {
		const movie = await this.model.findOne({ name }).exec();
		return Object.freeze(movie as Movie);
	}
}
