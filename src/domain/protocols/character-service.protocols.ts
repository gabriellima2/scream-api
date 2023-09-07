import { CreateCharacterOutputDTO } from "../dtos/character-dtos";

export namespace GetCharactersProtocols {
	export type Response = Promise<CreateCharacterOutputDTO[]>;
}

export namespace GetCharacterProtocols {
	export type Response = Promise<CreateCharacterOutputDTO>;
}
