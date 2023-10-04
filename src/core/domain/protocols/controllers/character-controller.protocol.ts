import { GetMovieByNameOutputDTO } from "../../dtos/movie.dto";
import { CharacterEntity } from "../../entities/character.entity";

export namespace CharacterControllerProtocol {
	export type GetCharactersResponse = {
		items: CharacterEntity[];
		total: number;
		next: string | undefined;
		last: string | undefined;
	};
	export type GetCharacterResponse = GetMovieByNameOutputDTO;
}
