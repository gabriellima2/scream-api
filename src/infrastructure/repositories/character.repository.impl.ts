import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import {
	GetCharactersOutputDTO,
	CreateCharacterInputDTO,
	CreateCharacterOutputDTO,
	GetCharacterByNameInputDTO,
	GetCharacterByNameOutputDTO,
} from "@/core/domain/dtos/character.dto";
import { CharacterRepository } from "@/core/domain/repositories/character.repository";

import { isEmptyArray } from "@/core/domain/functions/is-empty-array";
import { CharacterModel } from "../models/character.model";

@Injectable()
export class CharacterRepositoryImpl implements CharacterRepository {
	constructor(
		@InjectModel(CharacterModel.name) private model: Model<CharacterModel>
	) {}
	async getAll(): Promise<GetCharactersOutputDTO["items"]> {
		const characters = await this.model.find().lean().sort("name").exec();
		if (!characters || isEmptyArray(characters)) return null;
		return characters as GetCharactersOutputDTO["items"];
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
