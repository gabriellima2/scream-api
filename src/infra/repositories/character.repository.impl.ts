import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import {
	CreateCharacterInputDTO,
	CreateCharacterOutputDTO,
	FindCharacterByNameInputDTO,
	FindCharacterByNameOutputDTO,
	GetAllCharactersInputDTO,
	GetAllCharactersOutputDTO,
	InsertManyCharactersInputDTO,
	InsertManyCharactersOutputDTO,
} from "@/domain/dtos";
import { CharacterRepository } from "@/domain/repositories";
import { InvalidParamsError } from "@/domain/errors";
import { Character } from "@/domain/entities";

import { CharacterModel } from "../models";
import { arrayIsEmpty } from "@/domain/helpers/functions/array-is-empty";

@Injectable()
export class CharacterRepositoryImpl implements CharacterRepository {
	constructor(
		@InjectModel(CharacterModel.name) private model: Model<CharacterModel>
	) {}
	async getAll(
		params?: GetAllCharactersInputDTO
	): Promise<GetAllCharactersOutputDTO> {
		let characters: GetAllCharactersOutputDTO;
		if (params) {
			if (isNaN(params.page) || isNaN(params.limit))
				throw new InvalidParamsError();
			const limit = params.limit ?? 30;
			const skip = (params.page - 1) * limit;
			characters = await this.model.find().skip(skip).limit(limit).lean();
		} else {
			characters = await this.model.find().lean();
		}
		if (!characters || arrayIsEmpty(characters)) return null;
		return characters;
	}
	async insertMany(
		data: InsertManyCharactersInputDTO
	): Promise<InsertManyCharactersOutputDTO> {
		const characters = await this.model.insertMany(data);
		if (!characters || arrayIsEmpty(characters)) return null;
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
		})) as InsertManyCharactersOutputDTO;
	}
	async create(
		data: CreateCharacterInputDTO
	): Promise<CreateCharacterOutputDTO> {
		const character = await new this.model(data).save();
		if (!character) return null;
		return Object.freeze<Character>({
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
	async findByName(
		name: FindCharacterByNameInputDTO
	): Promise<FindCharacterByNameOutputDTO> {
		const character = await this.model.findOne({ name });
		if (!character) return null;
		return Object.freeze<Character>({
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
