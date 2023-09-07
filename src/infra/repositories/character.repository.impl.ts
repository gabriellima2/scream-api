import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import {
	CreateCharacterInputDTO,
	CreateCharacterOutputDTO,
	FindCharacterByNameInputDTO,
	FindCharacterByNameOutputDTO,
} from "@/domain/dtos";
import { CharacterRepository } from "@/domain/repositories";
import { Character } from "@/domain/entities";

import { CharacterModel } from "../models";

@Injectable()
export class CharacterRepositoryImpl implements CharacterRepository {
	constructor(
		@InjectModel(CharacterModel.name) private model: Model<CharacterModel>
	) {}
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
			overview: character.overview,
		});
	}
	async findByName(
		name: FindCharacterByNameInputDTO
	): Promise<FindCharacterByNameOutputDTO> {
		const character = await this.model.findOne({
			name: { $regex: new RegExp(name.replace(/_/g, " "), "i") },
		});
		if (!character) return null;
		return Object.freeze<Character>({
			id: character._id,
			name: character.name,
			description: character.description,
			image: character.image,
			appearances: character.appearances,
			overview: character.overview,
		});
	}
}
