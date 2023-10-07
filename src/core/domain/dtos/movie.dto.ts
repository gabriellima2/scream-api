import { MovieData } from "../entities/movie-entity/movie.entity";

export type CreateMovieInputDTO = Omit<MovieData, "id">;
export type CreateMovieOutputDTO = Required<MovieData> | null;

export type GetMovieByNameInputDTO = string;
export type GetMovieByNameOutputDTO = Required<MovieData> | null;

export type GetMoviesOutputDTO = Required<MovieData>[];
