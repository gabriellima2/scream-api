import { MovieData } from "@/core/domain/entities/movie-entity/movie.entity";

export type MockMovie = Required<MovieData>;

export const mockMovie = {
	id: "1",
	name: "Any_Name",
} as MockMovie;
