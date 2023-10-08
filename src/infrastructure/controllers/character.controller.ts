import {
	Controller,
	Get,
	HttpCode,
	HttpException,
	Param,
	Query,
} from "@nestjs/common";

import { CharacterControllerProtocol } from "@/core/domain/protocols/controllers/character-controller.protocol";
import { CharacterController } from "@/core/application/controllers/character.controller";
import { CharacterServiceImpl } from "../services/character.service.impl";

import { createPaginationUrl } from "../helpers/create-pagination-url";
import { handleError } from "@/core/domain/functions/handle-error";

@Controller()
export class CharacterControllerImpl implements CharacterController {
	constructor(private readonly service: CharacterServiceImpl) {}

	@Get("/characters")
	@HttpCode(200)
	async getCharacters(
		@Query("page") page?: string,
		@Query("limit") limit?: string
	): Promise<CharacterControllerProtocol.GetCharactersResponse> {
		try {
			const response = await this.service.getCharacters(
				page && {
					page: Number(page),
					limit: Number(limit),
				}
			);
			const { next, last } = createPaginationUrl("characters", {
				page: response.currentPage,
				limit: response.total,
			});
			const hasNextPage = response.currentPage < response.totalPages;
			const hasLastPage = response.currentPage > 1;
			return {
				total: response.total,
				items: response.items,
				next: hasNextPage ? next : undefined,
				last: hasLastPage ? last : undefined,
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
	): Promise<CharacterControllerProtocol.GetCharacterResponse> {
		try {
			const response = await this.service.getCharacter(name);
			return response;
		} catch (err) {
			const error = handleError(err);
			throw new HttpException({ message: error.message }, error.statusCode);
		}
	}
}
