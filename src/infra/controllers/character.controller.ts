import {
	Controller,
	Get,
	HttpCode,
	HttpException,
	Param,
	Query,
} from "@nestjs/common";

import { GetCharacterProtocols } from "@/domain/protocols";
import { CharacterService } from "../services";

import { handleError } from "@/domain/helpers/functions/handle-error";
import { createApiUrl } from "@/domain/helpers/functions/create-api-url";

@Controller()
export class CharacterController {
	constructor(private readonly service: CharacterService) {}

	@Get("/characters")
	@HttpCode(200)
	async getCharacters(
		@Query("page") page?: string,
		@Query("limit") limit?: string
	) {
		try {
			const response = await this.service.getCharacters(page, limit);
			const url = createApiUrl("characters");
			return {
				total: response.total,
				items: response.items,
				next:
					response.currentPage < response.totalPages
						? url + `?page=${response.currentPage + 1}&limit=${response.total}`
						: undefined,
				last:
					response.currentPage > 1
						? url + `?page=${response.currentPage - 1}&limit=${response.total}`
						: undefined,
			};
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
