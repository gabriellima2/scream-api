import {
	Controller,
	Get,
	HttpCode,
	HttpException,
	Param,
	Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CharacterControllerProtocol } from "@/core/domain/protocols/controllers/character-controller.protocol";
import { CharacterController } from "@/core/application/controllers/character.controller";
import { CharacterServiceImpl } from "../services/character.service.impl";

import { handleException } from "@/core/domain/functions/handle-exception";
import { createPaginationUrl } from "../helpers/create-pagination-url";
import { HttpStatusCode } from "@/core/domain/helpers/http-status-code";

import {
	getCharacterResponse,
	getCharactersResponse,
} from "../swagger/response/character.response";

@ApiTags("characters")
@Controller()
export class CharacterControllerImpl implements CharacterController {
	constructor(private readonly service: CharacterServiceImpl) {}

	@Get("/characters")
	@HttpCode(HttpStatusCode.ok)
	@ApiOperation({ summary: "Get all characters" })
	@ApiResponse(getCharactersResponse.notFound)
	@ApiResponse(getCharactersResponse.serverError)
	@ApiResponse(getCharactersResponse.success)
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
			const error = handleException(err);
			throw new HttpException({ message: error.message }, error.statusCode);
		}
	}

	@Get("/characters/:name")
	@HttpCode(HttpStatusCode.ok)
	@ApiOperation({ summary: "Get character by name" })
	@ApiResponse(getCharacterResponse.notFound)
	@ApiResponse(getCharacterResponse.serverError)
	@ApiResponse(getCharacterResponse.success)
	async getCharacter(
		@Param("name") name: string
	): Promise<CharacterControllerProtocol.GetCharacterResponse> {
		try {
			const response = await this.service.getCharacter(name);
			return response;
		} catch (err) {
			const error = handleException(err);
			throw new HttpException({ message: error.message }, error.statusCode);
		}
	}
}
