import { MovieEntity } from "../entities/movie.entity";

export type CreateMovieInputDTO = Omit<MovieEntity, "id">;
export type CreateMovieOutputDTO = MovieEntity | null;

export type GetMovieByNameInputDTO = string;
export type GetMovieByNameOutputDTO = MovieEntity | null;

export type GetMoviesOutputDTO = MovieEntity[];
