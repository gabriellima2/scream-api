import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import {
	CreateMovieInputDTO,
	CreateMovieOutputDTO,
	FindMovieByNameInputDTO,
	FindMovieByNameOutputDTO,
	GetAllMoviesOutputDTO,
} from "@/domain/dtos";
import { MovieRepository } from "@/domain/repositories";
import { Movie } from "@/domain/entities";

import { MovieModel } from "../models";
import { arrayIsEmpty } from "@/domain/helpers/functions/array-is-empty";

@Injectable()
export class MovieRepositoryImpl implements MovieRepository {
	constructor(@InjectModel(MovieModel.name) private model: Model<MovieModel>) {}
	async getAll(): Promise<GetAllMoviesOutputDTO> {
		const movies = await this.model.find().lean().sort("name").exec();
		if (!movies || arrayIsEmpty(movies)) return null;
		return movies as GetAllMoviesOutputDTO;
	}
	async create(data: CreateMovieInputDTO): Promise<CreateMovieOutputDTO> {
		const movie = await new this.model(data).save();
		if (!movie) return null;
		return Object.freeze<Movie>({
			id: movie._id,
			name: movie.name,
			characters: movie.characters,
			image: movie.image,
			synopsis: movie.synopsis,
			producers: movie.producers,
			directors: movie.directors,
			writers: movie.writers,
			composer: movie.composer,
			box_office: movie.box_office,
			release_date: movie.release_date,
			running_time: movie.running_time,
		});
	}
	async findByName(
		name: FindMovieByNameInputDTO
	): Promise<FindMovieByNameOutputDTO> {
		const movie = await this.model.findOne({ name });
		if (!movie) return null;
		return Object.freeze<Movie>({
			id: movie._id,
			name: movie.name,
			characters: movie.characters,
			image: movie.image,
			synopsis: movie.synopsis,
			producers: movie.producers,
			directors: movie.directors,
			writers: movie.writers,
			composer: movie.composer,
			box_office: movie.box_office,
			release_date: movie.release_date,
			running_time: movie.running_time,
		});
	}
}
