import { Movie } from "@/domain/entities";

export type FindMovieByNameInputDTO = string;
export type FindMovieByNameOutputDTO = Movie | null;
