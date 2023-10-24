import { model } from "mongoose";

import { CharacterRepositoryImpl } from "@/infrastructure/repositories/character.repository.impl";
import { CharacterSchema } from "@/infrastructure/schemas/character.schema";
import { CharacterModel } from "@/infrastructure/models/character.model";

export const makeCharacterRepositoryImpl = () => {
	return new CharacterRepositoryImpl(
		model(CharacterModel.name, CharacterSchema)
	);
};
