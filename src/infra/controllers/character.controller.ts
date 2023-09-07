import {
	Controller,
	Get,
	HttpCode,
	HttpException,
	Param,
} from "@nestjs/common";

import {
	GetCharacterProtocols,
	GetCharactersProtocols,
} from "@/domain/protocols";
import { CharacterService } from "../services";

import { handleError } from "@/domain/helpers/functions/handle-error";

@Controller()
export class CharacterController {
	constructor(private readonly service: CharacterService) {}

	@Get("/characters")
	@HttpCode(200)
	async getCharacters(): GetCharactersProtocols.Response {
		try {
			const response = await this.service.getCharacters();
			return response;
		} catch (err) {
			const error = handleError(err);
			throw new HttpException({ message: error.message }, error.statusCode);
		}
	}

	@Get("/characters/:name")
	@HttpCode(200)
	async getCharacter(
		@Param("name") name: string
	): GetCharacterProtocols.Response {
		try {
			const response = await this.service.getCharacter(name);
			return response;
		} catch (err) {
			const error = handleError(err);
			throw new HttpException({ message: error.message }, error.statusCode);
		}
	}
}
