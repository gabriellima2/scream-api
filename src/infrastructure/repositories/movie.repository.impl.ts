import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import {
	CreateMovieInputDTO,
	CreateMovieOutputDTO,
	GetMovieByNameInputDTO,
	GetMovieByNameOutputDTO,
	GetMoviesOutputDTO,
} from "@/core/domain/dtos/movie.dto";
import { MovieRepository } from "@/core/domain/repositories/movie.repository";

import { isEmptyArray } from "@/core/domain/functions/is-empty-array";
import { MovieModel } from "../models/movie.model";

@Injectable()
export class MovieRepositoryImpl implements MovieRepository {
	constructor(@InjectModel(MovieModel.name) private model: Model<MovieModel>) {}
	async getAll(): Promise<GetMoviesOutputDTO> {
		const movies = await this.model.find().lean().sort("name").exec();
		if (!movies || isEmptyArray(movies)) return null;
		return movies as GetMoviesOutputDTO;
	}
	async create(data: CreateMovieInputDTO): Promise<CreateMovieOutputDTO> {
		const movie = await new this.model(data).save();
		if (!movie) return null;
		return Object.freeze({
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
	async getByName(
		name: GetMovieByNameInputDTO
	): Promise<GetMovieByNameOutputDTO> {
		const movie = await this.model.findOne({ name });
		if (!movie) return null;
		return Object.freeze({
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
