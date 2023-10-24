import { model } from "mongoose";

import { MovieRepositoryImpl } from "@/infrastructure/repositories/movie.repository.impl";
import { MovieSchema } from "@/infrastructure/schemas/movie.schema";
import { MovieModel } from "@/infrastructure/models/movie.model";

export const makeMovieRepositoryImpl = () => {
	return new MovieRepositoryImpl(model(MovieModel.name, MovieSchema));
};
