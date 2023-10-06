import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import {
	GetCharactersInputDTO,
	GetCharactersOutputDTO,
	CreateCharacterInputDTO,
	CreateCharacterOutputDTO,
	InsertCharactersInputDTO,
	InsertCharactersOutputDTO,
	GetCharacterByNameInputDTO,
	GetCharacterByNameOutputDTO,
} from "@/core/domain/dtos/character.dto";
import { CharacterRepository } from "@/core/domain/repositories/character.repository";
import { CharacterEntity } from "@/core/domain/entities/character-entity/character.entity";

import { InvalidParamsException } from "@/core/domain/exceptions/invalid-params.exception";
import { isEmptyArray } from "@/core/domain/functions/is-empty-array";
import { CharacterModel } from "../models/character.model";

@Injectable()
export class CharacterRepositoryImpl implements CharacterRepository {
	constructor(
		@InjectModel(CharacterModel.name) private model: Model<CharacterModel>
	) {}
	async getAll(
		params?: GetCharactersInputDTO
	): Promise<GetCharactersOutputDTO["items"]> {
		let characters: CharacterEntity[];
		if (params) {
			if (isNaN(params.page) || isNaN(params.limit))
				throw new InvalidParamsException();
			const { page, limit } = params;
			const skip = (page - 1) * limit;
			characters = await this.model.find().skip(skip).limit(limit).lean();
		} else {
			characters = await this.model.find().lean();
		}
		if (!characters || isEmptyArray(characters)) return null;
		return characters;
	}

	async insert(
		data: InsertCharactersInputDTO
	): Promise<InsertCharactersOutputDTO> {
		const characters = await this.model.insertMany(data);
		if (!characters || isEmptyArray(characters)) return null;
		return characters.map((character) => ({
			id: character._id,
			name: character.name,
			description: character.description,
			image: character.image,
			appearances: character.appearances,
			born: character.born,
			personality: character.personality,
			portrayed_by: character.portrayed_by,
			status: character.status,
		})) as InsertCharactersOutputDTO;
	}
	async create(
		data: CreateCharacterInputDTO
	): Promise<CreateCharacterOutputDTO> {
		const character = await new this.model(data).save();
		if (!character) return null;
		return Object.freeze({
			id: character._id,
			name: character.name,
			description: character.description,
			image: character.image,
			appearances: character.appearances,
			born: character.born,
			personality: character.personality,
			portrayed_by: character.portrayed_by,
			status: character.status,
		});
	}
	async getByName(
		name: GetCharacterByNameInputDTO
	): Promise<GetCharacterByNameOutputDTO> {
		const character = await this.model.findOne({ name });
		if (!character) return null;
		return Object.freeze({
			id: character._id,
			name: character.name,
			description: character.description,
			image: character.image,
			appearances: character.appearances,
			born: character.born,
			personality: character.personality,
			portrayed_by: character.portrayed_by,
			status: character.status,
		});
	}
}
