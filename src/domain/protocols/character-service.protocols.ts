import { CreateCharacterOutputDTO } from "../dtos";

export namespace GetCharactersProtocols {
	export type Response = Promise<{
		items: CreateCharacterOutputDTO[];
		total: number;
	}>;
}

export namespace GetCharacterProtocols {
	export type Response = Promise<CreateCharacterOutputDTO>;
}
