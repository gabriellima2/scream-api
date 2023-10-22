import { Model } from "mongoose";

import { MovieRepositoryImpl } from "@/infrastructure/repositories/movie.repository.impl";
import { MovieModel } from "@/infrastructure/models/movie.model";

export const makeMovieRepositoryImpl = () => {
	const model = new Model<MovieModel>();
	return new MovieRepositoryImpl(model);
};
