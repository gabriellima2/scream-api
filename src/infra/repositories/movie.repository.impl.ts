import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import {
	CreateMovieInputDTO,
	CreateMovieOutputDTO,
	FindMovieByNameInputDTO,
	FindMovieByNameOutputDTO,
} from "@/domain/dtos";
import { MovieRepository } from "@/domain/repositories";
import { Movie } from "@/domain/entities";

import { MovieModel } from "../models";

@Injectable()
export class MovieRepositoryImpl implements MovieRepository {
	constructor(@InjectModel(MovieModel.name) private model: Model<MovieModel>) {}
	async create(data: CreateMovieInputDTO): Promise<CreateMovieOutputDTO> {
		const movie = await new this.model(data).save();
		if (!movie) return null;
		return Object.freeze<Movie>({
			id: movie._id,
			name: movie.name,
			characters: movie.characters,
			image: movie.image,
			synopsis: movie.synopsis,
			overview: movie.overview,
		});
	}
	async findByName(
		name: FindMovieByNameInputDTO
	): Promise<FindMovieByNameOutputDTO> {
		const movie = await this.model.findOne({
			name: { $regex: new RegExp(name.replace(/_/g, " "), "i") },
		});
		if (!movie) return null;
		return Object.freeze<Movie>({
			id: movie._id,
			name: movie.name,
			characters: movie.characters,
			image: movie.image,
			synopsis: movie.synopsis,
			overview: movie.overview,
		});
	}
}
