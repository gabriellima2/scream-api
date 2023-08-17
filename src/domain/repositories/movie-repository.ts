import { Movie } from "../entities";

export interface MovieRepository {
	insert(data: Omit<Movie, "id">): Promise<Movie>;
	findByName(name: string): Promise<Movie>;
}
