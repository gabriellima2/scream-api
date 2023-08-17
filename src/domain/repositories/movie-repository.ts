import { Movie } from "../entities";

export interface MovieRepository {
	insert(data: Omit<Movie, "id">): Promise<Movie>;
	getByName(name: string): Promise<Movie>;
}
