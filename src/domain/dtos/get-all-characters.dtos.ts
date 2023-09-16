import { Character } from "../entities";

export type GetAllCharactersInputDTO = {
	page: number;
	limit?: number;
};

export type GetAllCharactersOutputDTO = Character[];
