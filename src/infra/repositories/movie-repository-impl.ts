import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import {
	CreateMovieInputDTO,
	CreateMovieOutputDTO,
	FindMovieByNameInputDTO,
	FindMovieByNameOutputDTO,
} from "@/domain/dtos/movie-dtos";
import { MovieRepository } from "@/domain/repositories";
import { Movie } from "@/domain/entities";

import { MovieModel } from "../models";

@Injectable()
export class MovieRepositoryImpl implements MovieRepository {
	constructor(@InjectModel(MovieModel.name) private model: Model<MovieModel>) {}
	async create(data: CreateMovieInputDTO): Promise<CreateMovieOutputDTO> {
		const movie = await this.model.create(data);
		return Object.freeze({ ...movie, id: movie._id } as Movie);
	}
	async findByName(
		name: FindMovieByNameInputDTO
	): Promise<FindMovieByNameOutputDTO> {
		const movie = await this.model.findOne({ name }).exec();
		return Object.freeze(movie as Movie);
	}
}
