import { Movie } from "@/domain/entities";

export type CreateMovieInputDTO = Omit<Movie, "id">;
export type CreateMovieOutputDTO = Movie | null;
